import { localTeamDataSource } from '../localTeamDataSource';

/**
 * Testa o data source de times locais.
 * Usa os dados reais de worldCupData (48 times da Copa).
 */
describe('localTeamDataSource', () => {
    // ── getAllTeams ──────────────────────────────────────────────────────────

    describe('getAllTeams()', () => {
        it('deve retornar um array não vazio', () => {
            const result = localTeamDataSource.getAllTeams();
            expect(result.length).toBeGreaterThan(0);
        });

        it('deve retornar exatamente 48 times (formato da Copa 2026)', () => {
            const result = localTeamDataSource.getAllTeams();
            expect(result).toHaveLength(48);
        });

        it('cada time deve ter as propriedades obrigatórias', () => {
            const result = localTeamDataSource.getAllTeams();
            result.forEach(team => {
                expect(team).toHaveProperty('id');
                expect(team).toHaveProperty('name');
                expect(team).toHaveProperty('flag');
                expect(team).toHaveProperty('confederation');
                expect(team).toHaveProperty('group');
            });
        });
    });

    // ── getTeamById ──────────────────────────────────────────────────────────

    describe('getTeamById()', () => {
        it('deve retornar o time correto para um ID válido', () => {
            const team = localTeamDataSource.getTeamById('BRA');
            expect(team).toBeDefined();
            expect(team!.id).toBe('BRA');
            expect(team!.name).toBe('Brasil');
        });

        it('deve retornar undefined para um ID inexistente', () => {
            const team = localTeamDataSource.getTeamById('XXX');
            expect(team).toBeUndefined();
        });

        it('deve retornar undefined para string vazia', () => {
            const team = localTeamDataSource.getTeamById('');
            expect(team).toBeUndefined();
        });
    });

    // ── getTeamsByFilters ────────────────────────────────────────────────────

    describe('getTeamsByFilters()', () => {
        it('deve buscar por nome (case-insensitive)', () => {
            const result = localTeamDataSource.getTeamsByFilters({ searchQuery: 'brasil' });
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('BRA');
        });

        it('deve buscar por nome com maiúsculas', () => {
            const result = localTeamDataSource.getTeamsByFilters({ searchQuery: 'BRASIL' });
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('BRA');
        });

        it('deve buscar por nome parcial', () => {
            const result = localTeamDataSource.getTeamsByFilters({ searchQuery: 'bra' });
            expect(result.length).toBeGreaterThan(0);
            result.forEach(t =>
                expect(t.name.toLowerCase()).toContain('bra')
            );
        });

        it('deve filtrar por confederação CAF', () => {
            const result = localTeamDataSource.getTeamsByFilters({ confederation: 'CAF' });
            expect(result.length).toBeGreaterThan(0);
            result.forEach(t => expect(t.confederation).toBe('CAF'));
        });

        it('deve filtrar por confederação UEFA', () => {
            const result = localTeamDataSource.getTeamsByFilters({ confederation: 'UEFA' });
            expect(result.length).toBeGreaterThan(0);
            result.forEach(t => expect(t.confederation).toBe('UEFA'));
        });

        it('deve retornar todos quando confederação for "ALL"', () => {
            const all = localTeamDataSource.getAllTeams();
            const result = localTeamDataSource.getTeamsByFilters({ confederation: 'ALL' });
            expect(result).toHaveLength(all.length);
        });

        it('deve retornar todos quando filtro estiver vazio', () => {
            const all = localTeamDataSource.getAllTeams();
            const result = localTeamDataSource.getTeamsByFilters({});
            expect(result).toHaveLength(all.length);
        });

        it('deve retornar array vazio para busca sem resultados', () => {
            const result = localTeamDataSource.getTeamsByFilters({ searchQuery: 'xyzxyz123' });
            expect(result).toHaveLength(0);
        });

        it('deve combinar busca por nome e confederação', () => {
            const result = localTeamDataSource.getTeamsByFilters({
                searchQuery: 'e',
                confederation: 'CONMEBOL',
            });
            result.forEach(t => {
                expect(t.confederation).toBe('CONMEBOL');
                expect(t.name.toLowerCase()).toContain('e');
            });
        });
    });
});
