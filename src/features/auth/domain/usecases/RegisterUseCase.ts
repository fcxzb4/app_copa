import type { IAuthRepository, AuthResult } from '../repositories/IAuthRepository';
import type { FigurinhaEspecial } from '../entities/User';

// ─── Validações puras ─────────────────────────────────────────────────────────

function validateRegisterInput(
    username: string,
    email: string,
    password: string,
    stickerCount: number,
): string | null {
    if (!username.trim()) return 'Informe o nome de usuário.';
    if (username.trim().length < 3) return 'Username deve ter ao menos 3 caracteres.';
    if (!email.trim() || !email.includes('@')) return 'E-mail inválido.';
    if (!password.trim()) return 'Informe a senha.';
    if (password.length < 6) return 'A senha deve ter ao menos 6 caracteres.';
    if (isNaN(stickerCount) || stickerCount < 0) return 'Quantidade de figurinhas inválida.';
    return null;
}

// ─── Use Case ─────────────────────────────────────────────────────────────────

/**
 * Caso de uso: Registro de novo usuário.
 *
 * Responsabilidades:
 * 1. Validar entradas (sem dependência do Firebase)
 * 2. Delegar ao repositório para criação de conta + persistência no Firestore
 *    O rollback transacional (deleteUser se setDoc falhar) é responsabilidade
 *    da implementação do repositório (AuthRepository.ts na camada data/).
 *
 * Recebe o repositório via injeção de dependência no construtor.
 */
export class RegisterUseCase {
    constructor(private readonly authRepository: IAuthRepository) {}

    async execute(
        username: string,
        email: string,
        password: string,
        stickerCount: number,
        figurinha: FigurinhaEspecial,
    ): Promise<AuthResult> {
        // 1. Validação de entrada — sem tocar Firebase
        const validationError = validateRegisterInput(username, email, password, stickerCount);
        if (validationError) {
            return { success: false, error: validationError };
        }

        // 2. Delega ao repositório (que executa criação + rollback se necessário)
        return this.authRepository.signUp(
            username.trim(),
            email.trim(),
            password,
            stickerCount,
            figurinha,
        );
    }
}
