import { useCallback, useEffect, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import {
  StickerRepository,
  type CollectedSticker,
} from './StickerRepository';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface StickerToSave {
  sticker_id: string;
  player_name: string;
  flag: string;
  group_name: string;
  team_id?: string;
}

interface UseStickerDatabaseReturn {
  /** Pacotes disponíveis para abrir */
  packsRemaining: number;
  /** Total de figurinhas únicas coletadas */
  totalCollected: number;
  /** Todas as figurinhas coletadas (incluindo duplicatas) */
  collectedStickers: CollectedSticker[];
  /** Mapa de team_id → quantidade coletada */
  countByTeam: Record<string, number>;
  /** true enquanto o banco está sendo lido/escrito */
  isLoading: boolean;
  /** Mensagem de erro, se houver */
  error: string | null;
  /** Abre um pacote e decrementa o saldo */
  openPack: () => Promise<number>;
  /** Salva uma lista de figurinhas no álbum */
  saveStickers: (stickers: StickerToSave[]) => Promise<void>;
  /** Força um reload dos dados do banco */
  refresh: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Hook principal para interagir com o banco SQLite na feature de figurinhas.
 *
 * Deve ser utilizado apenas dentro de componentes envolvidos pelo
 * `DatabaseProvider` (que expõe o `SQLiteProvider`).
 *
 * @example
 * const { packsRemaining, saveStickers, openPack } = useStickerDatabase();
 */
export function useStickerDatabase(): UseStickerDatabaseReturn {
  const db = useSQLiteContext();
  const repo = new StickerRepository(db);

  const [packsRemaining, setPacksRemaining] = useState(5);
  const [totalCollected, setTotalCollected] = useState(0);
  const [collectedStickers, setCollectedStickers] = useState<CollectedSticker[]>([]);
  const [countByTeam, setCountByTeam] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Carregar dados iniciais ─────────────────────────────────────────────────

  const loadAll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [packs, total, stickers, byTeam] = await Promise.all([
        repo.getPacksRemaining(),
        repo.getTotalCollected(),
        repo.getAllStickers(),
        repo.getCountByTeam(),
      ]);

      setPacksRemaining(packs);
      setTotalCollected(total);
      setCollectedStickers(stickers);
      setCountByTeam(byTeam);
    } catch (err) {
      console.error('[useStickerDatabase] Erro ao carregar dados:', err);
      setError('Erro ao acessar o banco de dados local.');
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // ── Ações ──────────────────────────────────────────────────────────────────

  const openPack = useCallback(async (): Promise<number> => {
    try {
      const newCount = await repo.openPack();
      setPacksRemaining(newCount);
      return newCount;
    } catch (err) {
      console.error('[useStickerDatabase] Erro ao abrir pacote:', err);
      return packsRemaining;
    }
  }, [db, packsRemaining]);

  const saveStickers = useCallback(
    async (stickers: StickerToSave[]): Promise<void> => {
      try {
        await repo.addStickers(stickers);
        // Recarrega apenas os dados de figurinhas após salvar
        const [total, all, byTeam] = await Promise.all([
          repo.getTotalCollected(),
          repo.getAllStickers(),
          repo.getCountByTeam(),
        ]);
        setTotalCollected(total);
        setCollectedStickers(all);
        setCountByTeam(byTeam);
      } catch (err) {
        console.error('[useStickerDatabase] Erro ao salvar figurinhas:', err);
        throw err;
      }
    },
    [db]
  );

  const refresh = useCallback(async () => {
    await loadAll();
  }, [loadAll]);

  return {
    packsRemaining,
    totalCollected,
    collectedStickers,
    countByTeam,
    isLoading,
    error,
    openPack,
    saveStickers,
    refresh,
  };
}
