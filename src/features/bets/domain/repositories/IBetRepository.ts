import { Bet, BetPrediction, CreateBetInput } from '../entities/Bet';

/**
 * Contrato do repositório de palpites.
 * Implementado pela camada de dados (BetRepository).
 */
export interface IBetRepository {
  /**
   * Cria um novo palpite e debita os pacotes do saldo.
   * Lança erro se não houver pacotes suficientes ou já existir palpite para a partida.
   */
  createBet(input: CreateBetInput): Promise<void>;

  /**
   * Retorna todos os palpites do usuário, ordenados pelo mais recente.
   */
  getAllBets(): Promise<Bet[]>;

  /**
   * Verifica se já existe um palpite para uma determinada partida.
   */
  hasBetForMatch(matchId: string): Promise<boolean>;

  /**
   * Resolve todos os palpites em aberto comparando com o resultado real das partidas.
   * Para palpites corretos: credita packsWagered × 2.
   * Para palpites errados: marca como lost.
   */
  resolveOpenBets(): Promise<void>;
}

/**
 * Utilitário: calcula a predição correta com base no placar.
 */
export function calculateCorrectPrediction(
  homeScore: number,
  awayScore: number
): BetPrediction {
  if (homeScore > awayScore) return 'home_win';
  if (awayScore > homeScore) return 'away_win';
  return 'draw';
}
