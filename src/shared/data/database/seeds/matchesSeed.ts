export interface RawMatchSeed {
  id: string;
  group_name: string;
  home_team_id: string;
  away_team_id: string;
  home_score?: number;
  away_score?: number;
  match_date: string;
  match_time: string;
  stadium: string;
  status: 'completed' | 'upcoming' | 'live';
}

export const MATCHES_SEED: RawMatchSeed[] = [
  // --- Grupo A ---
  { id: 'A1', group_name: 'A', home_team_id: 'MEX', away_team_id: 'RSA', home_score: 2, away_score: 1, match_date: '11/06/2026', match_time: '17:00', stadium: 'Estádio Azteca, Cidade do México', status: 'completed' },
  { id: 'A2', group_name: 'A', home_team_id: 'KOR', away_team_id: 'CZE', home_score: 1, away_score: 1, match_date: '12/06/2026', match_time: '15:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'completed' },
  { id: 'A3', group_name: 'A', home_team_id: 'MEX', away_team_id: 'KOR', home_score: 2, away_score: 0, match_date: '17/06/2026', match_time: '18:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'completed' },
  { id: 'A4', group_name: 'A', home_team_id: 'CZE', away_team_id: 'RSA', home_score: 1, away_score: 2, match_date: '18/06/2026', match_time: '20:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'A5', group_name: 'A', home_team_id: 'CZE', away_team_id: 'MEX', match_date: '24/06/2026', match_time: '16:00', stadium: 'NRG Stadium, Houston', status: 'upcoming' },
  { id: 'A6', group_name: 'A', home_team_id: 'RSA', away_team_id: 'KOR', match_date: '24/06/2026', match_time: '16:00', stadium: 'Hard Rock Stadium, Miami', status: 'upcoming' },

  // --- Grupo B ---
  { id: 'B1', group_name: 'B', home_team_id: 'CAN', away_team_id: 'SUI', home_score: 1, away_score: 2, match_date: '12/06/2026', match_time: '12:00', stadium: 'BC Place, Vancouver', status: 'completed' },
  { id: 'B2', group_name: 'B', home_team_id: 'QAT', away_team_id: 'BIH', home_score: 0, away_score: 3, match_date: '13/06/2026', match_time: '14:00', stadium: 'Lumen Field, Seattle', status: 'completed' },
  { id: 'B3', group_name: 'B', home_team_id: 'CAN', away_team_id: 'QAT', home_score: 3, away_score: 1, match_date: '18/06/2026', match_time: '15:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'B4', group_name: 'B', home_team_id: 'BIH', away_team_id: 'SUI', home_score: 1, away_score: 1, match_date: '19/06/2026', match_time: '17:00', stadium: 'Gillette Stadium, Boston', status: 'completed' },
  { id: 'B5', group_name: 'B', home_team_id: 'BIH', away_team_id: 'CAN', match_date: '25/06/2026', match_time: '19:00', stadium: 'BMO Field, Toronto', status: 'upcoming' },
  { id: 'B6', group_name: 'B', home_team_id: 'SUI', away_team_id: 'QAT', match_date: '25/06/2026', match_time: '19:00', stadium: 'AT&T Stadium, Dallas', status: 'upcoming' },

  // --- Grupo C ---
  { id: 'C1', group_name: 'C', home_team_id: 'BRA', away_team_id: 'MAR', home_score: 2, away_score: 2, match_date: '13/06/2026', match_time: '16:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'C2', group_name: 'C', home_team_id: 'HAI', away_team_id: 'SCO', home_score: 0, away_score: 4, match_date: '14/06/2026', match_time: '18:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'C3', group_name: 'C', home_team_id: 'BRA', away_team_id: 'HAI', home_score: 5, away_score: 0, match_date: '19/06/2026', match_time: '21:00', stadium: "Levi's Stadium, São Francisco", status: 'completed' },
  { id: 'C4', group_name: 'C', home_team_id: 'SCO', away_team_id: 'MAR', home_score: 1, away_score: 3, match_date: '20/06/2026', match_time: '14:00', stadium: 'NRG Stadium, Houston', status: 'completed' },
  { id: 'C5', group_name: 'C', home_team_id: 'SCO', away_team_id: 'BRA', match_date: '26/06/2026', match_time: '20:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'upcoming' },
  { id: 'C6', group_name: 'C', home_team_id: 'MAR', away_team_id: 'HAI', match_date: '26/06/2026', match_time: '20:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'upcoming' },

  // --- Grupo D ---
  { id: 'D1', group_name: 'D', home_team_id: 'USA', away_team_id: 'PAR', home_score: 3, away_score: 1, match_date: '12/06/2026', match_time: '20:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'D2', group_name: 'D', home_team_id: 'AUS', away_team_id: 'TUR', home_score: 1, away_score: 2, match_date: '13/06/2026', match_time: '21:00', stadium: 'AT&T Stadium, Dallas', status: 'completed' },
  { id: 'D3', group_name: 'D', home_team_id: 'USA', away_team_id: 'AUS', home_score: 2, away_score: 1, match_date: '18/06/2026', match_time: '18:00', stadium: 'Lumen Field, Seattle', status: 'completed' },
  { id: 'D4', group_name: 'D', home_team_id: 'TUR', away_team_id: 'PAR', home_score: 0, away_score: 0, match_date: '19/06/2026', match_time: '19:00', stadium: 'Arrowhead Stadium, Kansas City', status: 'completed' },
  { id: 'D5', group_name: 'D', home_team_id: 'TUR', away_team_id: 'USA', match_date: '25/06/2026', match_time: '21:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'upcoming' },
  { id: 'D6', group_name: 'D', home_team_id: 'PAR', away_team_id: 'AUS', match_date: '25/06/2026', match_time: '21:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'upcoming' },

  // --- Grupo E ---
  { id: 'E1', group_name: 'E', home_team_id: 'GER', away_team_id: 'CUW', home_score: 4, away_score: 1, match_date: '14/06/2026', match_time: '15:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'E2', group_name: 'E', home_team_id: 'CIV', away_team_id: 'ECU', home_score: 1, away_score: 2, match_date: '14/06/2026', match_time: '19:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'E3', group_name: 'E', home_team_id: 'GER', away_team_id: 'CIV', home_score: 2, away_score: 0, match_date: '20/06/2026', match_time: '16:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'completed' },
  { id: 'E4', group_name: 'E', home_team_id: 'ECU', away_team_id: 'CUW', home_score: 3, away_score: 1, match_date: '20/06/2026', match_time: '20:00', stadium: "Levi's Stadium, São Francisco", status: 'completed' },
  { id: 'E5', group_name: 'E', home_team_id: 'ECU', away_team_id: 'GER', match_date: '26/06/2026', match_time: '14:00', stadium: 'Hard Rock Stadium, Miami', status: 'upcoming' },
  { id: 'E6', group_name: 'E', home_team_id: 'CUW', away_team_id: 'CIV', match_date: '26/06/2026', match_time: '14:00', stadium: 'BC Place, Vancouver', status: 'upcoming' },

  // --- Grupo F ---
  { id: 'F1', group_name: 'F', home_team_id: 'NED', away_team_id: 'JPN', home_score: 1, away_score: 2, match_date: '15/06/2026', match_time: '14:00', stadium: 'Gillette Stadium, Boston', status: 'completed' },
  { id: 'F2', group_name: 'F', home_team_id: 'TUN', away_team_id: 'SWE', home_score: 1, away_score: 1, match_date: '15/06/2026', match_time: '17:00', stadium: 'NRG Stadium, Houston', status: 'completed' },
  { id: 'F3', group_name: 'F', home_team_id: 'NED', away_team_id: 'TUN', home_score: 3, away_score: 1, match_date: '21/06/2026', match_time: '12:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'F4', group_name: 'F', home_team_id: 'SWE', away_team_id: 'JPN', home_score: 0, away_score: 2, match_date: '21/06/2026', match_time: '15:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'F5', group_name: 'F', home_team_id: 'SWE', away_team_id: 'NED', match_date: '27/06/2026', match_time: '13:00', stadium: 'AT&T Stadium, Dallas', status: 'upcoming' },
  { id: 'F6', group_name: 'F', home_team_id: 'JPN', away_team_id: 'TUN', match_date: '27/06/2026', match_time: '13:00', stadium: 'Lumen Field, Seattle', status: 'upcoming' },

  // --- Grupo G ---
  { id: 'G1', group_name: 'G', home_team_id: 'BEL', away_team_id: 'EGY', home_score: 2, away_score: 0, match_date: '15/06/2026', match_time: '20:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'completed' },
  { id: 'G2', group_name: 'G', home_team_id: 'IRN', away_team_id: 'NZL', home_score: 1, away_score: 0, match_date: '16/06/2026', match_time: '12:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'G3', group_name: 'G', home_team_id: 'BEL', away_team_id: 'IRN', home_score: 2, away_score: 1, match_date: '21/06/2026', match_time: '18:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'G4', group_name: 'G', home_team_id: 'NZL', away_team_id: 'EGY', home_score: 1, away_score: 1, match_date: '22/06/2026', match_time: '14:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'G5', group_name: 'G', home_team_id: 'NZL', away_team_id: 'BEL', match_date: '27/06/2026', match_time: '16:00', stadium: 'SoFi Stadium, Los Angeles', status: 'upcoming' },
  { id: 'G6', group_name: 'G', home_team_id: 'EGY', away_team_id: 'IRN', match_date: '27/06/2026', match_time: '16:00', stadium: 'Arrowhead Stadium, Kansas City', status: 'upcoming' },

  // --- Grupo H ---
  { id: 'H1', group_name: 'H', home_team_id: 'ESP', away_team_id: 'CPV', home_score: 3, away_score: 0, match_date: '16/06/2026', match_time: '15:00', stadium: 'Estádio Azteca, Cidade do México', status: 'completed' },
  { id: 'H2', group_name: 'H', home_team_id: 'KSA', away_team_id: 'URU', home_score: 0, away_score: 2, match_date: '16/06/2026', match_time: '18:00', stadium: "Levi's Stadium, São Francisco", status: 'completed' },
  { id: 'H3', group_name: 'H', home_team_id: 'ESP', away_team_id: 'KSA', home_score: 4, away_score: 1, match_date: '22/06/2026', match_time: '17:00', stadium: 'NRG Stadium, Houston', status: 'completed' },
  { id: 'H4', group_name: 'H', home_team_id: 'URU', away_team_id: 'CPV', home_score: 2, away_score: 1, match_date: '22/06/2026', match_time: '20:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'completed' },
  { id: 'H5', group_name: 'H', home_team_id: 'URU', away_team_id: 'ESP', match_date: '28/06/2026', match_time: '18:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'upcoming' },
  { id: 'H6', group_name: 'H', home_team_id: 'CPV', away_team_id: 'KSA', match_date: '28/06/2026', match_time: '18:00', stadium: 'SoFi Stadium, Los Angeles', status: 'upcoming' },

  // --- Grupo I ---
  { id: 'I1', group_name: 'I', home_team_id: 'FRA', away_team_id: 'SEN', home_score: 3, away_score: 1, match_date: '17/06/2026', match_time: '12:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'completed' },
  { id: 'I2', group_name: 'I', home_team_id: 'NOR', away_team_id: 'IRQ', home_score: 2, away_score: 0, match_date: '17/06/2026', match_time: '15:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'I3', group_name: 'I', home_team_id: 'FRA', away_team_id: 'NOR', home_score: 1, away_score: 1, match_date: '23/06/2026', match_time: '13:00', stadium: 'Gillette Stadium, Boston', status: 'completed' },
  { id: 'I4', group_name: 'I', home_team_id: 'IRQ', away_team_id: 'SEN', home_score: 0, away_score: 2, match_date: '23/06/2026', match_time: '16:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'I5', group_name: 'I', home_team_id: 'IRQ', away_team_id: 'FRA', match_date: '28/06/2026', match_time: '21:00', stadium: 'BC Place, Vancouver', status: 'upcoming' },
  { id: 'I6', group_name: 'I', home_team_id: 'SEN', away_team_id: 'NOR', match_date: '28/06/2026', match_time: '21:00', stadium: 'AT&T Stadium, Dallas', status: 'upcoming' },

  // --- Grupo J ---
  { id: 'J1', group_name: 'J', home_team_id: 'ARG', away_team_id: 'ALG', home_score: 2, away_score: 0, match_date: '17/06/2026', match_time: '21:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'J2', group_name: 'J', home_team_id: 'AUT', away_team_id: 'JOR', home_score: 3, away_score: 1, match_date: '18/06/2026', match_time: '12:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'completed' },
  { id: 'J3', group_name: 'J', home_team_id: 'ARG', away_team_id: 'AUT', home_score: 1, away_score: 0, match_date: '23/06/2026', match_time: '19:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'completed' },
  { id: 'J4', group_name: 'J', home_team_id: 'JOR', away_team_id: 'ALG', home_score: 1, away_score: 2, match_date: '24/06/2026', match_time: '13:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'J5', group_name: 'J', home_team_id: 'JOR', away_team_id: 'ARG', match_date: '29/06/2026', match_time: '16:00', stadium: 'Estádio Azteca, Cidade do México', status: 'upcoming' },
  { id: 'J6', group_name: 'J', home_team_id: 'ALG', away_team_id: 'AUT', match_date: '29/06/2026', match_time: '16:00', stadium: "Levi's Stadium, São Francisco", status: 'upcoming' },

  // --- Grupo K ---
  { id: 'K1', group_name: 'K', home_team_id: 'POR', away_team_id: 'UZB', home_score: 3, away_score: 1, match_date: '18/06/2026', match_time: '21:00', stadium: 'AT&T Stadium, Dallas', status: 'completed' },
  { id: 'K2', group_name: 'K', home_team_id: 'COL', away_team_id: 'COD', home_score: 2, away_score: 0, match_date: '19/06/2026', match_time: '12:00', stadium: 'BMO Field, Toronto', status: 'completed' },
  { id: 'K3', group_name: 'K', home_team_id: 'POR', away_team_id: 'COL', home_score: 1, away_score: 2, match_date: '24/06/2026', match_time: '18:00', stadium: 'SoFi Stadium, Los Angeles', status: 'completed' },
  { id: 'K4', group_name: 'K', home_team_id: 'COD', away_team_id: 'UZB', home_score: 0, away_score: 1, match_date: '24/06/2026', match_time: '21:00', stadium: 'Lumen Field, Seattle', status: 'completed' },
  { id: 'K5', group_name: 'K', home_team_id: 'COD', away_team_id: 'POR', match_date: '29/06/2026', match_time: '20:00', stadium: 'Lincoln Financial Field, Filadélfia', status: 'upcoming' },
  { id: 'K6', group_name: 'K', home_team_id: 'UZB', away_team_id: 'COL', match_date: '29/06/2026', match_time: '20:00', stadium: 'MetLife Stadium, Nova Jersey', status: 'upcoming' },

  // --- Grupo L ---
  { id: 'L1', group_name: 'L', home_team_id: 'ENG', away_team_id: 'CRO', home_score: 2, away_score: 1, match_date: '19/06/2026', match_time: '15:00', stadium: 'Mercedes-Benz Stadium, Atlanta', status: 'completed' },
  { id: 'L2', group_name: 'L', home_team_id: 'GHA', away_team_id: 'PAN', home_score: 2, away_score: 2, match_date: '20/06/2026', match_time: '12:00', stadium: 'NRG Stadium, Houston', status: 'completed' },
  { id: 'L3', group_name: 'L', home_team_id: 'ENG', away_team_id: 'GHA', home_score: 3, away_score: 0, match_date: '25/06/2026', match_time: '13:00', stadium: 'Hard Rock Stadium, Miami', status: 'completed' },
  { id: 'L4', group_name: 'L', home_team_id: 'PAN', away_team_id: 'CRO', home_score: 1, away_score: 3, match_date: '25/06/2026', match_time: '16:00', stadium: 'Gillette Stadium, Boston', status: 'completed' },
  { id: 'L5', group_name: 'L', home_team_id: 'PAN', away_team_id: 'ENG', match_date: '30/06/2026', match_time: '18:00', stadium: 'SoFi Stadium, Los Angeles', status: 'upcoming' },
  { id: 'L6', group_name: 'L', home_team_id: 'CRO', away_team_id: 'GHA', match_date: '30/06/2026', match_time: '18:00', stadium: 'Estádio Azteca, Cidade do México', status: 'upcoming' },
];
