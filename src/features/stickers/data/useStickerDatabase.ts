import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
import { CollectedSticker, type StickerToSave, type UseStickerDatabaseReturn } from '../domain/entities/Sticker';
import {
  StickerRepository
} from './StickerRepository';

// ─── Tipos ────────────────────────────────────────────────────────────────────


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
