import type { Team } from '../../../teams/domain/entities/Team';

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
