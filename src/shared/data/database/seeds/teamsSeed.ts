export interface RawTeamSeed {
  id: string;
  name: string;
  flag: string;
  confederation: string;
  group_name: string;
}

export const TEAMS_SEED: RawTeamSeed[] = [
  // Group A
  { id: 'MEX', name: 'México', flag: '🇲🇽', confederation: 'CONCACAF', group_name: 'A' },
  { id: 'RSA', name: 'África do Sul', flag: '🇿🇦', confederation: 'CAF', group_name: 'A' },
  { id: 'KOR', name: 'Coreia do Sul', flag: '🇰🇷', confederation: 'AFC', group_name: 'A' },
  { id: 'CZE', name: 'Chéquia', flag: '🇨🇿', confederation: 'UEFA', group_name: 'A' },

  // Group B
  { id: 'CAN', name: 'Canadá', flag: '🇨🇦', confederation: 'CONCACAF', group_name: 'B' },
  { id: 'SUI', name: 'Suíça', flag: '🇨🇭', confederation: 'UEFA', group_name: 'B' },
  { id: 'QAT', name: 'Catar', flag: '🇶🇦', confederation: 'AFC', group_name: 'B' },
  { id: 'BIH', name: 'Bósnia e Herzegovina', flag: '🇧🇦', confederation: 'UEFA', group_name: 'B' },

  // Group C
  { id: 'BRA', name: 'Brasil', flag: '🇧🇷', confederation: 'CONMEBOL', group_name: 'C' },
  { id: 'MAR', name: 'Marrocos', flag: '🇲🇦', confederation: 'CAF', group_name: 'C' },
  { id: 'HAI', name: 'Haiti', flag: '🇭🇹', confederation: 'CONCACAF', group_name: 'C' },
  { id: 'SCO', name: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA', group_name: 'C' },

  // Group D
  { id: 'USA', name: 'Estados Unidos', flag: '🇺🇸', confederation: 'CONCACAF', group_name: 'D' },
  { id: 'PAR', name: 'Paraguai', flag: '🇵🇾', confederation: 'CONMEBOL', group_name: 'D' },
  { id: 'AUS', name: 'Austrália', flag: '🇦🇺', confederation: 'AFC', group_name: 'D' },
  { id: 'TUR', name: 'Turquia', flag: '🇹🇷', confederation: 'UEFA', group_name: 'D' },

  // Group E
  { id: 'GER', name: 'Alemanha', flag: '🇩🇪', confederation: 'UEFA', group_name: 'E' },
  { id: 'CUW', name: 'Curaçao', flag: '🇨🇼', confederation: 'CONCACAF', group_name: 'E' },
  { id: 'CIV', name: 'Costa do Marfim', flag: '🇨🇮', confederation: 'CAF', group_name: 'E' },
  { id: 'ECU', name: 'Equador', flag: '🇪🇨', confederation: 'CONMEBOL', group_name: 'E' },

  // Group F
  { id: 'NED', name: 'Holanda', flag: '🇳🇱', confederation: 'UEFA', group_name: 'F' },
  { id: 'JPN', name: 'Japão', flag: '🇯🇵', confederation: 'AFC', group_name: 'F' },
  { id: 'TUN', name: 'Tunísia', flag: '🇹🇳', confederation: 'CAF', group_name: 'F' },
  { id: 'SWE', name: 'Suécia', flag: '🇸🇪', confederation: 'UEFA', group_name: 'F' },

  // Group G
  { id: 'BEL', name: 'Bélgica', flag: '🇧🇪', confederation: 'UEFA', group_name: 'G' },
  { id: 'EGY', name: 'Egito', flag: '🇪🇬', confederation: 'CAF', group_name: 'G' },
  { id: 'IRN', name: 'Irã', flag: '🇮🇷', confederation: 'AFC', group_name: 'G' },
  { id: 'NZL', name: 'Nova Zelândia', flag: '🇳🇿', confederation: 'OFC', group_name: 'G' },

  // Group H
  { id: 'ESP', name: 'Espanha', flag: '🇪🇸', confederation: 'UEFA', group_name: 'H' },
  { id: 'CPV', name: 'Cabo Verde', flag: '🇨🇻', confederation: 'CAF', group_name: 'H' },
  { id: 'KSA', name: 'Arábia Saudita', flag: '🇸🇦', confederation: 'AFC', group_name: 'H' },
  { id: 'URU', name: 'Uruguai', flag: '🇺🇾', confederation: 'CONMEBOL', group_name: 'H' },

  // Group I
  { id: 'FRA', name: 'França', flag: '🇫🇷', confederation: 'UEFA', group_name: 'I' },
  { id: 'SEN', name: 'Senegal', flag: '🇸🇳', confederation: 'CAF', group_name: 'I' },
  { id: 'NOR', name: 'Noruega', flag: '🇳🇴', confederation: 'UEFA', group_name: 'I' },
  { id: 'IRQ', name: 'Iraque', flag: '🇮🇶', confederation: 'AFC', group_name: 'I' },

  // Group J
  { id: 'ARG', name: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL', group_name: 'J' },
  { id: 'ALG', name: 'Argélia', flag: '🇩🇿', confederation: 'CAF', group_name: 'J' },
  { id: 'AUT', name: 'Áustria', flag: '🇦🇹', confederation: 'UEFA', group_name: 'J' },
  { id: 'JOR', name: 'Jordânia', flag: '🇯🇴', confederation: 'AFC', group_name: 'J' },

  // Group K
  { id: 'POR', name: 'Portugal', flag: '🇵🇹', confederation: 'UEFA', group_name: 'K' },
  { id: 'UZB', name: 'Uzbequistão', flag: '🇺🇿', confederation: 'AFC', group_name: 'K' },
  { id: 'COL', name: 'Colômbia', flag: '🇨🇴', confederation: 'CONMEBOL', group_name: 'K' },
  { id: 'COD', name: 'RD Congo', flag: '🇨🇩', confederation: 'CAF', group_name: 'K' },

  // Group L
  { id: 'ENG', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', group_name: 'L' },
  { id: 'CRO', name: 'Croácia', flag: '🇭🇷', confederation: 'UEFA', group_name: 'L' },
  { id: 'GHA', name: 'Gana', flag: '🇬🇭', confederation: 'CAF', group_name: 'L' },
  { id: 'PAN', name: 'Panamá', flag: '🇵🇦', confederation: 'CONCACAF', group_name: 'L' },
];
