import React from 'react';
import { act, create } from 'react-test-renderer';
import {
    AuthBackButton,
    AuthErrorBox,
    AuthFormHeader,
    AuthInput,
    AuthSubmitButton,
    SpecialStickerFields,
} from '../presentation/components';

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
        user: { id: '1', username: 'test', email: 'test@email.com', avatarEmoji: '⚽', stickerCount: 5, joinedAt: '2026' },
        isLoggedIn: true,
        logout: jest.fn(),
    }),
}));

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

describe('Auth Components', () => {
    describe('AuthBackButton', () => {
        it('renderiza o texto Voltar', () => {
            let tree: any;
            act(() => {
                tree = create(<AuthBackButton />);
            });
            expect(hasText(tree.toJSON(), 'Voltar')).toBe(true);
        });
    });

    describe('AuthFormHeader', () => {
        it('renderiza emoji, titulo e subtitulo', () => {
            let tree: any;
            act(() => {
                tree = create(
                    <AuthFormHeader
                        emoji="🏆"
                        title="Título Teste"
                        subtitle="Subtítulo Teste"
                    />
                );
            });
            const json = tree.toJSON();
            expect(hasText(json, '🏆')).toBe(true);
            expect(hasText(json, 'Título Teste')).toBe(true);
            expect(hasText(json, 'Subtítulo Teste')).toBe(true);
        });
    });

    describe('AuthErrorBox', () => {
        it('não renderiza nada se erro for null', () => {
            let tree: any;
            act(() => {
                tree = create(<AuthErrorBox error={null} />);
            });
            expect(tree.toJSON()).toBeNull();
        });

        it('renderiza a mensagem de erro quando fornecida', () => {
            let tree: any;
            act(() => {
                tree = create(<AuthErrorBox error="Mensagem de Erro" />);
            });
            expect(hasText(tree.toJSON(), 'Mensagem de Erro')).toBe(true);
        });
    });

    describe('AuthInput', () => {
        it('renderiza o input com placeholder', () => {
            let tree: any;
            act(() => {
                tree = create(
                    <AuthInput
                        iconName="mail-outline"
                        placeholder="Digite o e-mail"
                    />
                );
            });
            expect(tree.toJSON()).not.toBeNull();
        });
    });

    describe('AuthSubmitButton', () => {
        it('exibe o texto do botao quando nao esta carregando', () => {
            let tree: any;
            act(() => {
                tree = create(
                    <AuthSubmitButton
                        title="Enviar"
                        loading={false}
                        onPress={jest.fn()}
                    />
                );
            });
            expect(hasText(tree.toJSON(), 'Enviar')).toBe(true);
        });
    });

    describe('SpecialStickerFields', () => {
        it('renderiza o titulo da secao e os inputs', () => {
            let tree: any;
            act(() => {
                tree = create(
                    <SpecialStickerFields
                        jogador="Neymar"
                        onChangeJogador={jest.fn()}
                        selecao="Brasil"
                        onChangeSelecao={jest.fn()}
                        pais="Brasil"
                        onChangePais={jest.fn()}
                        posicao="Atacante"
                        onChangePosicao={jest.fn()}
                    />
                );
            });
            expect(hasText(tree.toJSON(), 'Figurinha Especial')).toBe(true);
        });
    });
});
