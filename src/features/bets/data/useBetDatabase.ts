import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
import { Bet, CreateBetInput, UseBetDatabaseReturn } from '../domain/entities/Bet';
import { BetRepository } from './BetRepository';

/**
 * Hook principal para interagir com o banco SQLite na feature de palpites.
 *
 * Deve ser utilizado apenas dentro de componentes envolvidos pelo
 * `DatabaseProvider`.
 *
 * @example
 * const { bets, createBet, hasBetForMatch } = useBetDatabase();
 */
export function useBetDatabase(): UseBetDatabaseReturn {
  const db = useSQLiteContext();
  const repo = new BetRepository(db);

  const [bets, setBets] = useState<Bet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Carregar e resolver palpites ao montar ─────────────────────────────────

  const loadAll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Primeiro tenta resolver palpites em aberto com resultados disponíveis
      await repo.resolveOpenBets();

      const allBets = await repo.getAllBets();
      setBets(allBets);
    } catch (err) {
      console.error('[useBetDatabase] Erro ao carregar palpites:', err);
      setError('Erro ao acessar os palpites.');
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // ── Ações ──────────────────────────────────────────────────────────────────

  const createBet = useCallback(
    async (input: CreateBetInput): Promise<void> => {
      try {
        setError(null);
        await repo.createBet(input);
        // Recarrega lista de palpites após criar
        const allBets = await repo.getAllBets();
        setBets(allBets);
      } catch (err: any) {
        const message = err?.message ?? 'Erro ao criar palpite.';
        setError(message);
        throw new Error(message);
      }
    },
    [db]
  );

  const resolveOpenBets = useCallback(async (): Promise<void> => {
    try {
      await repo.resolveOpenBets();
      const allBets = await repo.getAllBets();
      setBets(allBets);
    } catch (err) {
      console.error('[useBetDatabase] Erro ao resolver palpites:', err);
    }
  }, [db]);

  const hasBetForMatch = useCallback(
    (matchId: string): boolean => {
      return bets.some((b) => b.match_id === matchId);
    },
    [bets]
  );

  const refresh = useCallback(async () => {
    await loadAll();
  }, [loadAll]);

  return {
    bets,
    isLoading,
    error,
    createBet,
    resolveOpenBets,
    hasBetForMatch,
    refresh,
  };
}
