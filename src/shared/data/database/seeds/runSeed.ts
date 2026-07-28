import { type SQLiteDatabase } from 'expo-sqlite';
import { TEAMS_SEED } from './teamsSeed';
import { MATCHES_SEED } from './matchesSeed';

/**
 * Povoamento automático (Database Seeding) do SQLite.
 *
 * REGRAS:
 * 1. Isolamento: Pertence estritamente à camada Data/Infra.
 * 2. Execução Única: Verifica se a tabela 'teams' está vazia antes de rodar (dupla proteção).
 * 3. Transação: Usa BEGIN/COMMIT/ROLLBACK explícitos, compatível com expo-sqlite v14+ (Expo SDK 57).
 */
export async function runDatabaseSeed(db: SQLiteDatabase): Promise<void> {
  // Dupla proteção: verifica se o banco já foi semeado previamente
  const countResult = await db.getFirstAsync<{ total: number }>(
    'SELECT COUNT(*) as total FROM teams'
  );

  if (countResult && countResult.total > 0) {
    // Dados já existem — aborta para evitar duplicação
    return;
  }

  // Inicia transação manualmente para garantir atomicidade e rollback em caso de erro
  // (padrão recomendado para expo-sqlite v14+ / Expo SDK 57)
  await db.execAsync('BEGIN TRANSACTION;');

  try {
    // ── 1. Inserção das Seleções (Teams) ────────────────────────────────────
    for (const team of TEAMS_SEED) {
      await db.runAsync(
        `INSERT OR IGNORE INTO teams (id, name, flag, confederation, group_name)
         VALUES (?, ?, ?, ?, ?)`,
        team.id,
        team.name,
        team.flag,
        team.confederation,
        team.group_name
      );
    }

    // ── 2. Inserção das Partidas (Matches) ───────────────────────────────────
    for (const match of MATCHES_SEED) {
      await db.runAsync(
        `INSERT OR IGNORE INTO matches (
          id, group_name, home_team_id, away_team_id,
          home_score, away_score, match_date, match_time, stadium, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        match.id,
        match.group_name,
        match.home_team_id,
        match.away_team_id,
        match.home_score ?? null,
        match.away_score ?? null,
        match.match_date,
        match.match_time,
        match.stadium,
        match.status
      );
    }

    // Confirma todas as inserções atomicamente
    await db.execAsync('COMMIT;');
  } catch (error) {
    // Em caso de qualquer falha, desfaz todas as inserções
    await db.execAsync('ROLLBACK;');
    throw new Error(`[runDatabaseSeed] Falha ao semear o banco: ${error}`);
  }
}

