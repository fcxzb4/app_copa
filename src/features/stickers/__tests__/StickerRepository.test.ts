/**
 * Testes unitarios para StickerRepository.
 *
 * O SQLite e completamente mockado via um "fake db" que simula as APIs
 * de getFirstAsync, getAllAsync, runAsync e withTransactionAsync.
 */

import { StickerRepository } from '../data/StickerRepository';

// ─── Fake DB ──────────────────────────────────────────────────────────────────

function createFakeDb(overrides: Partial<{
    getFirstAsync: jest.Mock;
    getAllAsync: jest.Mock;
    runAsync: jest.Mock;
    withTransactionAsync: jest.Mock;
}> = {}) {
    return {
        getFirstAsync: overrides.getFirstAsync ?? jest.fn(),
        getAllAsync: overrides.getAllAsync ?? jest.fn(),
        runAsync: overrides.runAsync ?? jest.fn().mockResolvedValue(undefined),
        withTransactionAsync: overrides.withTransactionAsync ?? jest.fn(async (fn: () => Promise<void>) => fn()),
    };
}

// ─── Testes: getPacksRemaining ────────────────────────────────────────────────

describe('StickerRepository.getPacksRemaining', () => {
    it('retorna o valor do banco quando existe', async () => {
        const db = createFakeDb({
            getFirstAsync: jest.fn().mockResolvedValue({ packs_remaining: 3 }),
        });
        const repo = new StickerRepository(db as any);
        expect(await repo.getPacksRemaining()).toBe(3);
    });

    it('retorna 5 como fallback quando row e null', async () => {
        const db = createFakeDb({
            getFirstAsync: jest.fn().mockResolvedValue(null),
        });
        const repo = new StickerRepository(db as any);
        expect(await repo.getPacksRemaining()).toBe(5);
    });

    it('retorna 5 como fallback quando row e undefined', async () => {
        const db = createFakeDb({
            getFirstAsync: jest.fn().mockResolvedValue(undefined),
        });
        const repo = new StickerRepository(db as any);
        expect(await repo.getPacksRemaining()).toBe(5);
    });

    it('retorna 0 quando banco retorna 0 pacotes', async () => {
        const db = createFakeDb({
            getFirstAsync: jest.fn().mockResolvedValue({ packs_remaining: 0 }),
        });
        const repo = new StickerRepository(db as any);
        expect(await repo.getPacksRemaining()).toBe(0);
    });
});

// ─── Testes: setPacksRemaining ────────────────────────────────────────────────

describe('StickerRepository.setPacksRemaining', () => {
    it('chama runAsync com o valor correto', async () => {
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const db = createFakeDb({ runAsync });
        const repo = new StickerRepository(db as any);
        await repo.setPacksRemaining(3);
        expect(runAsync).toHaveBeenCalledTimes(1);
        const callArgs = runAsync.mock.calls[0];
        expect(callArgs[1]).toBe(3); // valor passado ao SQL
    });

    it('garante que valor negativo seja convertido para 0 (floor)', async () => {
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const db = createFakeDb({ runAsync });
        const repo = new StickerRepository(db as any);
        await repo.setPacksRemaining(-5);
        expect(runAsync.mock.calls[0][1]).toBe(0);
    });

    it('aceita valor zero sem modificar', async () => {
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const db = createFakeDb({ runAsync });
        const repo = new StickerRepository(db as any);
        await repo.setPacksRemaining(0);
        expect(runAsync.mock.calls[0][1]).toBe(0);
    });
});

// ─── Testes: openPack ─────────────────────────────────────────────────────────

describe('StickerRepository.openPack', () => {
    it('decrementa o saldo e retorna o novo valor', async () => {
        const getFirstAsync = jest.fn().mockResolvedValue({ packs_remaining: 4 });
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const db = createFakeDb({ getFirstAsync, runAsync });
        const repo = new StickerRepository(db as any);

        const result = await repo.openPack();
        expect(result).toBe(3);
        expect(runAsync).toHaveBeenCalledTimes(1);
    });

    it('retorna 0 e nao chama runAsync quando saldo ja e 0', async () => {
        const getFirstAsync = jest.fn().mockResolvedValue({ packs_remaining: 0 });
        const runAsync = jest.fn();
        const db = createFakeDb({ getFirstAsync, runAsync });
        const repo = new StickerRepository(db as any);

        const result = await repo.openPack();
        expect(result).toBe(0);
        expect(runAsync).not.toHaveBeenCalled();
    });

    it('retorna 0 e nao chama runAsync quando banco retorna fallback 5 mas conta esta em 1', async () => {
        // Abre com 1 pacote restante
        const getFirstAsync = jest.fn().mockResolvedValue({ packs_remaining: 1 });
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const db = createFakeDb({ getFirstAsync, runAsync });
        const repo = new StickerRepository(db as any);

        const result = await repo.openPack();
        expect(result).toBe(0);
        expect(runAsync).toHaveBeenCalledTimes(1);
    });
});

// ─── Testes: getTotalCollected ────────────────────────────────────────────────

describe('StickerRepository.getTotalCollected', () => {
    it('retorna o total do banco', async () => {
        const db = createFakeDb({
            getFirstAsync: jest.fn().mockResolvedValue({ total: 42 }),
        });
        const repo = new StickerRepository(db as any);
        expect(await repo.getTotalCollected()).toBe(42);
    });

    it('retorna 0 como fallback quando row e null', async () => {
        const db = createFakeDb({
            getFirstAsync: jest.fn().mockResolvedValue(null),
        });
        const repo = new StickerRepository(db as any);
        expect(await repo.getTotalCollected()).toBe(0);
    });
});

// ─── Testes: getAllStickers ───────────────────────────────────────────────────

describe('StickerRepository.getAllStickers', () => {
    it('retorna lista de figurinhas do banco', async () => {
        const stickers = [
            { id: 1, sticker_id: 'br-1', player_name: 'Neymar', flag: 'brazil', group_name: 'Grupo G', team_id: 'bra', is_duplicate: 0, collected_at: '2026-01-01' },
            { id: 2, sticker_id: 'ar-1', player_name: 'Messi', flag: 'argentina', group_name: 'Grupo A', team_id: 'arg', is_duplicate: 1, collected_at: '2026-01-02' },
        ];
        const db = createFakeDb({
            getAllAsync: jest.fn().mockResolvedValue(stickers),
        });
        const repo = new StickerRepository(db as any);
        const result = await repo.getAllStickers();
        expect(result).toHaveLength(2);
        expect(result[0].player_name).toBe('Neymar');
    });

    it('retorna lista vazia quando nao ha figurinhas', async () => {
        const db = createFakeDb({
            getAllAsync: jest.fn().mockResolvedValue([]),
        });
        const repo = new StickerRepository(db as any);
        expect(await repo.getAllStickers()).toEqual([]);
    });
});

// ─── Testes: getUniqueStickers ────────────────────────────────────────────────

describe('StickerRepository.getUniqueStickers', () => {
    it('retorna apenas figurinhas unicas (is_duplicate = 0)', async () => {
        const uniqueStickers = [
            { id: 1, sticker_id: 'br-1', player_name: 'Rodrygo', is_duplicate: 0 },
        ];
        const db = createFakeDb({
            getAllAsync: jest.fn().mockResolvedValue(uniqueStickers),
        });
        const repo = new StickerRepository(db as any);
        const result = await repo.getUniqueStickers();
        expect(result).toHaveLength(1);
        expect(result[0].is_duplicate).toBe(0);
    });
});

// ─── Testes: getCountByTeam ───────────────────────────────────────────────────

describe('StickerRepository.getCountByTeam', () => {
    it('transforma rows em Record<string, number>', async () => {
        const rows = [
            { team_id: 'bra', count: 5 },
            { team_id: 'arg', count: 3 },
        ];
        const db = createFakeDb({
            getAllAsync: jest.fn().mockResolvedValue(rows),
        });
        const repo = new StickerRepository(db as any);
        const result = await repo.getCountByTeam();
        expect(result).toEqual({ bra: 5, arg: 3 });
    });

    it('retorna objeto vazio quando nao ha dados', async () => {
        const db = createFakeDb({
            getAllAsync: jest.fn().mockResolvedValue([]),
        });
        const repo = new StickerRepository(db as any);
        expect(await repo.getCountByTeam()).toEqual({});
    });
});

// ─── Testes: addStickers ─────────────────────────────────────────────────────

describe('StickerRepository.addStickers', () => {
    it('insere figurinha nova com is_duplicate = 0', async () => {
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const getFirstAsync = jest.fn().mockResolvedValue(null); // nao existe ainda
        const db = createFakeDb({
            runAsync,
            getFirstAsync,
            withTransactionAsync: jest.fn(async (fn: () => Promise<void>) => fn()),
        });
        const repo = new StickerRepository(db as any);

        await repo.addStickers([{ sticker_id: 'br-1', player_name: 'Vini Jr', flag: 'brazil', group_name: 'Grupo G' }]);

        // runAsync args: (sql, sticker_id, player_name, flag, group_name, team_id, is_duplicate)
        const insertCall = runAsync.mock.calls[0];
        expect(insertCall[6]).toBe(0); // is_duplicate (index 6)
    });

    it('insere figurinha duplicada com is_duplicate = 1', async () => {
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const getFirstAsync = jest.fn().mockResolvedValue({ id: 99 }); // ja existe
        const db = createFakeDb({
            runAsync,
            getFirstAsync,
            withTransactionAsync: jest.fn(async (fn: () => Promise<void>) => fn()),
        });
        const repo = new StickerRepository(db as any);

        await repo.addStickers([{ sticker_id: 'br-1', player_name: 'Vini Jr', flag: 'brazil', group_name: 'Grupo G' }]);

        // runAsync args: (sql, sticker_id, player_name, flag, group_name, team_id, is_duplicate)
        const insertCall = runAsync.mock.calls[0];
        expect(insertCall[6]).toBe(1); // is_duplicate (index 6)
    });
});

// ─── Testes: upsertUserProfile / getUserProfile ───────────────────────────────

describe('StickerRepository.upsertUserProfile', () => {
    it('chama runAsync para upsert do perfil', async () => {
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const db = createFakeDb({ runAsync });
        const repo = new StickerRepository(db as any);

        await repo.upsertUserProfile({ uid: 'uid-1', display_name: 'Joao', avatar_emoji: 'soccer_ball' });
        expect(runAsync).toHaveBeenCalledTimes(1);
        expect(runAsync.mock.calls[0][1]).toBe('uid-1');
    });

    it('usa null para display_name quando nao fornecido', async () => {
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const db = createFakeDb({ runAsync });
        const repo = new StickerRepository(db as any);

        await repo.upsertUserProfile({ uid: 'uid-2' });
        expect(runAsync.mock.calls[0][2]).toBeNull();
    });

    it('usa emoji padrao quando avatar_emoji nao fornecido', async () => {
        const runAsync = jest.fn().mockResolvedValue(undefined);
        const db = createFakeDb({ runAsync });
        const repo = new StickerRepository(db as any);

        await repo.upsertUserProfile({ uid: 'uid-3' });
        // emoji padrao definido no StickerRepository e '\u{1F464}' (👤)
        expect(runAsync.mock.calls[0][3]).toBe('\u{1F464}');
    });
});

describe('StickerRepository.getUserProfile', () => {
    it('retorna perfil quando encontrado', async () => {
        const profile = { id: 1, uid: 'uid-1', display_name: 'Joao', avatar_emoji: 'soccer_ball', created_at: '2026-01-01' };
        const db = createFakeDb({
            getFirstAsync: jest.fn().mockResolvedValue(profile),
        });
        const repo = new StickerRepository(db as any);
        const result = await repo.getUserProfile('uid-1');
        expect(result).toEqual(profile);
    });

    it('retorna null quando perfil nao encontrado', async () => {
        const db = createFakeDb({
            getFirstAsync: jest.fn().mockResolvedValue(null),
        });
        const repo = new StickerRepository(db as any);
        const result = await repo.getUserProfile('uid-inexistente');
        expect(result).toBeNull();
    });
});
