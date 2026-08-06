import React from 'react';
import { act, create } from 'react-test-renderer';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: () => null,
}));

jest.mock('expo-router', () => ({
    useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
}));

jest.mock('../presentation/styles/authStyles', () => ({
    authStyles: new Proxy({}, { get: () => ({}) }),
}));

jest.mock('../presentation/AuthContext', () => ({
    useAuth: () => ({
        register: jest.fn().mockResolvedValue({ success: true }),
    }),
}));

import RegisterScreen from '../presentation/RegisterScreen';

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

describe('RegisterScreen', () => {
    let json: any;

    beforeEach(() => {
        let instance: any;
        act(() => {
            instance = create(<RegisterScreen />);
        });
        json = instance.toJSON();
    });

    it('renderiza sem erros', () => {
        expect(json).not.toBeNull();
        expect(json).toBeDefined();
    });

    it('exibe o título Criar Conta', () => {
        expect(hasText(json, 'Criar Conta')).toBe(true);
    });

    it('exibe a seção de Figurinha Especial', () => {
        expect(hasText(json, 'Figurinha Especial')).toBe(true);
    });

    it('exibe o link para entrar na conta existente', () => {
        expect(hasText(json, 'Já tem conta?')).toBe(true);
        expect(hasText(json, 'Entrar agora')).toBe(true);
    });
});
