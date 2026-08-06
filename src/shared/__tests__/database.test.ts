import type { SQLiteDatabase } from 'expo-sqlite';
import { DB_NAME, DB_VERSION, migrateDb } from '../data/database/database';
import { runDatabaseSeed } from '../data/database/seeds/runSeed';

jest.mock('../data/database/seeds/runSeed', () => ({
    runDatabaseSeed: jest.fn().mockResolvedValue(undefined),
}));

describe('database configuration and migrations', () => {
    let mockDb: jest.Mocked<Partial<SQLiteDatabase>>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockDb = {
            execAsync: jest.fn().mockResolvedValue(undefined),
            getFirstAsync: jest.fn(),
            runAsync: jest.fn().mockResolvedValue(undefined as any),
        };
    });

    it('deve ter as constantes de nome e versão configuradas corretamente', () => {
        expect(DB_NAME).toBe('popular_copa.db');
        expect(DB_VERSION).toBe(4);
    });

    describe('migrateDb()', () => {
        it('deve habilitar WAL e foreign keys na inicialização', async () => {
            (mockDb.getFirstAsync as jest.Mock).mockResolvedValue({ user_version: 4 });

            await migrateDb(mockDb as unknown as SQLiteDatabase);

            expect(mockDb.execAsync).toHaveBeenCalledWith('PRAGMA journal_mode = WAL;');
            expect(mockDb.execAsync).toHaveBeenCalledWith('PRAGMA foreign_keys = ON;');
        });

        it('não deve executar migrations se a versão atual for maior ou igual a DB_VERSION', async () => {
            (mockDb.getFirstAsync as jest.Mock).mockResolvedValue({ user_version: 4 });

            await migrateDb(mockDb as unknown as SQLiteDatabase);

            // Apenas as duas PRAGMAs e a busca de user_version
            expect(mockDb.execAsync).toHaveBeenCalledTimes(2);
            expect(runDatabaseSeed).not.toHaveBeenCalled();
        });

        it('deve executar v1 e v2 quando o banco estiver na versão 0', async () => {
            (mockDb.getFirstAsync as jest.Mock).mockResolvedValue({ user_version: 0 });

            await migrateDb(mockDb as unknown as SQLiteDatabase);

            // Deve executar a criação das tabelas v1 e v2
            const execCalls = (mockDb.execAsync as jest.Mock).mock.calls.map(c => c[0]);

            // Verifica se criou tabelas v1
            expect(execCalls.some((sql: string) => sql.includes('CREATE TABLE IF NOT EXISTS user_profile'))).toBe(true);
            expect(execCalls.some((sql: string) => sql.includes('CREATE TABLE IF NOT EXISTS sticker_packs'))).toBe(true);
            expect(execCalls.some((sql: string) => sql.includes('CREATE TABLE IF NOT EXISTS collected_stickers'))).toBe(true);
            expect(execCalls.some((sql: string) => sql.includes('PRAGMA user_version = 1'))).toBe(true);

            // Verifica se criou tabelas v2
            expect(execCalls.some((sql: string) => sql.includes('CREATE TABLE IF NOT EXISTS teams'))).toBe(true);
            expect(execCalls.some((sql: string) => sql.includes('CREATE TABLE IF NOT EXISTS matches'))).toBe(true);
            expect(execCalls.some((sql: string) => sql.includes('PRAGMA user_version = 2'))).toBe(true);

            // Deve chamar a função de seeding
            expect(runDatabaseSeed).toHaveBeenCalledWith(mockDb);
        });

        it('deve executar apenas v2 quando o banco estiver na versão 1', async () => {
            (mockDb.getFirstAsync as jest.Mock).mockResolvedValue({ user_version: 1 });

            await migrateDb(mockDb as unknown as SQLiteDatabase);

            const execCalls = (mockDb.execAsync as jest.Mock).mock.calls.map(c => c[0]);

            // NÃO deve criar tabelas v1
            expect(execCalls.some((sql: string) => sql.includes('CREATE TABLE IF NOT EXISTS user_profile'))).toBe(false);

            // Deve criar tabelas v2
            expect(execCalls.some((sql: string) => sql.includes('CREATE TABLE IF NOT EXISTS teams'))).toBe(true);
            expect(execCalls.some((sql: string) => sql.includes('CREATE TABLE IF NOT EXISTS matches'))).toBe(true);
            expect(execCalls.some((sql: string) => sql.includes('PRAGMA user_version = 2'))).toBe(true);

            expect(runDatabaseSeed).toHaveBeenCalledWith(mockDb);
        });
    });
});
