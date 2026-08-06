import type { Match, Standing, Team } from '../domain/entities/index';

describe('Domain Entities contracts', () => {
    it('deve permitir a construção de uma entidade Team válida', () => {
        const team: Team = {
            id: 'BRA',
            name: 'Brasil',
            flag: '🇧🇷',
            confederation: 'CONMEBOL',
            group: 'C',
        };

        expect(team.id).toBe('BRA');
        expect(team.name).toBe('Brasil');
        expect(team.flag).toBe('🇧🇷');
        expect(team.confederation).toBe('CONMEBOL');
        expect(team.group).toBe('C');
    });

    it('deve permitir a construção de uma entidade Match completa (com placar)', () => {
        const match: Match = {
            id: 'M1',
            group: 'C',
            homeTeamId: 'BRA',
            awayTeamId: 'ARG',
            homeScore: 2,
            awayScore: 1,
            date: '2026-06-15',
            time: '16:00',
            stadium: 'Maracanã',
            status: 'completed',
        };

        expect(match.id).toBe('M1');
        expect(match.status).toBe('completed');
        expect(match.homeScore).toBe(2);
        expect(match.awayScore).toBe(1);
    });

    it('deve permitir a construção de uma entidade Match pendente (upcoming)', () => {
        const match: Match = {
            id: 'M2',
            group: 'C',
            homeTeamId: 'FRA',
            awayTeamId: 'GER',
            date: '2026-06-20',
            time: '18:00',
            stadium: 'MetLife Stadium',
            status: 'upcoming',
        };

        expect(match.status).toBe('upcoming');
        expect(match.homeScore).toBeUndefined();
        expect(match.awayScore).toBeUndefined();
    });

    it('deve permitir a construção de uma entidade Standing com calculos corretos', () => {
        const team: Team = {
            id: 'BRA',
            name: 'Brasil',
            flag: '🇧🇷',
            confederation: 'CONMEBOL',
            group: 'C',
        };

        const standing: Standing = {
            teamId: team.id,
            team: team,
            played: 3,
            won: 2,
            drawn: 1,
            lost: 0,
            goalsFor: 5,
            goalsAgainst: 1,
            goalDifference: 4,
            points: 7,
        };

        expect(standing.teamId).toBe('BRA');
        expect(standing.points).toBe(standing.won * 3 + standing.drawn);
        expect(standing.goalDifference).toBe(standing.goalsFor - standing.goalsAgainst);
        expect(standing.played).toBe(standing.won + standing.drawn + standing.lost);
    });
});
