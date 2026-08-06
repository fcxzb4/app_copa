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

let mockIsLoggedIn = false;
let mockUser: any = null;

jest.mock('../presentation/AuthContext', () => ({
    useAuth: () => ({
        isLoggedIn: mockIsLoggedIn,
        user: mockUser,
        logout: jest.fn(),
    }),
}));

import ProfileScreen from '../presentation/ProfileScreen';

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

describe('ProfileScreen', () => {
    describe('quando o usuário não está autenticado (Visitante)', () => {
        beforeEach(() => {
            mockIsLoggedIn = false;
            mockUser = null;
        });

        it('exibe a tela de boas-vindas com opções de Entrar e Criar Conta', () => {
            let tree: any;
            act(() => {
                tree = create(<ProfileScreen />);
            });
            const json = tree.toJSON();

            expect(hasText(json, 'Bem-vindo')).toBe(true);
            expect(hasText(json, 'Entrar')).toBe(true);
            expect(hasText(json, 'Criar Conta')).toBe(true);
        });
    });

    describe('quando o usuário está autenticado', () => {
        beforeEach(() => {
            mockIsLoggedIn = true;
            mockUser = {
                id: '1',
                username: 'torcedor10',
                email: 'torcedor@email.com',
                joinedAt: '2026',
                avatarEmoji: '⚽',
                stickerCount: 42,
            };
        });

        it('exibe as informações do perfil do usuário logado', () => {
            let tree: any;
            act(() => {
                tree = create(<ProfileScreen />);
            });
            const json = tree.toJSON();

            expect(hasText(json, 'torcedor10')).toBe(true);
            expect(hasText(json, 'torcedor@email.com')).toBe(true);
            expect(hasText(json, 'Minha Coleção')).toBe(true);
            expect(hasText(json, 'Sair da Conta')).toBe(true);
        });
    });
});
