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
        login: jest.fn().mockResolvedValue({ success: true }),
    }),
}));

import LoginScreen from '../presentation/LoginScreen';

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

describe('LoginScreen', () => {
    let json: any;

    beforeEach(() => {
        let instance: any;
        act(() => {
            instance = create(<LoginScreen />);
        });
        json = instance.toJSON();
    });

    it('renderiza sem erros', () => {
        expect(json).not.toBeNull();
        expect(json).toBeDefined();
    });

    it('exibe título Entrar', () => {
        expect(hasText(json, 'Entrar')).toBe(true);
    });

    it('exibe o link para criar conta', () => {
        expect(hasText(json, 'Não tem conta?')).toBe(true);
        expect(hasText(json, 'Criar agora')).toBe(true);
    });
});
