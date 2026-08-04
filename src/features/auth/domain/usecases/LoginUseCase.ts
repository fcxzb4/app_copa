import type { IAuthRepository, AuthResult } from '../repositories/IAuthRepository';

// ─── Validações puras (sem dependência externa) ───────────────────────────────

function validateLoginInput(email: string, password: string): string | null {
    if (!email.trim()) return 'Informe o e-mail.';
    if (!password.trim()) return 'Informe a senha.';
    if (!email.includes('@')) return 'E-mail inválido.';
    return null;
}

// ─── Use Case ─────────────────────────────────────────────────────────────────

/**
 * Caso de uso: Login do usuário.
 *
 * Responsabilidades:
 * 1. Validar entradas (sem dependência do Firebase)
 * 2. Delegar ao repositório para autenticação
 *
 * Recebe o repositório via injeção de dependência no construtor.
 */
export class LoginUseCase {
    constructor(private readonly authRepository: IAuthRepository) {}

    async execute(email: string, password: string): Promise<AuthResult> {
        // 1. Validação de entrada — sem tocar Firebase
        const validationError = validateLoginInput(email, password);
        if (validationError) {
            return { success: false, error: validationError };
        }

        // 2. Delega ao repositório
        return this.authRepository.signIn(email.trim(), password);
    }
}
