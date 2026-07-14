/**
 * Entidade de usuário do domínio.
 * Não possui lógica de persistência — apenas define o contrato de dados.
 */
export interface User {
    id: string;
    username: string;
    email: string;
    avatarEmoji: string;
    stickerCount: number;
    joinedAt: string;
}
