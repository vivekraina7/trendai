"""
Database — dual mode:
  • Local dev  → aiosqlite (SQLite file)
  • Production → libsql-experimental (Turso cloud)

Set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN in .env to switch to Turso.
"""
import os
import asyncio
from contextlib import asynccontextmanager
from dotenv import load_dotenv

load_dotenv()

DB_PATH    = os.getenv("DB_PATH", "./edutrend.db")
TURSO_URL  = os.getenv("TURSO_DATABASE_URL", "")
TURSO_TOKEN= os.getenv("TURSO_AUTH_TOKEN", "")
USE_TURSO  = bool(TURSO_URL and TURSO_TOKEN)


# ── Turso compatibility shims ──────────────────────────────────────────────────

class _Row:
    """Row object that supports both index (row[0]) and key (row["col"]) access."""
    __slots__ = ("_keys", "_vals", "_map")

    def __init__(self, description, values):
        self._keys = [d[0] for d in (description or [])]
        self._vals = tuple(values)
        self._map  = dict(zip(self._keys, self._vals))

    def __getitem__(self, key):
        if isinstance(key, int):
            return self._vals[key]
        return self._map[key]

    def __iter__(self):
        return iter(self._vals)

    def __repr__(self):
        return repr(self._map)

    def keys(self):
        return self._keys


class _Cursor:
    """Async cursor wrapper around a sync libsql cursor."""
    __slots__ = ("_cur",)

    def __init__(self, cur):
        self._cur = cur

    async def fetchone(self):
        row = self._cur.fetchone()
        return _Row(self._cur.description, row) if row else None

    async def fetchall(self):
        return [_Row(self._cur.description, r) for r in self._cur.fetchall()]

    @property
    def lastrowid(self):
        return self._cur.lastrowid


class _TursoConn:
    """Async wrapper around the synchronous libsql connection."""
    __slots__ = ("_conn",)

    def __init__(self, conn):
        self._conn = conn

    async def execute(self, sql: str, params=()):
        loop = asyncio.get_event_loop()
        cur  = await loop.run_in_executor(None, lambda: self._conn.execute(sql, params))
        return _Cursor(cur)

    async def executemany(self, sql: str, seq):
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, lambda: self._conn.executemany(sql, seq))

    async def commit(self):
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, self._conn.commit)

    async def close(self):
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, self._conn.close)


# ── Public get_db() — used as FastAPI Depends AND async context manager ────────

@asynccontextmanager
async def _turso_ctx():
    import libsql_experimental as libsql
    loop = asyncio.get_event_loop()
    conn = await loop.run_in_executor(
        None, lambda: libsql.connect(TURSO_URL, auth_token=TURSO_TOKEN)
    )
    try:
        yield _TursoConn(conn)
    finally:
        await _TursoConn(conn).close()


@asynccontextmanager
async def _sqlite_ctx():
    import aiosqlite
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        yield db


async def get_db():
    """FastAPI dependency — yields DB connection (aiosqlite or Turso)."""
    ctx = _turso_ctx() if USE_TURSO else _sqlite_ctx()
    async with ctx as db:
        yield db


# ── Schema init ────────────────────────────────────────────────────────────────

async def init_db():
    """Create all tables if they don't exist. Called once on startup."""
    async with (_turso_ctx() if USE_TURSO else _sqlite_ctx()) as db:

        if not USE_TURSO:
            await db.execute("PRAGMA journal_mode=WAL")

        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                name        TEXT    NOT NULL,
                email       TEXT    NOT NULL UNIQUE,
                password    TEXT,
                password_hash TEXT,
                provider    TEXT    DEFAULT 'email',
                provider_id TEXT,
                avatar_url  TEXT,
                created_at  TEXT    DEFAULT (datetime('now')),
                updated_at  TEXT    DEFAULT (datetime('now'))
            )
        """)

        await db.execute("""
            CREATE TABLE IF NOT EXISTS user_paths (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id     INTEGER NOT NULL,
                path_id     TEXT    NOT NULL,
                path_title  TEXT    NOT NULL,
                started_at  TEXT    DEFAULT (datetime('now')),
                UNIQUE(user_id, path_id)
            )
        """)

        await db.execute("""
            CREATE TABLE IF NOT EXISTS module_progress (
                id           INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id      INTEGER NOT NULL,
                path_id      TEXT    NOT NULL,
                module_index INTEGER NOT NULL,
                status       TEXT    NOT NULL DEFAULT 'locked',
                completed_at TEXT,
                UNIQUE(user_id, path_id, module_index)
            )
        """)

        await db.execute("""
            CREATE TABLE IF NOT EXISTS chat_messages (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id    INTEGER,
                session_id TEXT    NOT NULL,
                role       TEXT    NOT NULL,
                content    TEXT    NOT NULL,
                created_at TEXT    DEFAULT (datetime('now'))
            )
        """)

        await db.execute("""
            CREATE TABLE IF NOT EXISTS trends (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                category   TEXT    NOT NULL,
                name       TEXT    NOT NULL,
                growth_pct REAL,
                demand     REAL,
                source     TEXT,
                fetched_at TEXT    DEFAULT (datetime('now'))
            )
        """)

        await db.execute("""
            CREATE TABLE IF NOT EXISTS password_reset_tokens (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                email      TEXT    NOT NULL,
                otp        TEXT    NOT NULL,
                expires_at TEXT    NOT NULL,
                used       INTEGER DEFAULT 0
            )
        """)

        await db.commit()
        mode = f"Turso cloud ({TURSO_URL})" if USE_TURSO else f"local SQLite at {DB_PATH}"
        print(f"✅ Database initialised — {mode}")
