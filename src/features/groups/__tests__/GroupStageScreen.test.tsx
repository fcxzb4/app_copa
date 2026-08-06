import React from 'react';
import { act, create } from 'react-test-renderer';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: () => null,
}));

jest.mock('../presentation/styles/groupStageStyles', () => ({
    groupStageStyles: new Proxy({}, { get: () => ({}) }),
}));

import GroupStageScreen from '../presentation/GroupStageScreen';

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

describe('GroupStageScreen', () => {
    let json: any;

    beforeEach(() => {
        let instance: any;
        act(() => {
            instance = create(<GroupStageScreen />);
        });
        json = instance.toJSON();
    });

    it('renderiza sem erros', () => {
        expect(json).not.toBeNull();
        expect(json).toBeDefined();
    });

    it('exibe cabeçalho Fase de Grupos', () => {
        expect(hasText(json, 'Fase de Grupos')).toBe(true);
    });

    it('exibe subcabeçalho Classificação Geral', () => {
        expect(hasText(json, 'Classificação Geral')).toBe(true);
    });

    it('exibe títulos das seções de jogos e classificação', () => {
        expect(hasText(json, 'Resultados dos Jogos')).toBe(true);
    });

    it('exibe tabela do Grupo A com as seleções participantes', () => {
        expect(hasText(json, 'Tabela Grupo')).toBe(true);
        expect(hasText(json, 'Holanda')).toBe(true);
    });
});
