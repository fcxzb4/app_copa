import { type SQLiteDatabase } from 'expo-sqlite';

/**
 * Versão atual do schema do banco de dados.
 * Incremente este número sempre que adicionar uma migration.
 */
export const DB_VERSION = 1;
export const DB_NAME = 'popular_copa.db';

/**
 * Roda as migrations necessárias para inicializar e atualizar o banco.
 * Chamado automaticamente pelo SQLiteProvider via `onInit`.
 */
export async function migrateDb(db: SQLiteDatabase): Promise<void> {
  // Habilita WAL para melhor performance de leitura/escrita concorrente
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync('PRAGMA foreign_keys = ON;');

  // Obtém a versão atual do banco
  const result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion >= DB_VERSION) {
    // Banco já está atualizado
    return;
  }

  // ── Migration v1: schema inicial ──────────────────────────────────────────
  if (currentVersion < 1) {
    await db.execAsync(`
      -- Perfil do usuário local (cache offline)
      CREATE TABLE IF NOT EXISTS user_profile (
        id          INTEGER PRIMARY KEY NOT NULL,
        uid         TEXT    NOT NULL UNIQUE,
        display_name TEXT,
        avatar_emoji TEXT   DEFAULT '👤',
        created_at  TEXT    DEFAULT (datetime('now'))
      );

      -- Saldo de pacotes de figurinhas
      CREATE TABLE IF NOT EXISTS sticker_packs (
        id              INTEGER PRIMARY KEY NOT NULL,
        packs_remaining INTEGER NOT NULL DEFAULT 5,
        updated_at      TEXT    DEFAULT (datetime('now'))
      );

      -- Figurinhas coletadas pelo usuário
      CREATE TABLE IF NOT EXISTS collected_stickers (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        sticker_id   TEXT    NOT NULL,
        player_name  TEXT    NOT NULL,
        flag         TEXT    NOT NULL,
        group_name   TEXT    NOT NULL,
        team_id      TEXT,
        is_duplicate INTEGER NOT NULL DEFAULT 0,
        collected_at TEXT    DEFAULT (datetime('now'))
      );

      -- Registro inicial de pacotes (garante que sempre existe uma linha)
      INSERT OR IGNORE INTO sticker_packs (id, packs_remaining) VALUES (1, 5);
    `);

    // Atualiza a versão do schema
    await db.execAsync(`PRAGMA user_version = 1`);
  }

  // ── Migration v2 e posteriores: adicione aqui ──────────────────────────────
}
