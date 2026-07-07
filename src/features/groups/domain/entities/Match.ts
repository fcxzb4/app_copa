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
