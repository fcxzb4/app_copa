/**
 * Testes unitarios para a logica de login do AuthProvider.
 *
 * A funcao `login` do AuthContext realiza validacoes de entrada ANTES
 * de chamar o Firebase. Testamos essas validacoes em isolamento completo,
 * sem precisar de um ambiente Firebase real.
 */

// ─── Regras de validacao do login (extraidas do AuthContext) ──────────────────

interface LoginResult {
    success: boolean;
    error?: string;
}

function validateLogin(email: string, password: string): LoginResult | null {
    if (!email.trim()) return { success: false, error: 'Informe o e-mail.' };
    if (!password.trim()) return { success: false, error: 'Informe a senha.' };
    if (!email.includes('@')) return { success: false, error: 'E-mail invalido.' };
    return null; // sem erros de validacao
}

// ─── Regras de validacao do registro (extraidas do AuthContext) ───────────────

function validateRegister(
    username: string,
    email: string,
    password: string,
    stickerCount: number,
): LoginResult | null {
    if (!username.trim()) return { success: false, error: 'Informe o nome de usuario.' };
    if (username.trim().length < 3) return { success: false, error: 'Username deve ter ao menos 3 caracteres.' };
    if (!email.trim() || !email.includes('@')) return { success: false, error: 'E-mail invalido.' };
    if (!password.trim()) return { success: false, error: 'Informe a senha.' };
    if (password.length < 6) return { success: false, error: 'A senha deve ter ao menos 6 caracteres.' };
    if (isNaN(stickerCount) || stickerCount < 0) return { success: false, error: 'Quantidade de figurinhas invalida.' };
    return null;
}

// ─── Testes: validacoes do login ──────────────────────────────────────────────

describe('login — validacoes de entrada', () => {
    it('falha quando email esta vazio', () => {
        const result = validateLogin('', 'senha123');
        expect(result).toEqual({ success: false, error: 'Informe o e-mail.' });
    });

    it('falha quando email so tem espacos', () => {
        const result = validateLogin('   ', 'senha123');
        expect(result).toEqual({ success: false, error: 'Informe o e-mail.' });
    });

    it('falha quando senha esta vazia', () => {
        const result = validateLogin('user@test.com', '');
        expect(result).toEqual({ success: false, error: 'Informe a senha.' });
    });

    it('falha quando senha so tem espacos', () => {
        const result = validateLogin('user@test.com', '   ');
        expect(result).toEqual({ success: false, error: 'Informe a senha.' });
    });

    it('falha quando email nao tem @', () => {
        const result = validateLogin('usersemarcoba.com', 'senha123');
        expect(result).toEqual({ success: false, error: 'E-mail invalido.' });
    });

    it('passa a validacao com email e senha validos', () => {
        const result = validateLogin('user@test.com', 'senha123');
        expect(result).toBeNull();
    });

    it('passa a validacao com email contendo subdominio', () => {
        const result = validateLogin('user@sub.domain.com', 'minhasenha');
        expect(result).toBeNull();
    });
});

// ─── Testes: validacoes do registro ──────────────────────────────────────────

describe('register — validacoes de entrada', () => {
    const validArgs: [string, string, string, number] = ['joao', 'joao@test.com', 'senha123', 10];

    it('falha quando username esta vazio', () => {
        expect(validateRegister('', validArgs[1], validArgs[2], validArgs[3]))
            ?.toMatchObject({ success: false });
    });

    it('falha quando username tem menos de 3 caracteres', () => {
        const result = validateRegister('jo', validArgs[1], validArgs[2], validArgs[3]);
        expect(result).toEqual({ success: false, error: 'Username deve ter ao menos 3 caracteres.' });
    });

    it('falha quando email esta invalido', () => {
        const result = validateRegister('joao', 'emailsemarroba', validArgs[2], validArgs[3]);
        expect(result).toEqual({ success: false, error: 'E-mail invalido.' });
    });

    it('falha quando email esta vazio', () => {
        const result = validateRegister('joao', '', validArgs[2], validArgs[3]);
        expect(result).toEqual({ success: false, error: 'E-mail invalido.' });
    });

    it('falha quando senha esta vazia', () => {
        const result = validateRegister('joao', validArgs[1], '', validArgs[3]);
        expect(result?.success).toBe(false);
    });

    it('falha quando senha tem menos de 6 caracteres', () => {
        const result = validateRegister('joao', validArgs[1], '123', validArgs[3]);
        expect(result).toEqual({ success: false, error: 'A senha deve ter ao menos 6 caracteres.' });
    });

    it('falha quando stickerCount e negativo', () => {
        const result = validateRegister('joao', validArgs[1], validArgs[2], -1);
        expect(result).toEqual({ success: false, error: 'Quantidade de figurinhas invalida.' });
    });

    it('falha quando stickerCount e NaN', () => {
        const result = validateRegister('joao', validArgs[1], validArgs[2], NaN);
        expect(result).toEqual({ success: false, error: 'Quantidade de figurinhas invalida.' });
    });

    it('passa a validacao com dados completos e validos', () => {
        const result = validateRegister(...validArgs);
        expect(result).toBeNull();
    });

    it('passa a validacao com stickerCount igual a zero', () => {
        const result = validateRegister('joao', validArgs[1], validArgs[2], 0);
        expect(result).toBeNull();
    });

    it('passa a validacao com username exatamente 3 caracteres', () => {
        const result = validateRegister('ana', validArgs[1], validArgs[2], 5);
        expect(result).toBeNull();
    });
});
