/**
 * Verifica se o erro tem formato de erro do Firebase (duck-typing).
 * Necessário pois `instanceof FirebaseError` não funciona no Hermes (React Native).
 */
export function isFirebaseError(err: unknown): err is { code: string; message: string } {
    return (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        typeof (err as { code?: unknown }).code === 'string'
    );
}

/**
 * Traduz os códigos de erro do Firebase Auth para português.
 */
export function mapFirebaseError(code: string): string {
    switch (code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return 'E-mail ou senha incorretos.';
        case 'auth/email-already-in-use':
            return 'Este e-mail já está cadastrado.';
        case 'auth/weak-password':
            return 'A senha deve ter pelo menos 6 caracteres.';
        case 'auth/invalid-email':
            return 'E-mail inválido.';
        case 'auth/too-many-requests':
            return 'Muitas tentativas. Tente novamente mais tarde.';
        case 'auth/network-request-failed':
            return 'Sem conexão com a internet.';
        default:
            return 'Ocorreu um erro. Tente novamente.';
    }
}
