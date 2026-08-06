import React from 'react';
import { act, create } from 'react-test-renderer';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: () => null,
}));

jest.mock('../presentation/styles/my_collection_styles', () => ({
    myCollectionStyles: new Proxy({}, { get: () => ({}) }),
}));

jest.mock('../data/useStickerDatabase', () => ({
    useStickerDatabase: () => ({
        collectedStickers: [
            { id: 1, sticker_id: 'BRA-1', player_name: 'Vinícius Jr.', flag: '🇧🇷', group_name: 'A', team_id: 'BRA', is_duplicate: 0 },
        ],
        countByTeam: { BRA: 1 },
        totalCollected: 1,
        isLoading: false,
        error: null,
    }),
}));

import MyCollectionScreen from '../presentation/MyCollectionScreen';

function collectTexts(node: any, acc: string[] = []): string[] {
    if (!node) return acc;
    if (typeof node === 'string') { acc.push(node); return acc; }
    if (Array.isArray(node)) { node.forEach(n => collectTexts(n, acc)); return acc; }
    if (typeof node === 'object') {
        if (node.children) collectTexts(node.children, acc);
    }
    return acc;
}

function hasText(json: any, text: string): boolean {
    return collectTexts(json).some(t => t.includes(text));
}

describe('MyCollectionScreen', () => {
    let json: any;

    beforeEach(() => {
        let instance: any;
        act(() => {
            instance = create(<MyCollectionScreen />);
        });
        json = instance.toJSON();
    });

    it('renderiza a tela sem erros', () => {
        expect(json).not.toBeNull();
        expect(json).toBeDefined();
    });

    it('exibe título Meu Álbum Digital', () => {
        expect(hasText(json, 'Meu Álbum Digital')).toBe(true);
    });

    it('exibe subcabeçalho Minhas Coleções', () => {
        expect(hasText(json, 'Minhas Coleções')).toBe(true);
    });

    it('exibe indicador de 1 figurinha coletada', () => {
        expect(hasText(json, 'figurinha')).toBe(true);
    });

    it('exibe a seleção do Brasil na lista de coleções', () => {
        expect(hasText(json, 'BRASIL')).toBe(true);
    });
});
