import { confederationsList } from '../data/confederations';
import type { Confederation } from '../domain/entities';

describe('confederationsList', () => {
    it('deve conter exatamente 7 confederações na lista (incluindo "ALL")', () => {
        expect(confederationsList).toHaveLength(7);
    });

    it('deve incluir a opção "ALL" como o primeiro elemento', () => {
        expect(confederationsList[0]).toEqual({
            key: 'ALL',
            label: 'Todos',
            desc: 'Todas as federações',
        });
    });

    it('deve conter as 6 confederações oficiais da FIFA (UEFA, CONMEBOL, CONCACAF, CAF, AFC, OFC)', () => {
        const expectedKeys: (Confederation | 'ALL')[] = [
            'ALL',
            'UEFA',
            'CONMEBOL',
            'CONCACAF',
            'CAF',
            'AFC',
            'OFC',
        ];
        const actualKeys = confederationsList.map((item) => item.key);
        expect(actualKeys).toEqual(expectedKeys);
    });

    it('não deve conter chaves duplicadas', () => {
        const keys = confederationsList.map((item) => item.key);
        const uniqueKeys = new Set(keys);
        expect(uniqueKeys.size).toBe(keys.length);
    });

    it('cada item deve possuir propriedades key, label e desc preenchidas', () => {
        confederationsList.forEach((item) => {
            expect(typeof item.key).toBe('string');
            expect(item.key.length).toBeGreaterThan(0);
            expect(typeof item.label).toBe('string');
            expect(item.label.length).toBeGreaterThan(0);
            expect(typeof item.desc).toBe('string');
            expect(item.desc.length).toBeGreaterThan(0);
        });
    });
});
