import type { SQLiteDatabase } from 'expo-sqlite';
import { MATCHES_SEED } from '../data/database/seeds/matchesSeed';
import { runDatabaseSeed } from '../data/database/seeds/runSeed';
import { TEAMS_SEED } from '../data/database/seeds/teamsSeed';

describe('Database Seeds', () => {
    describe('TEAMS_SEED', () => {
        it('deve conter 32 seleções', () => {
            expect(TEAMS_SEED).toHaveLength(32);
        });

        it('deve conter 4 seleções para cada um dos 8 grupos (A-H)', () => {
            const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            groups.forEach(g => {
                const teamsInGroup = TEAMS_SEED.filter(t => t.group_name === g);
                expect(teamsInGroup).toHaveLength(4);
            });
        });

        it('cada seleção deve ter id, name, flag, confederation e group_name preenchidos', () => {
            TEAMS_SEED.forEach(team => {
                expect(typeof team.id).toBe('string');
                expect(team.id.length).toBeGreaterThan(0);
                expect(typeof team.name).toBe('string');
                expect(typeof team.flag).toBe('string');
                expect(typeof team.confederation).toBe('string');
                expect(typeof team.group_name).toBe('string');
            });
        });

        it('não deve haver IDs de times duplicados', () => {
            const ids = TEAMS_SEED.map(t => t.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });
    });

    describe('MATCHES_SEED', () => {
        it('deve conter partidas', () => {
            expect(MATCHES_SEED.length).toBeGreaterThan(0);
        });

        it('cada partida deve referenciar um home_team_id e away_team_id válidos em TEAMS_SEED', () => {
            const teamIds = new Set(TEAMS_SEED.map(t => t.id));
            MATCHES_SEED.forEach(match => {
                expect(teamIds.has(match.home_team_id)).toBe(true);
                expect(teamIds.has(match.away_team_id)).toBe(true);
            });
        });

        it('não deve haver IDs de partidas duplicados', () => {
            const ids = MATCHES_SEED.map(m => m.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });

        it('cada partida deve ter status "completed" ou "upcoming"', () => {
            MATCHES_SEED.forEach(match => {
                expect(['completed', 'upcoming']).toContain(match.status);
            });
        });
    });

    describe('runDatabaseSeed()', () => {
        let mockDb: jest.Mocked<Partial<SQLiteDatabase>>;

        beforeEach(() => {
            mockDb = {
                execAsync: jest.fn().mockResolvedValue(undefined),
                getFirstAsync: jest.fn(),
                runAsync: jest.fn().mockResolvedValue(undefined as any),
            };
        });

        it('deve abortar sem dar seed se o banco já tiver times cadastrados (dupla proteção)', async () => {
            (mockDb.getFirstAsync as jest.Mock).mockResolvedValue({ total: 32 });

            await runDatabaseSeed(mockDb as unknown as SQLiteDatabase);

            expect(mockDb.execAsync).not.toHaveBeenCalled();
            expect(mockDb.runAsync).not.toHaveBeenCalled();
        });

        it('deve semear o banco com sucesso usando transação atômica quando a contagem for 0', async () => {
            (mockDb.getFirstAsync as jest.Mock).mockResolvedValue({ total: 0 });

            await runDatabaseSeed(mockDb as unknown as SQLiteDatabase);

            expect(mockDb.execAsync).toHaveBeenCalledWith('BEGIN TRANSACTION;');
            expect(mockDb.execAsync).toHaveBeenCalledWith('COMMIT;');

            // Verifica se inseriu 32 seleções e todas as partidas
            const totalInserts = TEAMS_SEED.length + MATCHES_SEED.length;
            expect(mockDb.runAsync).toHaveBeenCalledTimes(totalInserts);
        });

        it('deve fazer ROLLBACK e lançar erro se ocorrer falha na inserção', async () => {
            (mockDb.getFirstAsync as jest.Mock).mockResolvedValue({ total: 0 });
            (mockDb.runAsync as jest.Mock).mockRejectedValueOnce(new Error('Erro de inserção SQLite'));

            await expect(runDatabaseSeed(mockDb as unknown as SQLiteDatabase)).rejects.toThrow(
                '[runDatabaseSeed] Falha ao semear o banco'
            );

            expect(mockDb.execAsync).toHaveBeenCalledWith('BEGIN TRANSACTION;');
            expect(mockDb.execAsync).toHaveBeenCalledWith('ROLLBACK;');
        });
    });
});
