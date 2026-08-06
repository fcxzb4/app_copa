import { calculateGroupStandings, matches, teams } from '../data/worldCupData';

/**
 * Testa os dados e a função de classificação da Copa do Mundo.
 * calculateGroupStandings é a lógica de negócio mais crítica do projeto.
 */
describe('worldCupData', () => {
    const ALL_GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    // ── Integridade dos dados estáticos ──────────────────────────────────────

    describe('times (teams)', () => {
        it('deve conter exatamente 48 times', () => {
            expect(teams).toHaveLength(48);
        });

        it('deve ter exatamente 4 times em cada um dos 12 grupos', () => {
            ALL_GROUPS.forEach(group => {
                const groupTeams = teams.filter(t => t.group === group);
                expect(groupTeams).toHaveLength(4);
            });
        });

        it('cada time deve ter id, name, flag, confederation e group', () => {
            teams.forEach(team => {
                expect(typeof team.id).toBe('string');
                expect(team.id.length).toBeGreaterThan(0);
                expect(typeof team.name).toBe('string');
                expect(typeof team.flag).toBe('string');
                expect(['UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC']).toContain(team.confederation);
                expect(ALL_GROUPS).toContain(team.group);
            });
        });

        it('não deve haver IDs duplicados', () => {
            const ids = teams.map(t => t.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });
    });

    describe('partidas (matches)', () => {
        it('deve conter partidas', () => {
            expect(matches.length).toBeGreaterThan(0);
        });

        it('cada partida deve ter status "completed" ou "upcoming"', () => {
            matches.forEach(m => {
                expect(['completed', 'upcoming']).toContain(m.status);
            });
        });

        it('não deve haver IDs duplicados nas partidas', () => {
            const ids = matches.map(m => m.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });

        it('homeTeamId e awayTeamId devem corresponder a times existentes', () => {
            const teamIds = new Set(teams.map(t => t.id));
            matches.forEach(m => {
                expect(teamIds.has(m.homeTeamId)).toBe(true);
                expect(teamIds.has(m.awayTeamId)).toBe(true);
            });
        });

        it('partidas completadas devem ter homeScore e awayScore definidos', () => {
            const completed = matches.filter(m => m.status === 'completed');
            completed.forEach(m => {
                expect(m.homeScore).toBeDefined();
                expect(m.awayScore).toBeDefined();
            });
        });
    });

    // ── calculateGroupStandings ──────────────────────────────────────────────

    describe('calculateGroupStandings()', () => {
        it('deve retornar 4 standings para cada grupo', () => {
            ALL_GROUPS.forEach(group => {
                const standings = calculateGroupStandings(group);
                expect(standings).toHaveLength(4);
            });
        });

        it('o team de cada standing deve corresponder ao teamId', () => {
            const standings = calculateGroupStandings('C');
            standings.forEach(s => {
                expect(s.team).toBeDefined();
                expect(s.team.id).toBe(s.teamId);
            });
        });

        it('pontos devem ser won*3 + drawn', () => {
            ALL_GROUPS.forEach(group => {
                const standings = calculateGroupStandings(group);
                standings.forEach(s => {
                    expect(s.points).toBe(s.won * 3 + s.drawn);
                });
            });
        });

        it('played deve ser won + drawn + lost', () => {
            ALL_GROUPS.forEach(group => {
                const standings = calculateGroupStandings(group);
                standings.forEach(s => {
                    expect(s.played).toBe(s.won + s.drawn + s.lost);
                });
            });
        });

        it('goalDifference deve ser goalsFor - goalsAgainst', () => {
            ALL_GROUPS.forEach(group => {
                const standings = calculateGroupStandings(group);
                standings.forEach(s => {
                    expect(s.goalDifference).toBe(s.goalsFor - s.goalsAgainst);
                });
            });
        });

        it('deve ordenar por pontos decrescente', () => {
            ALL_GROUPS.forEach(group => {
                const standings = calculateGroupStandings(group);
                for (let i = 0; i < standings.length - 1; i++) {
                    expect(standings[i].points).toBeGreaterThanOrEqual(standings[i + 1].points);
                }
            });
        });

        it('quando pontos forem iguais, deve ordenar por saldo de gols', () => {
            const standings = calculateGroupStandings('C');
            for (let i = 0; i < standings.length - 1; i++) {
                const a = standings[i];
                const b = standings[i + 1];
                if (a.points === b.points) {
                    expect(a.goalDifference).toBeGreaterThanOrEqual(b.goalDifference);
                }
            }
        });

        it('deve retornar standings com valores numéricos não-negativos', () => {
            const standings = calculateGroupStandings('C');
            standings.forEach(s => {
                expect(s.played).toBeGreaterThanOrEqual(0);
                expect(s.won).toBeGreaterThanOrEqual(0);
                expect(s.drawn).toBeGreaterThanOrEqual(0);
                expect(s.lost).toBeGreaterThanOrEqual(0);
                expect(s.goalsFor).toBeGreaterThanOrEqual(0);
                expect(s.goalsAgainst).toBeGreaterThanOrEqual(0);
                expect(s.points).toBeGreaterThanOrEqual(0);
            });
        });

        it('deve retornar standings para grupo inexistente (array de 0 itens)', () => {
            const standings = calculateGroupStandings('Z');
            expect(standings).toHaveLength(0);
        });
    });
});
