/**
 * Testes de renderizacao para HomeScreen usando react-test-renderer.
 */

import React from 'react';
import { act, create } from 'react-test-renderer';

jest.mock('expo-router', () => ({
    Link: ({ children }: any) => <>{children}</>,
    useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
}));

jest.mock('@expo/vector-icons', () => ({
    Ionicons: () => null,
}));

jest.mock('../presentation/styles/home_styles', () => ({
    homeStyles: new Proxy({}, { get: () => ({}) }),
}));

import HomeScreen from '../presentation/HomeScreen';

// ─── Helper: percorre a arvore JSON do react-test-renderer ───────────────────
// A estrutura e: { type, props, children: [...] }
// Text nodes sao { type: 'Text', props: {...}, children: ['texto'] }

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

// ─── Suite ───────────────────────────────────────────────────────────────────

describe('HomeScreen', () => {
    let json: any;

    beforeAll(() => {
        let instance: any;
        act(() => {
            instance = create(<HomeScreen />);
        });
        json = instance.toJSON();
    });

    it('renderiza sem erros (estrutura nao e nula)', () => {
        expect(json).not.toBeNull();
        expect(json).toBeDefined();
    });

    it('exibe secao Jogos Ao-Vivo', () => {
        expect(hasText(json, 'Jogos Ao-Vivo')).toBe(true);
    });

    it('exibe secao Grupos', () => {
        expect(hasText(json, 'Grupos')).toBe(true);
    });

    it('exibe titulo Classificacao', () => {
        // "Classifica\u00e7\u00e3o" no componente
        expect(hasText(json, 'Classifica')).toBe(true);
    });

    it('exibe Brasil na tabela', () => {
        expect(hasText(json, 'Brasil')).toBe(true);
    });

    it('exibe pontuacao de pontos do Brasil na tabela', () => {
        expect(hasText(json, 'pts')).toBe(true);
    });

    it('exibe botao Ver Tabela Completa', () => {
        expect(hasText(json, 'Ver Tabela Completa')).toBe(true);
    });

    it('exibe link Conheca os Times', () => {
        // "Conhe\u00e7a os Times" no componente
        expect(hasText(json, 'os Times')).toBe(true);
    });

    it('exibe link Album Digital', () => {
        // "\u00c1lbum Digital" no componente
        expect(hasText(json, 'lbum Digital')).toBe(true);
    });

    it('exibe badge AO VIVO', () => {
        expect(hasText(json, 'AO VIVO')).toBe(true);
    });

    it('exibe indicador Intervalo', () => {
        expect(hasText(json, 'Intervalo')).toBe(true);
    });

    it('exibe fase 16-avos de Final', () => {
        expect(hasText(json, '16-avos de Final')).toBe(true);
    });

    it('exibe SG positivo (+6 SG) do Brasil na tabela', () => {
        expect(hasText(json, '+6 SG')).toBe(true);
    });

    it('exibe Marrocos na tabela', () => {
        expect(hasText(json, 'Marrocos')).toBe(true);
    });
});
