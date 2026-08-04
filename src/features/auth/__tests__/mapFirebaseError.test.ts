/**
 * Testes unitarios para as funcoes puras mapFirebaseError e isFirebaseError.
 * Copiadas do AuthContext para permitir teste isolado sem dependencia do Firebase.
 */

// ─── Funcoes extraidas do AuthContext ─────────────────────────────────────────

function isFirebaseError(err: unknown): err is { code: string; message: string } {
    return (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        typeof (err as { code?: unknown }).code === 'string'
    );
}

function mapFirebaseError(code: string): string {
    switch (code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return 'E-mail ou senha incorretos.';
        case 'auth/email-already-in-use':
            return 'Este e-mail ja esta cadastrado.';
        case 'auth/weak-password':
            return 'A senha deve ter pelo menos 6 caracteres.';
        case 'auth/invalid-email':
            return 'E-mail invalido.';
        case 'auth/too-many-requests':
            return 'Muitas tentativas. Tente novamente mais tarde.';
        case 'auth/network-request-failed':
            return 'Sem conexao com a internet.';
        default:
            return 'Ocorreu um erro. Tente novamente.';
    }
}

// ─── Testes: mapFirebaseError ─────────────────────────────────────────────────

describe('mapFirebaseError', () => {
    it('retorna credenciais incorretas para auth/user-not-found', () => {
        expect(mapFirebaseError('auth/user-not-found')).toBe('E-mail ou senha incorretos.');
    });

    it('retorna credenciais incorretas para auth/wrong-password', () => {
        expect(mapFirebaseError('auth/wrong-password')).toBe('E-mail ou senha incorretos.');
    });

    it('retorna credenciais incorretas para auth/invalid-credential', () => {
        expect(mapFirebaseError('auth/invalid-credential')).toBe('E-mail ou senha incorretos.');
    });

    it('retorna e-mail ja cadastrado para auth/email-already-in-use', () => {
        expect(mapFirebaseError('auth/email-already-in-use')).toBe('Este e-mail ja esta cadastrado.');
    });

    it('retorna senha fraca para auth/weak-password', () => {
        expect(mapFirebaseError('auth/weak-password')).toBe('A senha deve ter pelo menos 6 caracteres.');
    });

    it('retorna e-mail invalido para auth/invalid-email', () => {
        expect(mapFirebaseError('auth/invalid-email')).toBe('E-mail invalido.');
    });

    it('retorna muitas tentativas para auth/too-many-requests', () => {
        expect(mapFirebaseError('auth/too-many-requests')).toBe('Muitas tentativas. Tente novamente mais tarde.');
    });

    it('retorna sem conexao para auth/network-request-failed', () => {
        expect(mapFirebaseError('auth/network-request-failed')).toBe('Sem conexao com a internet.');
    });

    it('retorna mensagem padrao para codigo desconhecido', () => {
        expect(mapFirebaseError('auth/unknown-code')).toBe('Ocorreu um erro. Tente novamente.');
    });

    it('retorna mensagem padrao para string vazia', () => {
        expect(mapFirebaseError('')).toBe('Ocorreu um erro. Tente novamente.');
    });
});

// ─── Testes: isFirebaseError ──────────────────────────────────────────────────

describe('isFirebaseError', () => {
    it('retorna true para objeto com code string', () => {
        expect(isFirebaseError({ code: 'auth/invalid-email', message: 'erro' })).toBe(true);
    });

    it('retorna false para null', () => {
        expect(isFirebaseError(null)).toBe(false);
    });

    it('retorna false para string', () => {
        expect(isFirebaseError('erro')).toBe(false);
    });

    it('retorna false para numero', () => {
        expect(isFirebaseError(42)).toBe(false);
    });

    it('retorna false para objeto sem code', () => {
        expect(isFirebaseError({ message: 'sem code' })).toBe(false);
    });

    it('retorna false para objeto com code nao-string', () => {
        expect(isFirebaseError({ code: 123 })).toBe(false);
    });

    it('retorna false para undefined', () => {
        expect(isFirebaseError(undefined)).toBe(false);
    });

    it('retorna true para erro Firebase simulado completo', () => {
        expect(isFirebaseError({ code: 'auth/user-not-found', message: 'No user.', name: 'FirebaseError' })).toBe(true);
    });
});
