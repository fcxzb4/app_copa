import { localGroupDataSource } from '../data/datasources/localGroupDataSource';

/**
 * Testa o data source de grupos locais.
 * Usa os dados reais de worldCupData (Copa 2026 com 12 grupos e 48 times).
 */
describe('localGroupDataSource', () => {
    const EXPECTED_GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    // ── getGroupLetters ──────────────────────────────────────────────────────

    describe('getGroupLetters()', () => {
        it('deve retornar exatamente 12 grupos', () => {
            const result = localGroupDataSource.getGroupLetters();
            expect(result).toHaveLength(12);
        });

        it('deve retornar os grupos de A a L', () => {
            const result = localGroupDataSource.getGroupLetters();
            expect(result).toEqual(EXPECTED_GROUPS);
        });
    });

    // ── getAllTeams ──────────────────────────────────────────────────────────

    describe('getAllTeams()', () => {
        it('deve retornar exatamente 48 times', () => {
            const result = localGroupDataSource.getAllTeams();
            expect(result).toHaveLength(48);
        });
    });

    // ── getTeamsByGroup ──────────────────────────────────────────────────────

    describe('getTeamsByGroup()', () => {
        it('deve retornar exatamente 4 times por grupo', () => {
            EXPECTED_GROUPS.forEach(group => {
                const result = localGroupDataSource.getTeamsByGroup(group);
                expect(result).toHaveLength(4);
            });
        });

        it('todos os times retornados pertencem ao grupo solicitado', () => {
            const result = localGroupDataSource.getTeamsByGroup('C');
            result.forEach(team => expect(team.group).toBe('C'));
        });

        it('deve retornar array vazio para grupo inexistente', () => {
            const result = localGroupDataSource.getTeamsByGroup('Z');
            expect(result).toHaveLength(0);
        });

        it('deve incluir o Brasil no grupo C', () => {
            const result = localGroupDataSource.getTeamsByGroup('C');
            const brasil = result.find(t => t.id === 'BRA');
            expect(brasil).toBeDefined();
        });
    });

    // ── getAllMatches ────────────────────────────────────────────────────────

    describe('getAllMatches()', () => {
        it('deve retornar um array não vazio de partidas', () => {
            const result = localGroupDataSource.getAllMatches();
            expect(result.length).toBeGreaterThan(0);
        });

        it('cada partida deve ter as propriedades obrigatórias', () => {
            const result = localGroupDataSource.getAllMatches();
            result.forEach(match => {
                expect(match).toHaveProperty('id');
                expect(match).toHaveProperty('group');
                expect(match).toHaveProperty('homeTeamId');
                expect(match).toHaveProperty('awayTeamId');
                expect(match).toHaveProperty('status');
                expect(['completed', 'upcoming']).toContain(match.status);
            });
        });
    });

    // ── getMatchesByStatus ───────────────────────────────────────────────────

    describe('getMatchesByStatus()', () => {
        it('deve retornar apenas partidas com status "completed"', () => {
            const result = localGroupDataSource.getMatchesByStatus('completed');
            expect(result.length).toBeGreaterThan(0);
            result.forEach(m => expect(m.status).toBe('completed'));
        });

        it('deve retornar apenas partidas com status "upcoming"', () => {
            const result = localGroupDataSource.getMatchesByStatus('upcoming');
            expect(result.length).toBeGreaterThan(0);
            result.forEach(m => expect(m.status).toBe('upcoming'));
        });

        it('completed + upcoming deve somar o total de partidas', () => {
            const all = localGroupDataSource.getAllMatches();
            const completed = localGroupDataSource.getMatchesByStatus('completed');
            const upcoming = localGroupDataSource.getMatchesByStatus('upcoming');
            expect(completed.length + upcoming.length).toBe(all.length);
        });
    });

    // ── calculateGroupStandings ──────────────────────────────────────────────

    describe('calculateGroupStandings()', () => {
        it('deve retornar exatamente 4 standings por grupo', () => {
            EXPECTED_GROUPS.forEach(group => {
                const result = localGroupDataSource.calculateGroupStandings(group);
                expect(result).toHaveLength(4);
            });
        });

        it('cada standing deve ter as propriedades obrigatórias', () => {
            const result = localGroupDataSource.calculateGroupStandings('C');
            result.forEach(s => {
                expect(s).toHaveProperty('teamId');
                expect(s).toHaveProperty('team');
                expect(s).toHaveProperty('played');
                expect(s).toHaveProperty('won');
                expect(s).toHaveProperty('drawn');
                expect(s).toHaveProperty('lost');
                expect(s).toHaveProperty('goalsFor');
                expect(s).toHaveProperty('goalsAgainst');
                expect(s).toHaveProperty('goalDifference');
                expect(s).toHaveProperty('points');
            });
        });

        it('standings devem estar ordenados por pontos (decrescente)', () => {
            const result = localGroupDataSource.calculateGroupStandings('C');
            for (let i = 0; i < result.length - 1; i++) {
                expect(result[i].points).toBeGreaterThanOrEqual(result[i + 1].points);
            }
        });

        it('points = won*3 + drawn para cada time', () => {
            const result = localGroupDataSource.calculateGroupStandings('C');
            result.forEach(s => {
                const expected = s.won * 3 + s.drawn;
                expect(s.points).toBe(expected);
            });
        });

        it('played = won + drawn + lost para cada time', () => {
            const result = localGroupDataSource.calculateGroupStandings('C');
            result.forEach(s => {
                expect(s.played).toBe(s.won + s.drawn + s.lost);
            });
        });

        it('goalDifference = goalsFor - goalsAgainst', () => {
            const result = localGroupDataSource.calculateGroupStandings('C');
            result.forEach(s => {
                expect(s.goalDifference).toBe(s.goalsFor - s.goalsAgainst);
            });
        });
    });
});
