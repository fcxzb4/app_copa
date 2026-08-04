import type { User, FigurinhaEspecial } from '../entities/User';

// ─── Tipos de retorno ─────────────────────────────────────────────────────────

export interface AuthResult {
    success: boolean;
    error?: string;
}

export interface FirebaseUserData {
    uid: string;
    email: string;
    displayName: string | null;
}

// ─── Contrato do repositório de autenticação ──────────────────────────────────

/**
 * Interface que define as operações de acesso a dados de autenticação.
 *
 * A camada de apresentação (AuthContext) e os use cases dependem desta
 * interface, nunca da implementação concreta (Firebase).
 * Isso garante o princípio da Inversão de Dependência (DIP).
 */
export interface IAuthRepository {
    /**
     * Autentica o usuário com e-mail e senha.
     */
    signIn(email: string, password: string): Promise<AuthResult>;

    /**
     * Cria uma nova conta no Auth e persiste dados extras no Firestore.
     * Executa rollback (delete da conta no Auth) se o Firestore falhar.
     */
    signUp(
        username: string,
        email: string,
        password: string,
        stickerCount: number,
        figurinha: FigurinhaEspecial,
    ): Promise<AuthResult>;

    /**
     * Desloga o usuário atual.
     */
    signOut(): Promise<void>;

    /**
     * Busca os dados completos do usuário no Firestore pelo UID.
     * Retorna null se não encontrado.
     */
    getUserData(uid: string): Promise<User | null>;

    /**
     * Registra um listener de mudanças de estado de autenticação.
     * Retorna a função de cancelamento do listener.
     */
    onAuthStateChanged(
        callback: (firebaseUser: FirebaseUserData | null) => void,
    ): () => void;
}
