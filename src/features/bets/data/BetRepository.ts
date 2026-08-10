import { useSQLiteContext } from 'expo-sqlite';
import { Bet, CreateBetInput } from '../domain/entities/Bet';
import { calculateCorrectPrediction, IBetRepository } from '../domain/repositories/IBetRepository';

/**
 * BetRepository — acesso direto ao banco SQLite para palpites.
 *
 * Deve ser utilizado apenas dentro de componentes envolvidos pelo
 * `DatabaseProvider` (que expõe o `SQLiteProvider`).
 *
 * Use via hook `useBetDatabase` nos componentes de apresentação.
 */
export class BetRepository implements IBetRepository {
  constructor(private db: ReturnType<typeof useSQLiteContext>) {}

  // ── Palpites ──────────────────────────────────────────────────────────────

  /**
   * Cria um novo palpite e debita os pacotes do saldo de figurinhas.
   * Executa atomicamente em uma transação.
   */
  async createBet(input: CreateBetInput): Promise<void> {
    await this.db.withTransactionAsync(async () => {
      // 1. Verificar saldo disponível
      const packRow = await this.db.getFirstAsync<{ packs_remaining: number }>(
        'SELECT packs_remaining FROM sticker_packs WHERE id = 1'
      );
      const available = packRow?.packs_remaining ?? 0;

      if (available < input.packs_wagered) {
        throw new Error(`Saldo insuficiente. Você tem ${available} pacote(s).`);
      }

      // 2. Verificar se já existe palpite para essa partida
      const existing = await this.db.getFirstAsync<{ id: number }>(
        'SELECT id FROM bets WHERE match_id = ?',
        input.match_id
      );
      if (existing) {
        throw new Error('Você já fez um palpite para essa partida.');
      }

      // 3. Debitar pacotes
      await this.db.runAsync(
        `UPDATE sticker_packs
           SET packs_remaining = packs_remaining - ?,
               updated_at      = datetime('now')
         WHERE id = 1`,
        input.packs_wagered
      );

      // 4. Inserir palpite
      await this.db.runAsync(
        `INSERT INTO bets (match_id, prediction, packs_wagered, status)
         VALUES (?, ?, ?, 'open')`,
        input.match_id,
        input.prediction,
        input.packs_wagered
      );
    });
  }

  /**
   * Retorna todos os palpites, ordenados do mais recente para o mais antigo.
   */
  async getAllBets(): Promise<Bet[]> {
    return await this.db.getAllAsync<Bet>(
      'SELECT * FROM bets ORDER BY created_at DESC'
    );
  }

  /**
   * Verifica se já existe palpite para a partida informada.
   */
  async hasBetForMatch(matchId: string): Promise<boolean> {
    const row = await this.db.getFirstAsync<{ id: number }>(
      'SELECT id FROM bets WHERE match_id = ?',
      matchId
    );
    return !!row;
  }

  /**
   * Resolve todos os palpites em aberto verificando o resultado das partidas.
   * - Palpite correto → status='won', pacotes creditados × 2
   * - Palpite errado  → status='lost'
   *
   * Apenas partidas com status='completed' e placar definido são resolvidas.
   */
  async resolveOpenBets(): Promise<void> {
    const openBets = await this.db.getAllAsync<Bet>(
      "SELECT * FROM bets WHERE status = 'open'"
    );

    if (openBets.length === 0) return;

    await this.db.withTransactionAsync(async () => {
      for (const bet of openBets) {
        // Busca a partida correspondente no banco
        const match = await this.db.getFirstAsync<{
          home_score: number | null;
          away_score: number | null;
          status: string;
        }>(
          'SELECT home_score, away_score, status FROM matches WHERE id = ?',
          bet.match_id
        );

        // Só resolve se a partida já foi completada com placar definido
        if (
          !match ||
          match.status !== 'completed' ||
          match.home_score === null ||
          match.away_score === null
        ) {
          continue;
        }

        const correctPrediction = calculateCorrectPrediction(
          match.home_score,
          match.away_score
        );
        const isWon = bet.prediction === correctPrediction;

        // Atualiza status do palpite
        await this.db.runAsync(
          `UPDATE bets SET status = ? WHERE id = ?`,
          isWon ? 'won' : 'lost',
          bet.id
        );

        // Se ganhou: credita pacotes em dobro
        if (isWon) {
          await this.db.runAsync(
            `UPDATE sticker_packs
               SET packs_remaining = packs_remaining + ?,
                   updated_at      = datetime('now')
             WHERE id = 1`,
            bet.packs_wagered * 2
          );
        }
      }
    });
  }
}
