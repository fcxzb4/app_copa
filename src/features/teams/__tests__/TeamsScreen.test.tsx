import React from 'react';
import { act, create } from 'react-test-renderer';

jest.mock('../presentation/styles/teamsStyles', () => ({
    teamsStyles: new Proxy({}, { get: () => ({}) }),
}));

import TeamsScreen from '../presentation/TeamsScreen';

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

describe('TeamsScreen', () => {
    let json: any;

    beforeEach(() => {
        let instance: any;
        act(() => {
            instance = create(<TeamsScreen />);
        });
        json = instance.toJSON();
    });

    it('renderiza a tela sem erros', () => {
        expect(json).not.toBeNull();
        expect(json).toBeDefined();
    });

    it('exibe o título principal Seleções Participantes', () => {
        expect(hasText(json, 'Seleções Participantes')).toBe(true);
    });

    it('exibe o contador inicial de 32 seleções', () => {
        expect(hasText(json, '32')).toBe(true);
        expect(hasText(json, 'seleções')).toBe(true);
    });

    it('exibe a seleção do Brasil', () => {
        expect(hasText(json, 'Brasil')).toBe(true);
    });

    it('exibe o rótulo de filtro por confederação', () => {
        expect(hasText(json, 'Filtrar por Confederação')).toBe(true);
    });
});
