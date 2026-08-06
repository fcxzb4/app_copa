import { type SQLiteDatabase } from 'expo-sqlite';
import { runDatabaseSeed } from './seeds/runSeed';

/**
 * Versão atual do schema do banco de dados.
 * Incremente este número sempre que adicionar uma migration.
 */
export const DB_VERSION = 4;
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

  // ── Migration v1: schema inicial de perfil e figurinhas ─────────────────────
  if (currentVersion < 1) {
    // Cada statement separado para garantir compatibilidade com expo-sqlite v14+
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_profile (
        id          INTEGER PRIMARY KEY NOT NULL,
        uid         TEXT    NOT NULL UNIQUE,
        display_name TEXT,
        avatar_emoji TEXT   DEFAULT '👤',
        created_at  TEXT    DEFAULT (datetime('now'))
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sticker_packs (
        id              INTEGER PRIMARY KEY NOT NULL,
        packs_remaining INTEGER NOT NULL DEFAULT 5,
        updated_at      TEXT    DEFAULT (datetime('now'))
      );
    `);

    await db.execAsync(`
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
    `);

    // Garante que sempre existe uma linha de controle de pacotes
    await db.execAsync(
      `INSERT OR IGNORE INTO sticker_packs (id, packs_remaining) VALUES (1, 5);`
    );

    await db.execAsync(`PRAGMA user_version = 1`);
  }


  // ── Migration v2: tabelas do torneio (teams, matches) + seeding automático ──
  if (currentVersion < 2) {
    // Seleções (Times)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS teams (
        id            TEXT PRIMARY KEY NOT NULL,
        name          TEXT NOT NULL,
        flag          TEXT NOT NULL,
        confederation TEXT NOT NULL,
        group_name    TEXT NOT NULL
      );
    `);

    // Partidas (com FK para teams — foreign_keys = ON já foi ativado no início)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS matches (
        id           TEXT PRIMARY KEY NOT NULL,
        group_name   TEXT NOT NULL,
        home_team_id TEXT NOT NULL,
        away_team_id TEXT NOT NULL,
        home_score   INTEGER,
        away_score   INTEGER,
        match_date   TEXT NOT NULL,
        match_time   TEXT NOT NULL,
        stadium      TEXT NOT NULL,
        status       TEXT NOT NULL DEFAULT 'upcoming',
        FOREIGN KEY (home_team_id) REFERENCES teams(id),
        FOREIGN KEY (away_team_id) REFERENCES teams(id)
      );
    `);

    // Povoamento de dados iniciais em lote com transação atômica (BEGIN/COMMIT)
    await runDatabaseSeed(db);

    // Atualiza a versão do schema para v2
    await db.execAsync(`PRAGMA user_version = 2`);
  }

  // ── Migration v3: Re-seeding das 32 seleções oficiais do Catar 2022 ──────────
  if (currentVersion < 3) {
    await db.execAsync(`DELETE FROM matches;`);
    await db.execAsync(`DELETE FROM teams;`);
    await runDatabaseSeed(db);
    await db.execAsync(`PRAGMA user_version = 3;`);
  }

  // ── Migration v4: Re-seeding das 48 seleções dos 12 grupos da Copa de 2026 ─────
  if (currentVersion < 4) {
    await db.execAsync(`DELETE FROM matches;`);
    await db.execAsync(`DELETE FROM teams;`);
    await runDatabaseSeed(db);
    await db.execAsync(`PRAGMA user_version = 4;`);
  }
}



