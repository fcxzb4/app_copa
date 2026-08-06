import React from 'react';
import { act, create } from 'react-test-renderer';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: () => null,
}));

jest.mock('expo-router', () => ({
    useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
}));

jest.mock('expo-linear-gradient', () => ({
    LinearGradient: ({ children }: any) => <>{children}</>,
}));

jest.mock('../presentation/styles/stickers_styles', () => ({
    stickersStyles: new Proxy({}, { get: () => ({}) }),
}));

jest.mock('../data/useStickerDatabase', () => ({
    useStickerDatabase: () => ({
        packsRemaining: 5,
        totalCollected: 12,
        isLoading: false,
        openPack: jest.fn().mockResolvedValue(5),
        saveStickers: jest.fn().mockResolvedValue(undefined),
    }),
}));

import StickersScreen from '../presentation/StickersScreen';

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

describe('StickersScreen', () => {
    let json: any;

    beforeEach(() => {
        let instance: any;
        act(() => {
            instance = create(<StickersScreen />);
        });
        json = instance.toJSON();
    });

    it('renderiza sem erros', () => {
        expect(json).not.toBeNull();
        expect(json).toBeDefined();
    });

    it('exibe título Minha Coleção', () => {
        expect(hasText(json, 'Minha Coleção')).toBe(true);
    });

    it('exibe total de figurinhas coletadas e álbum', () => {
        expect(hasText(json, '640')).toBe(true);
    });

    it('exibe o botão de Rasgar o seu Pacote', () => {
        expect(hasText(json, 'RASGAR O SEU PACOTE')).toBe(true);
    });

    it('exibe indicação de pacotes disponíveis', () => {
        expect(hasText(json, 'pacote')).toBe(true);
    });

    it('exibe o card de Pacote Lendário', () => {
        expect(hasText(json, 'PACOTE LENDÁRIO')).toBe(true);
    });
});
