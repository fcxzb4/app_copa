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
  status: 'completed' | 'upcoming';
}

export const MATCHES_SEED: RawMatchSeed[] = [
  // --- Grupo A ---
  { id: 'A1', group_name: 'A', home_team_id: 'QAT', away_team_id: 'ECU', home_score: 0, away_score: 2, match_date: '20/11/2022', match_time: '13:00', stadium: 'Estádio Al Bayt, Al Khor', status: 'completed' },
  { id: 'A2', group_name: 'A', home_team_id: 'SEN', away_team_id: 'NED', home_score: 0, away_score: 2, match_date: '21/11/2022', match_time: '13:00', stadium: 'Estádio Al Thumama, Doha', status: 'completed' },
  { id: 'A3', group_name: 'A', home_team_id: 'QAT', away_team_id: 'SEN', home_score: 1, away_score: 3, match_date: '25/11/2022', match_time: '10:00', stadium: 'Estádio Al Thumama, Doha', status: 'completed' },
  { id: 'A4', group_name: 'A', home_team_id: 'NED', away_team_id: 'ECU', home_score: 1, away_score: 1, match_date: '25/11/2022', match_time: '13:00', stadium: 'Estádio Internacional Khalifa, Al Rayyan', status: 'completed' },
  { id: 'A5', group_name: 'A', home_team_id: 'ECU', away_team_id: 'SEN', home_score: 1, away_score: 2, match_date: '29/11/2022', match_time: '12:00', stadium: 'Estádio Internacional Khalifa, Al Rayyan', status: 'completed' },
  { id: 'A6', group_name: 'A', home_team_id: 'NED', away_team_id: 'QAT', home_score: 2, away_score: 0, match_date: '29/11/2022', match_time: '12:00', stadium: 'Estádio Al Bayt, Al Khor', status: 'completed' },

  // --- Grupo B ---
  { id: 'B1', group_name: 'B', home_team_id: 'ENG', away_team_id: 'IRN', home_score: 6, away_score: 2, match_date: '21/11/2022', match_time: '10:00', stadium: 'Estádio Internacional Khalifa, Al Rayyan', status: 'completed' },
  { id: 'B2', group_name: 'B', home_team_id: 'USA', away_team_id: 'WAL', home_score: 1, away_score: 1, match_date: '21/11/2022', match_time: '16:00', stadium: 'Estádio Ahmad bin Ali, Al Rayyan', status: 'completed' },
  { id: 'B3', group_name: 'B', home_team_id: 'WAL', away_team_id: 'IRN', home_score: 0, away_score: 2, match_date: '25/11/2022', match_time: '07:00', stadium: 'Estádio Ahmad bin Ali, Al Rayyan', status: 'completed' },
  { id: 'B4', group_name: 'B', home_team_id: 'ENG', away_team_id: 'USA', home_score: 0, away_score: 0, match_date: '25/11/2022', match_time: '16:00', stadium: 'Estádio Al Bayt, Al Khor', status: 'completed' },
  { id: 'B5', group_name: 'B', home_team_id: 'WAL', away_team_id: 'ENG', home_score: 0, away_score: 3, match_date: '29/11/2022', match_time: '16:00', stadium: 'Estádio Ahmad bin Ali, Al Rayyan', status: 'completed' },
  { id: 'B6', group_name: 'B', home_team_id: 'IRN', away_team_id: 'USA', home_score: 0, away_score: 1, match_date: '29/11/2022', match_time: '16:00', stadium: 'Estádio Al Thumama, Doha', status: 'completed' },

  // --- Grupo C ---
  { id: 'C1', group_name: 'C', home_team_id: 'ARG', away_team_id: 'KSA', home_score: 1, away_score: 2, match_date: '22/11/2022', match_time: '07:00', stadium: 'Estádio Lusail, Lusail', status: 'completed' },
  { id: 'C2', group_name: 'C', home_team_id: 'MEX', away_team_id: 'POL', home_score: 0, away_score: 0, match_date: '22/11/2022', match_time: '13:00', stadium: 'Estádio 974, Doha', status: 'completed' },
  { id: 'C3', group_name: 'C', home_team_id: 'POL', away_team_id: 'KSA', home_score: 2, away_score: 0, match_date: '26/11/2022', match_time: '10:00', stadium: 'Estádio Education City, Al Rayyan', status: 'completed' },
  { id: 'C4', group_name: 'C', home_team_id: 'ARG', away_team_id: 'MEX', home_score: 2, away_score: 0, match_date: '26/11/2022', match_time: '16:00', stadium: 'Estádio Lusail, Lusail', status: 'completed' },
  { id: 'C5', group_name: 'C', home_team_id: 'POL', away_team_id: 'ARG', home_score: 0, away_score: 2, match_date: '30/11/2022', match_time: '16:00', stadium: 'Estádio 974, Doha', status: 'completed' },
  { id: 'C6', group_name: 'C', home_team_id: 'KSA', away_team_id: 'MEX', home_score: 1, away_score: 2, match_date: '30/11/2022', match_time: '16:00', stadium: 'Estádio Lusail, Lusail', status: 'completed' },

  // --- Grupo D ---
  { id: 'D1', group_name: 'D', home_team_id: 'DEN', away_team_id: 'TUN', home_score: 0, away_score: 0, match_date: '22/11/2022', match_time: '10:00', stadium: 'Estádio Education City, Al Rayyan', status: 'completed' },
  { id: 'D2', group_name: 'D', home_team_id: 'FRA', away_team_id: 'AUS', home_score: 4, away_score: 1, match_date: '22/11/2022', match_time: '16:00', stadium: 'Estádio Al Janoub, Al Wakrah', status: 'completed' },
  { id: 'D3', group_name: 'D', home_team_id: 'TUN', away_team_id: 'AUS', home_score: 0, away_score: 1, match_date: '26/11/2022', match_time: '07:00', stadium: 'Estádio Al Janoub, Al Wakrah', status: 'completed' },
  { id: 'D4', group_name: 'D', home_team_id: 'FRA', away_team_id: 'DEN', home_score: 2, away_score: 1, match_date: '26/11/2022', match_time: '13:00', stadium: 'Estádio 974, Doha', status: 'completed' },
  { id: 'D5', group_name: 'D', home_team_id: 'AUS', away_team_id: 'DEN', home_score: 1, away_score: 0, match_date: '30/11/2022', match_time: '12:00', stadium: 'Estádio Al Janoub, Al Wakrah', status: 'completed' },
  { id: 'D6', group_name: 'D', home_team_id: 'TUN', away_team_id: 'FRA', home_score: 1, away_score: 0, match_date: '30/11/2022', match_time: '12:00', stadium: 'Estádio Education City, Al Rayyan', status: 'completed' },

  // --- Grupo E ---
  { id: 'E1', group_name: 'E', home_team_id: 'GER', away_team_id: 'JPN', home_score: 1, away_score: 2, match_date: '23/11/2022', match_time: '10:00', stadium: 'Estádio Internacional Khalifa, Al Rayyan', status: 'completed' },
  { id: 'E2', group_name: 'E', home_team_id: 'ESP', away_team_id: 'CRC', home_score: 7, away_score: 0, match_date: '23/11/2022', match_time: '13:00', stadium: 'Estádio Al Thumama, Doha', status: 'completed' },
  { id: 'E3', group_name: 'E', home_team_id: 'JPN', away_team_id: 'CRC', home_score: 0, away_score: 1, match_date: '27/11/2022', match_time: '07:00', stadium: 'Estádio Ahmad bin Ali, Al Rayyan', status: 'completed' },
  { id: 'E4', group_name: 'E', home_team_id: 'ESP', away_team_id: 'GER', home_score: 1, away_score: 1, match_date: '27/11/2022', match_time: '16:00', stadium: 'Estádio Al Bayt, Al Khor', status: 'completed' },
  { id: 'E5', group_name: 'E', home_team_id: 'JPN', away_team_id: 'ESP', home_score: 2, away_score: 1, match_date: '01/12/2022', match_time: '16:00', stadium: 'Estádio Internacional Khalifa, Al Rayyan', status: 'completed' },
  { id: 'E6', group_name: 'E', home_team_id: 'CRC', away_team_id: 'GER', home_score: 2, away_score: 4, match_date: '01/12/2022', match_time: '16:00', stadium: 'Estádio Al Bayt, Al Khor', status: 'completed' },

  // --- Grupo F ---
  { id: 'F1', group_name: 'F', home_team_id: 'MAR', away_team_id: 'CRO', home_score: 0, away_score: 0, match_date: '23/11/2022', match_time: '07:00', stadium: 'Estádio Al Janoub, Al Wakrah', status: 'completed' },
  { id: 'F2', group_name: 'F', home_team_id: 'BEL', away_team_id: 'CAN', home_score: 1, away_score: 0, match_date: '23/11/2022', match_time: '16:00', stadium: 'Estádio Ahmad bin Ali, Al Rayyan', status: 'completed' },
  { id: 'F3', group_name: 'F', home_team_id: 'BEL', away_team_id: 'MAR', home_score: 0, away_score: 2, match_date: '27/11/2022', match_time: '10:00', stadium: 'Estádio Al Thumama, Doha', status: 'completed' },
  { id: 'F4', group_name: 'F', home_team_id: 'CRO', away_team_id: 'CAN', home_score: 4, away_score: 1, match_date: '27/11/2022', match_time: '13:00', stadium: 'Estádio Internacional Khalifa, Al Rayyan', status: 'completed' },
  { id: 'F5', group_name: 'F', home_team_id: 'CRO', away_team_id: 'BEL', home_score: 0, away_score: 0, match_date: '01/12/2022', match_time: '12:00', stadium: 'Estádio Ahmad bin Ali, Al Rayyan', status: 'completed' },
  { id: 'F6', group_name: 'F', home_team_id: 'CAN', away_team_id: 'MAR', home_score: 1, away_score: 2, match_date: '01/12/2022', match_time: '12:00', stadium: 'Estádio Al Thumama, Doha', status: 'completed' },

  // --- Grupo G ---
  { id: 'G1', group_name: 'G', home_team_id: 'SUI', away_team_id: 'CMR', home_score: 1, away_score: 0, match_date: '24/11/2022', match_time: '07:00', stadium: 'Estádio Al Janoub, Al Wakrah', status: 'completed' },
  { id: 'G2', group_name: 'G', home_team_id: 'BRA', away_team_id: 'SRB', home_score: 2, away_score: 0, match_date: '24/11/2022', match_time: '16:00', stadium: 'Estádio Lusail, Lusail', status: 'completed' },
  { id: 'G3', group_name: 'G', home_team_id: 'CMR', away_team_id: 'SRB', home_score: 3, away_score: 3, match_date: '28/11/2022', match_time: '07:00', stadium: 'Estádio Al Janoub, Al Wakrah', status: 'completed' },
  { id: 'G4', group_name: 'G', home_team_id: 'BRA', away_team_id: 'SUI', home_score: 1, away_score: 0, match_date: '28/11/2022', match_time: '13:00', stadium: 'Estádio 974, Doha', status: 'completed' },
  { id: 'G5', group_name: 'G', home_team_id: 'SRB', away_team_id: 'SUI', home_score: 2, away_score: 3, match_date: '02/12/2022', match_time: '16:00', stadium: 'Estádio 974, Doha', status: 'completed' },
  { id: 'G6', group_name: 'G', home_team_id: 'CMR', away_team_id: 'BRA', home_score: 1, away_score: 0, match_date: '02/12/2022', match_time: '16:00', stadium: 'Estádio Lusail, Lusail', status: 'completed' },

  // --- Grupo H ---
  { id: 'H1', group_name: 'H', home_team_id: 'URU', away_team_id: 'KOR', home_score: 0, away_score: 0, match_date: '24/11/2022', match_time: '10:00', stadium: 'Estádio Education City, Al Rayyan', status: 'completed' },
  { id: 'H2', group_name: 'H', home_team_id: 'POR', away_team_id: 'GHA', home_score: 3, away_score: 2, match_date: '24/11/2022', match_time: '13:00', stadium: 'Estádio 974, Doha', status: 'completed' },
  { id: 'H3', group_name: 'H', home_team_id: 'KOR', away_team_id: 'GHA', home_score: 2, away_score: 3, match_date: '28/11/2022', match_time: '10:00', stadium: 'Estádio Education City, Al Rayyan', status: 'completed' },
  { id: 'H4', group_name: 'H', home_team_id: 'POR', away_team_id: 'URU', home_score: 2, away_score: 0, match_date: '28/11/2022', match_time: '16:00', stadium: 'Estádio Lusail, Lusail', status: 'completed' },
  { id: 'H5', group_name: 'H', home_team_id: 'GHA', away_team_id: 'URU', home_score: 0, away_score: 2, match_date: '02/12/2022', match_time: '12:00', stadium: 'Estádio Al Janoub, Al Wakrah', status: 'completed' },
  { id: 'H6', group_name: 'H', home_team_id: 'KOR', away_team_id: 'POR', home_score: 2, away_score: 1, match_date: '02/12/2022', match_time: '12:00', stadium: 'Estádio Education City, Al Rayyan', status: 'completed' },
];
