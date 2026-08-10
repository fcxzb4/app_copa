/**
 * Tipos possíveis de palpite para uma partida.
 * - 'home_win'  → Time da casa vence
 * - 'draw'      → Empate
 * - 'away_win'  → Time visitante vence
 */
export type BetPrediction = 'home_win' | 'draw' | 'away_win';

/**
 * Status de um palpite.
 * - 'open'  → Aguardando resultado da partida
 * - 'won'   → Palpite correto — pacotes devolvidos em dobro
 * - 'lost'  → Palpite errado — pacotes perdidos
 */
export type BetStatus = 'open' | 'won' | 'lost';

/**
 * Entidade de domínio de um palpite.
 */
export interface Bet {
  id: number;
  match_id: string;
  prediction: BetPrediction;
  packs_wagered: number;
  status: BetStatus;
  created_at: string;
}

/**
 * DTO para criar um novo palpite.
 */
export interface CreateBetInput {
  match_id: string;
  prediction: BetPrediction;
  packs_wagered: number;
}

/**
 * Retorno do hook useBetDatabase.
 */
export interface UseBetDatabaseReturn {
  bets: Bet[];
  isLoading: boolean;
  error: string | null;
  createBet: (input: CreateBetInput) => Promise<void>;
  resolveOpenBets: () => Promise<void>;
  hasBetForMatch: (matchId: string) => boolean;
  refresh: () => Promise<void>;
}
