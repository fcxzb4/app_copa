export type Confederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';

export interface Team {
    id: string;
    name: string;
    flag: string;
    confederation: Confederation;
    group: string;
}

export interface Match {
    id: string;
    group: string;
    homeTeamId: string;
    awayTeamId: string;
    homeScore?: number;
    awayScore?: number;
    date: string;
    time: string;
    stadium: string;
    status: 'completed' | 'upcoming';
}

export interface Standing {
    teamId: string;
    team: Team;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
}