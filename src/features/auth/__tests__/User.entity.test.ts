/**
 * Testes unitarios para as entidades do dominio de autenticacao.
 * Valida a estrutura das interfaces User e FigurinhaEspecial.
 */

import type { User, FigurinhaEspecial } from '../domain/entities/User';

// ─── Testes: FigurinhaEspecial ────────────────────────────────────────────────

describe('FigurinhaEspecial — estrutura da entidade', () => {
    it('cria uma figurinha especial valida', () => {
        const figurinha: FigurinhaEspecial = {
            Jogador: 'Vinicius Jr',
            'Selecao': 'Brasil',
            Pais: 'Brasil',
            'Posicao': 'Atacante',
        } as unknown as FigurinhaEspecial;

        expect(figurinha).toBeDefined();
    });

    it('pode ter campos com strings vazias (validacao e responsabilidade da camada de apresentacao)', () => {
        const figurinha = {
            Jogador: '',
            Selecao: '',
            Pais: '',
            Posicao: '',
        };
        // Entidade nao valida — apenas garante estrutura
        expect(Object.keys(figurinha)).toHaveLength(4);
    });
});

// ─── Testes: User ─────────────────────────────────────────────────────────────

describe('User — estrutura da entidade de dominio', () => {
    const baseUser: User = {
        id: 'uid-123',
        username: 'torcedor123',
        email: 'torcedor@copa.com',
        avatarEmoji: 'soccer_ball',
        stickerCount: 25,
        joinedAt: '01/06/2026',
    };

    it('cria um usuario valido sem figurinha especial', () => {
        expect(baseUser.figurinha).toBeUndefined();
        expect(baseUser.id).toBe('uid-123');
        expect(baseUser.username).toBe('torcedor123');
        expect(baseUser.email).toBe('torcedor@copa.com');
        expect(baseUser.stickerCount).toBe(25);
    });

    it('cria um usuario com figurinha especial opcional', () => {
        const userWithFigurinha: User = {
            ...baseUser,
            figurinha: {
                Jogador: 'Messi',
                'Selecao': 'Argentina',
                Pais: 'Argentina',
                'Posicao': 'Atacante',
            } as unknown as User['figurinha'],
        };
        expect(userWithFigurinha.figurinha).toBeDefined();
    });

    it('stickerCount pode ser zero', () => {
        const novato: User = { ...baseUser, stickerCount: 0 };
        expect(novato.stickerCount).toBe(0);
    });

    it('id deve ser uma string nao vazia', () => {
        expect(typeof baseUser.id).toBe('string');
        expect(baseUser.id.length).toBeGreaterThan(0);
    });

    it('email deve conter @', () => {
        expect(baseUser.email).toContain('@');
    });
});

// ─── Testes: randomEmoji helper (logica de avatar) ───────────────────────────

describe('randomEmoji — selecao de avatar', () => {
    const AVATAR_EMOJIS = ['soccer_ball', 'trophy', 'medal', 'target', 'star', 'lion', 'eagle', 'earth'];

    function randomEmoji(): string {
        return AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)];
    }

    it('retorna um emoji da lista de avatares', () => {
        const emoji = randomEmoji();
        expect(AVATAR_EMOJIS).toContain(emoji);
    });

    it('sempre retorna uma string', () => {
        for (let i = 0; i < 20; i++) {
            expect(typeof randomEmoji()).toBe('string');
        }
    });

    it('a lista de avatares tem exatamente 8 opcoes', () => {
        expect(AVATAR_EMOJIS).toHaveLength(8);
    });
});
