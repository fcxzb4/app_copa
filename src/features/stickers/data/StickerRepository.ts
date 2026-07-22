import { useSQLiteContext } from 'expo-sqlite';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface CollectedSticker {
  id: number;
  sticker_id: string;
  player_name: string;
  flag: string;
  group_name: string;
  team_id: string | null;
  is_duplicate: number;
  collected_at: string;
}

export interface UserProfile {
  id: number;
  uid: string;
  display_name: string | null;
  avatar_emoji: string;
  created_at: string;
}

// ─── Repository ───────────────────────────────────────────────────────────────

/**
 * StickerRepository — acesso direto ao banco SQLite para figurinhas e pacotes.
 *
 * Use via hook `useStickerDatabase` nos componentes de apresentação.
 * Instanciar diretamente apenas em contextos fora de componentes React.
 */
export class StickerRepository {
  constructor(private db: ReturnType<typeof useSQLiteContext>) {}

  // ── Pacotes ────────────────────────────────────────────────────────────────

  /**
   * Retorna quantos pacotes restam para o usuário abrir.
   */
  async getPacksRemaining(): Promise<number> {
    const row = await this.db.getFirstAsync<{ packs_remaining: number }>(
      'SELECT packs_remaining FROM sticker_packs WHERE id = 1'
    );
    return row?.packs_remaining ?? 5;
  }

  /**
   * Atualiza o saldo de pacotes. Garante que nunca fica negativo.
   */
  async setPacksRemaining(count: number): Promise<void> {
    const safe = Math.max(0, count);
    await this.db.runAsync(
      `UPDATE sticker_packs
         SET packs_remaining = ?,
             updated_at      = datetime('now')
       WHERE id = 1`,
      safe
    );
  }

  /**
   * Decrementa em 1 o saldo de pacotes (abre um pacote).
   * Retorna o novo saldo.
   */
  async openPack(): Promise<number> {
    const current = await this.getPacksRemaining();
    if (current <= 0) return 0;
    const next = current - 1;
    await this.setPacksRemaining(next);
    return next;
  }

  // ── Figurinhas Coletadas ───────────────────────────────────────────────────

  /**
   * Salva uma ou mais figurinhas no álbum do usuário.
   * Marca como duplicata se o sticker_id já existir.
   */
  async addStickers(
    stickers: Array<{
      sticker_id: string;
      player_name: string;
      flag: string;
      group_name: string;
      team_id?: string;
    }>
  ): Promise<void> {
    await this.db.withTransactionAsync(async () => {
      for (const s of stickers) {
        // Verifica se já possui essa figurinha
        const existing = await this.db.getFirstAsync<{ id: number }>(
          'SELECT id FROM collected_stickers WHERE sticker_id = ?',
          s.sticker_id
        );

        await this.db.runAsync(
          `INSERT INTO collected_stickers
             (sticker_id, player_name, flag, group_name, team_id, is_duplicate)
           VALUES (?, ?, ?, ?, ?, ?)`,
          s.sticker_id,
          s.player_name,
          s.flag,
          s.group_name,
          s.team_id ?? null,
          existing ? 1 : 0
        );
      }
    });
  }

  /**
   * Retorna todas as figurinhas coletadas, ordenadas pela mais recente.
   */
  async getAllStickers(): Promise<CollectedSticker[]> {
    return await this.db.getAllAsync<CollectedSticker>(
      'SELECT * FROM collected_stickers ORDER BY collected_at DESC'
    );
  }

  /**
   * Retorna figurinhas únicas (sem duplicatas).
   */
  async getUniqueStickers(): Promise<CollectedSticker[]> {
    return await this.db.getAllAsync<CollectedSticker>(
      `SELECT * FROM collected_stickers
        WHERE is_duplicate = 0
        ORDER BY collected_at DESC`
    );
  }

  /**
   * Retorna o total de figurinhas únicas coletadas por team_id.
   */
  async getCountByTeam(): Promise<Record<string, number>> {
    const rows = await this.db.getAllAsync<{ team_id: string; count: number }>(
      `SELECT team_id, COUNT(*) as count
         FROM collected_stickers
        WHERE is_duplicate = 0 AND team_id IS NOT NULL
        GROUP BY team_id`
    );
    return rows.reduce(
      (acc, row) => {
        acc[row.team_id] = row.count;
        return acc;
      },
      {} as Record<string, number>
    );
  }

  /**
   * Retorna o total de figurinhas únicas já coletadas (para o álbum).
   */
  async getTotalCollected(): Promise<number> {
    const row = await this.db.getFirstAsync<{ total: number }>(
      'SELECT COUNT(*) as total FROM collected_stickers WHERE is_duplicate = 0'
    );
    return row?.total ?? 0;
  }

  // ── Perfil Local ──────────────────────────────────────────────────────────

  /**
   * Salva ou atualiza o perfil do usuário localmente.
   */
  async upsertUserProfile(profile: {
    uid: string;
    display_name?: string;
    avatar_emoji?: string;
  }): Promise<void> {
    await this.db.runAsync(
      `INSERT INTO user_profile (uid, display_name, avatar_emoji)
       VALUES (?, ?, ?)
       ON CONFLICT(uid) DO UPDATE SET
         display_name = excluded.display_name,
         avatar_emoji = excluded.avatar_emoji`,
      profile.uid,
      profile.display_name ?? null,
      profile.avatar_emoji ?? '👤'
    );
  }

  /**
   * Retorna o perfil local do usuário pelo uid.
   */
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    return await this.db.getFirstAsync<UserProfile>(
      'SELECT * FROM user_profile WHERE uid = ?',
      uid
    );
  }
}
