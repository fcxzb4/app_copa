import type { IAuthRepository } from '../repositories/IAuthRepository';

/**
 * Caso de uso: Logout do usuário.
 *
 * Responsabilidade única: delegar ao repositório o encerramento da sessão.
 * O estado React (user → null) é atualizado automaticamente pelo listener
 * onAuthStateChanged no AuthContext.
 */
export class LogoutUseCase {
    constructor(private readonly authRepository: IAuthRepository) {}

    async execute(): Promise<void> {
        await this.authRepository.signOut();
    }
}
