import type { Team } from '../../features/teams/domain/entities/Team';
import type { Match } from '../../features/groups/domain/entities/Match';
import type { Standing } from '../../features/groups/domain/entities/Standing';

export const teams: Team[] = [
  // Group A
  { id: 'MEX', name: 'México', flag: '🇲🇽', confederation: 'CONCACAF', group: 'A' },
  { id: 'RSA', name: 'África do Sul', flag: '🇿🇦', confederation: 'CAF', group: 'A' },
  { id: 'KOR', name: 'Coreia do Sul', flag: '🇰🇷', confederation: 'AFC', group: 'A' },
  { id: 'CZE', name: 'Chéquia', flag: '🇨🇿', confederation: 'UEFA', group: 'A' },

  // Group B
  { id: 'CAN', name: 'Canadá', flag: '🇨🇦', confederation: 'CONCACAF', group: 'B' },
  { id: 'SUI', name: 'Suíça', flag: '🇨🇭', confederation: 'UEFA', group: 'B' },
  { id: 'QAT', name: 'Catar', flag: '🇶🇦', confederation: 'AFC', group: 'B' },
  { id: 'BIH', name: 'Bósnia e Herzegovina', flag: '🇧🇦', confederation: 'UEFA', group: 'B' },

  // Group C
  { id: 'BRA', name: 'Brasil', flag: '🇧🇷', confederation: 'CONMEBOL', group: 'C' },
  { id: 'MAR', name: 'Marrocos', flag: '🇲🇦', confederation: 'CAF', group: 'C' },
  { id: 'HAI', name: 'Haiti', flag: '🇭🇹', confederation: 'CONCACAF', group: 'C' },
  { id: 'SCO', name: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA', group: 'C' },

  // Group D
  { id: 'USA', name: 'Estados Unidos', flag: '🇺🇸', confederation: 'CONCACAF', group: 'D' },
  { id: 'PAR', name: 'Paraguai', flag: '🇵🇾', confederation: 'CONMEBOL', group: 'D' },
  { id: 'AUS', name: 'Austrália', flag: '🇦🇺', confederation: 'AFC', group: 'D' },
  { id: 'TUR', name: 'Turquia', flag: '🇹🇷', confederation: 'UEFA', group: 'D' },

  // Group E
  { id: 'GER', name: 'Alemanha', flag: '🇩🇪', confederation: 'UEFA', group: 'E' },
  { id: 'CUW', name: 'Curaçao', flag: '🇨🇼', confederation: 'CONCACAF', group: 'E' },
  { id: 'CIV', name: 'Costa do Marfim', flag: '🇨🇮', confederation: 'CAF', group: 'E' },
  { id: 'ECU', name: 'Equador', flag: '🇪🇨', confederation: 'CONMEBOL', group: 'E' },

  // Group F
  { id: 'NED', name: 'Holanda', flag: '🇳🇱', confederation: 'UEFA', group: 'F' },
  { id: 'JPN', name: 'Japão', flag: '🇯🇵', confederation: 'AFC', group: 'F' },
  { id: 'TUN', name: 'Tunísia', flag: '🇹🇳', confederation: 'CAF', group: 'F' },
  { id: 'SWE', name: 'Suécia', flag: '🇸🇪', confederation: 'UEFA', group: 'F' },

  // Group G
  { id: 'BEL', name: 'Bélgica', flag: '🇧🇪', confederation: 'UEFA', group: 'G' },
  { id: 'EGY', name: 'Egito', flag: '🇪🇬', confederation: 'CAF', group: 'G' },
  { id: 'IRN', name: 'Irã', flag: '🇮🇷', confederation: 'AFC', group: 'G' },
  { id: 'NZL', name: 'Nova Zelândia', flag: '🇳🇿', confederation: 'OFC', group: 'G' },

  // Group H
  { id: 'ESP', name: 'Espanha', flag: '🇪🇸', confederation: 'UEFA', group: 'H' },
  { id: 'CPV', name: 'Cabo Verde', flag: '🇨🇻', confederation: 'CAF', group: 'H' },
  { id: 'KSA', name: 'Arábia Saudita', flag: '🇸🇦', confederation: 'AFC', group: 'H' },
  { id: 'URU', name: 'Uruguai', flag: '🇺🇾', confederation: 'CONMEBOL', group: 'H' },

  // Group I
  { id: 'FRA', name: 'França', flag: '🇫🇷', confederation: 'UEFA', group: 'I' },
  { id: 'SEN', name: 'Senegal', flag: '🇸🇳', confederation: 'CAF', group: 'I' },
  { id: 'NOR', name: 'Noruega', flag: '🇳🇴', confederation: 'UEFA', group: 'I' },
  { id: 'IRQ', name: 'Iraque', flag: '🇮🇶', confederation: 'AFC', group: 'I' },

  // Group J
  { id: 'ARG', name: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL', group: 'J' },
  { id: 'ALG', name: 'Argélia', flag: '🇩🇿', confederation: 'CAF', group: 'J' },
  { id: 'AUT', name: 'Áustria', flag: '🇦🇹', confederation: 'UEFA', group: 'J' },
  { id: 'JOR', name: 'Jordânia', flag: '🇯🇴', confederation: 'AFC', group: 'J' },

  // Group K
  { id: 'POR', name: 'Portugal', flag: '🇵🇹', confederation: 'UEFA', group: 'K' },
  { id: 'UZB', name: 'Uzbequistão', flag: '🇺🇿', confederation: 'AFC', group: 'K' },
  { id: 'COL', name: 'Colômbia', flag: '🇨🇴', confederation: 'CONMEBOL', group: 'K' },
  { id: 'COD', name: 'RD Congo', flag: '🇨🇩', confederation: 'CAF', group: 'K' },

  // Group L
  { id: 'ENG', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', group: 'L' },
  { id: 'CRO', name: 'Croácia', flag: '🇭🇷', confederation: 'UEFA', group: 'L' },
  { id: 'GHA', name: 'Gana', flag: '🇬🇭', confederation: 'CAF', group: 'L' },
  { id: 'PAN', name: 'Panamá', flag: '🇵🇦', confederation: 'CONCACAF', group: 'L' },
];

export const matches: Match[] = [
  // --- Grupo A ---
  { id: 'A1', group: 'A', homeTeamId: 'MEX', awayTeamId: 'RSA', homeScore: 2, awayScore: 1, date: '11/06/2026', time: '17:00', stadium: 'Estádio Azteca, Cidade do México', status: 'completed' },
  { id: 'A2', group: 'A', homeTeamId: 'KOR', awayTeamId: 'CZE', homeScore: 1, awayScore: 1, date: '12/06/2026', time: '15:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'completed' },
  { id: 'A3', group: 'A', homeTeamId: 'MEX', awayTeamId: 'KOR', homeScore: 2, awayScore: 0, date: '17/06/2026', time: '18:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'completed' },
  { id: 'A4', group: 'A', homeTeamId: 'CZE', awayTeamId: 'RSA', homeScore: 1, awayScore: 2, date: '18/06/2026', time: '20:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'A5', group: 'A', homeTeamId: 'CZE', awayTeamId: 'MEX', date: '24/06/2026', time: '16:00', stadium: 'NRG Stadium, Houston', status: 'upcoming' },
  { id: 'A6', group: 'A', homeTeamId: 'RSA', awayTeamId: 'KOR', date: '24/06/2026', time: '16:00', stadium: 'Hard Rock Stadium, Miami', status: 'upcoming' },

  // --- Grupo B ---
  { id: 'B1', group: 'B', homeTeamId: 'CAN', awayTeamId: 'SUI', homeScore: 1, awayScore: 2, date: '12/06/2026', time: '12:00', stadium: 'BC Place, Vancouver', status: 'completed' },
  { id: 'B2', group: 'B', homeTeamId: 'QAT', awayTeamId: 'BIH', homeScore: 0, awayScore: 3, date: '13/06/2026', time: '14:00', stadium: 'Lumen Field, Seattle', status: 'completed' },
  { id: 'B3', group: 'B', homeTeamId: 'CAN', awayTeamId: 'QAT', homeScore: 3, awayScore: 1, date: '18/06/2026', time: '15:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'B4', group: 'B', homeTeamId: 'BIH', awayTeamId: 'SUI', homeScore: 1, awayScore: 1, date: '19/06/2026', time: '17:00', stadium: 'Gillette Stadium, Boston', status: 'completed' },
  { id: 'B5', group: 'B', homeTeamId: 'BIH', awayTeamId: 'CAN', date: '25/06/2026', time: '19:00', stadium: 'BMO Field, Toronto', status: 'upcoming' },
  { id: 'B6', group: 'B', homeTeamId: 'SUI', awayTeamId: 'QAT', date: '25/06/2026', time: '19:00', stadium: 'AT&T Stadium, Dallas', status: 'upcoming' },

  // --- Grupo C ---
  { id: 'C1', group: 'C', homeTeamId: 'BRA', awayTeamId: 'MAR', homeScore: 2, awayScore: 2, date: '13/06/2026', time: '16:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'C2', group: 'C', homeTeamId: 'HAI', awayTeamId: 'SCO', homeScore: 0, awayScore: 4, date: '14/06/2026', time: '18:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'C3', group: 'C', homeTeamId: 'BRA', awayTeamId: 'HAI', homeScore: 5, awayScore: 0, date: '19/06/2026', time: '21:00', stadium: "Levi's Stadium, São Francisco", status: 'completed' },
  { id: 'C4', group: 'C', homeTeamId: 'SCO', awayTeamId: 'MAR', homeScore: 1, awayScore: 3, date: '20/06/2026', time: '14:00', stadium: 'NRG Stadium, Houston', status: 'completed' },
  { id: 'C5', group: 'C', homeTeamId: 'SCO', awayTeamId: 'BRA', date: '26/06/2026', time: '20:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'upcoming' },
  { id: 'C6', group: 'C', homeTeamId: 'MAR', awayTeamId: 'HAI', date: '26/06/2026', time: '20:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'upcoming' },

  // --- Grupo D ---
  { id: 'D1', group: 'D', homeTeamId: 'USA', awayTeamId: 'PAR', homeScore: 3, awayScore: 1, date: '12/06/2026', time: '20:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'D2', group: 'D', homeTeamId: 'AUS', awayTeamId: 'TUR', homeScore: 1, awayScore: 2, date: '13/06/2026', time: '21:00', stadium: 'AT&T Stadium, Dallas', status: 'completed' },
  { id: 'D3', group: 'D', homeTeamId: 'USA', awayTeamId: 'AUS', homeScore: 2, awayScore: 1, date: '18/06/2026', time: '18:00', stadium: 'Lumen Field, Seattle', status: 'completed' },
  { id: 'D4', group: 'D', homeTeamId: 'TUR', awayTeamId: 'PAR', homeScore: 0, awayScore: 0, date: '19/06/2026', time: '19:00', stadium: 'Arrowhead Stadium, Kansas City', status: 'completed' },
  { id: 'D5', group: 'D', homeTeamId: 'TUR', awayTeamId: 'USA', date: '25/06/2026', time: '21:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'upcoming' },
  { id: 'D6', group: 'D', homeTeamId: 'PAR', awayTeamId: 'AUS', date: '25/06/2026', time: '21:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'upcoming' },

  // --- Grupo E ---
  { id: 'E1', group: 'E', homeTeamId: 'GER', awayTeamId: 'CUW', homeScore: 4, awayScore: 1, date: '14/06/2026', time: '15:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'E2', group: 'E', homeTeamId: 'CIV', awayTeamId: 'ECU', homeScore: 1, awayScore: 2, date: '14/06/2026', time: '19:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'E3', group: 'E', homeTeamId: 'GER', awayTeamId: 'CIV', homeScore: 2, awayScore: 0, date: '20/06/2026', time: '16:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'completed' },
  { id: 'E4', group: 'E', homeTeamId: 'ECU', awayTeamId: 'CUW', homeScore: 3, awayScore: 1, date: '20/06/2026', time: '20:00', stadium: "Levi's Stadium, São Francisco", status: 'completed' },
  { id: 'E5', group: 'E', homeTeamId: 'ECU', awayTeamId: 'GER', date: '26/06/2026', time: '14:00', stadium: 'Hard Rock Stadium, Miami', status: 'upcoming' },
  { id: 'E6', group: 'E', homeTeamId: 'CUW', awayTeamId: 'CIV', date: '26/06/2026', time: '14:00', stadium: 'BC Place, Vancouver', status: 'upcoming' },

  // --- Grupo F ---
  { id: 'F1', group: 'F', homeTeamId: 'NED', awayTeamId: 'JPN', homeScore: 1, awayScore: 2, date: '15/06/2026', time: '14:00', stadium: 'Gillette Stadium, Boston', status: 'completed' },
  { id: 'F2', group: 'F', homeTeamId: 'TUN', awayTeamId: 'SWE', homeScore: 1, awayScore: 1, date: '15/06/2026', time: '17:00', stadium: 'NRG Stadium, Houston', status: 'completed' },
  { id: 'F3', group: 'F', homeTeamId: 'NED', awayTeamId: 'TUN', homeScore: 3, awayScore: 1, date: '21/06/2026', time: '12:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'F4', group: 'F', homeTeamId: 'SWE', awayTeamId: 'JPN', homeScore: 0, awayScore: 2, date: '21/06/2026', time: '15:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'F5', group: 'F', homeTeamId: 'SWE', awayTeamId: 'NED', date: '27/06/2026', time: '13:00', stadium: 'AT&T Stadium, Dallas', status: 'upcoming' },
  { id: 'F6', group: 'F', homeTeamId: 'JPN', awayTeamId: 'TUN', date: '27/06/2026', time: '13:00', stadium: 'Lumen Field, Seattle', status: 'upcoming' },

  // --- Grupo G ---
  { id: 'G1', group: 'G', homeTeamId: 'BEL', awayTeamId: 'EGY', homeScore: 2, awayScore: 0, date: '15/06/2026', time: '20:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'completed' },
  { id: 'G2', group: 'G', homeTeamId: 'IRN', awayTeamId: 'NZL', homeScore: 1, awayScore: 0, date: '16/06/2026', time: '12:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'G3', group: 'G', homeTeamId: 'BEL', awayTeamId: 'IRN', homeScore: 2, awayScore: 1, date: '21/06/2026', time: '18:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'G4', group: 'G', homeTeamId: 'NZL', awayTeamId: 'EGY', homeScore: 1, awayScore: 1, date: '22/06/2026', time: '14:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'G5', group: 'G', homeTeamId: 'NZL', awayTeamId: 'BEL', date: '27/06/2026', time: '16:00', stadium: 'SoFi Stadium, Los Angeles', status: 'upcoming' },
  { id: 'G6', group: 'G', homeTeamId: 'EGY', awayTeamId: 'IRN', date: '27/06/2026', time: '16:00', stadium: 'Arrowhead Stadium, Kansas City', status: 'upcoming' },

  // --- Grupo H ---
  { id: 'H1', group: 'H', homeTeamId: 'ESP', awayTeamId: 'CPV', homeScore: 3, awayScore: 0, date: '16/06/2026', time: '15:00', stadium: 'Estádio Azteca, Cidade do México', status: 'completed' },
  { id: 'H2', group: 'H', homeTeamId: 'KSA', awayTeamId: 'URU', homeScore: 0, awayScore: 2, date: '16/06/2026', time: '18:00', stadium: "Levi's Stadium, São Francisco", status: 'completed' },
  { id: 'H3', group: 'H', homeTeamId: 'ESP', awayTeamId: 'KSA', homeScore: 4, awayScore: 1, date: '22/06/2026', time: '17:00', stadium: 'NRG Stadium, Houston', status: 'completed' },
  { id: 'H4', group: 'H', homeTeamId: 'URU', awayTeamId: 'CPV', homeScore: 2, awayScore: 1, date: '22/06/2026', time: '20:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'completed' },
  { id: 'H5', group: 'H', homeTeamId: 'URU', awayTeamId: 'ESP', date: '28/06/2026', time: '18:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'upcoming' },
  { id: 'H6', group: 'H', homeTeamId: 'CPV', awayTeamId: 'KSA', date: '28/06/2026', time: '18:00', stadium: 'SoFi Stadium, Los Angeles', status: 'upcoming' },

  // --- Grupo I ---
  { id: 'I1', group: 'I', homeTeamId: 'FRA', awayTeamId: 'SEN', homeScore: 3, awayScore: 1, date: '17/06/2026', time: '12:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'I2', group: 'I', homeTeamId: 'NOR', awayTeamId: 'IRQ', homeScore: 2, awayScore: 0, date: '17/06/2026', time: '15:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'I3', group: 'I', homeTeamId: 'FRA', awayTeamId: 'NOR', homeScore: 1, awayScore: 1, date: '23/06/2026', time: '13:00', stadium: 'Gillette Stadium, Boston', status: 'completed' },
  { id: 'I4', group: 'I', homeTeamId: 'IRQ', awayTeamId: 'SEN', homeScore: 0, awayScore: 2, date: '23/06/2026', time: '16:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'I5', group: 'I', homeTeamId: 'IRQ', awayTeamId: 'FRA', date: '28/06/2026', time: '21:00', stadium: 'BC Place, Vancouver', status: 'upcoming' },
  { id: 'I6', group: 'I', homeTeamId: 'SEN', awayTeamId: 'NOR', date: '28/06/2026', time: '21:00', stadium: 'AT&T Stadium, Dallas', status: 'upcoming' },

  // --- Grupo J ---
  { id: 'J1', group: 'J', homeTeamId: 'ARG', awayTeamId: 'ALG', homeScore: 2, awayScore: 0, date: '17/06/2026', time: '21:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'J2', group: 'J', homeTeamId: 'AUT', awayTeamId: 'JOR', homeScore: 3, awayScore: 1, date: '18/06/2026', time: '12:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'completed' },
  { id: 'J3', group: 'J', homeTeamId: 'ARG', awayTeamId: 'AUT', homeScore: 1, awayScore: 0, date: '23/06/2026', time: '19:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'completed' },
  { id: 'J4', group: 'J', homeTeamId: 'JOR', awayTeamId: 'ALG', homeScore: 1, awayScore: 2, date: '24/06/2026', time: '13:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'J5', group: 'J', homeTeamId: 'JOR', awayTeamId: 'ARG', date: '29/06/2026', time: '16:00', stadium: 'Estádio Azteca, Cidade do México', status: 'upcoming' },
  { id: 'J6', group: 'J', homeTeamId: 'ALG', awayTeamId: 'AUT', date: '29/06/2026', time: '16:00', stadium: "Levi's Stadium, São Francisco", status: 'upcoming' },

  // --- Grupo K ---
  { id: 'K1', group: 'K', homeTeamId: 'POR', awayTeamId: 'UZB', homeScore: 3, awayScore: 1, date: '18/06/2026', time: '21:00', stadium: 'AT&T Stadium, Dallas', status: 'completed' },
  { id: 'K2', group: 'K', homeTeamId: 'COL', awayTeamId: 'COD', homeScore: 2, awayScore: 0, date: '19/06/2026', time: '12:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'K3', group: 'K', homeTeamId: 'POR', awayTeamId: 'COL', homeScore: 1, awayScore: 2, date: '24/06/2026', time: '18:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'K4', group: 'K', homeTeamId: 'COD', awayTeamId: 'UZB', homeScore: 0, awayScore: 1, date: '24/06/2026', time: '21:00', stadium: 'Lumen Field, Seattle', status: 'completed' },
  { id: 'K5', group: 'K', homeTeamId: 'COD', awayTeamId: 'POR', date: '29/06/2026', time: '20:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'upcoming' },
  { id: 'K6', group: 'K', homeTeamId: 'UZB', awayTeamId: 'COL', date: '29/06/2026', time: '20:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'upcoming' },

  // --- Grupo L ---
  { id: 'L1', group: 'L', homeTeamId: 'ENG', awayTeamId: 'CRO', homeScore: 2, awayScore: 1, date: '19/06/2026', time: '15:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'completed' },
  { id: 'L2', group: 'L', homeTeamId: 'GHA', awayTeamId: 'PAN', homeScore: 2, awayScore: 2, date: '20/06/2026', time: '12:00', stadium: 'NRG Stadium, Houston', status: 'completed' },
  { id: 'L3', group: 'L', homeTeamId: 'ENG', awayTeamId: 'GHA', homeScore: 3, awayScore: 0, date: '25/06/2026', time: '13:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'L4', group: 'L', homeTeamId: 'PAN', awayTeamId: 'CRO', homeScore: 1, awayScore: 3, date: '25/06/2026', time: '16:00', stadium: 'Gillette Stadium, Boston', status: 'completed' },
  { id: 'L5', group: 'L', homeTeamId: 'PAN', awayTeamId: 'ENG', date: '30/06/2026', time: '18:00', stadium: 'SoFi Stadium, Los Angeles', status: 'upcoming' },
  { id: 'L6', group: 'L', homeTeamId: 'CRO', awayTeamId: 'GHA', date: '30/06/2026', time: '18:00', stadium: 'Estádio Azteca, Cidade do México', status: 'upcoming' },
];

export function calculateGroupStandings(groupLetter: string): Standing[] {
  const groupTeams = teams.filter(t => t.group === groupLetter);
  const groupMatches = matches.filter(m => m.group === groupLetter && m.status === 'completed');

  const standingsMap: Record<string, Omit<Standing, 'team'>> = {};

  groupTeams.forEach(team => {
    standingsMap[team.id] = {
      teamId: team.id,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    };
  });

  groupMatches.forEach(match => {
    const { homeTeamId, awayTeamId, homeScore, awayScore } = match;
    if (homeScore === undefined || awayScore === undefined) return;

    const home = standingsMap[homeTeamId];
    const away = standingsMap[awayTeamId];

    if (home && away) {
      home.played += 1;
      away.played += 1;

      home.goalsFor += homeScore;
      home.goalsAgainst += awayScore;
      away.goalsFor += awayScore;
      away.goalsAgainst += homeScore;

      home.goalDifference = home.goalsFor - home.goalsAgainst;
      away.goalDifference = away.goalsFor - away.goalsAgainst;

      if (homeScore > awayScore) {
        home.won += 1;
        home.points += 3;
        away.lost += 1;
      } else if (homeScore < awayScore) {
        away.won += 1;
        away.points += 3;
        home.lost += 1;
      } else {
        home.drawn += 1;
        home.points += 1;
        away.drawn += 1;
        away.points += 1;
      }
    }
  });

  const standings: Standing[] = Object.values(standingsMap).map(s => {
    const team = groupTeams.find(t => t.id === s.teamId)!;
    return { ...s, team };
  });

  return standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.team.name.localeCompare(b.team.name);
  });
}
