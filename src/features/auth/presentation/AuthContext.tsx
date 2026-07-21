import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    deleteUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../../firebaseConfig';
import type { User, FigurinhaEspecial } from '../domain/entities/User';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextData {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (
        username: string,
        email: string,
        password: string,
        stickerCount: number,
        figurinha: FigurinhaEspecial
    ) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const AVATAR_EMOJIS = ['⚽', '🏆', '🥇', '🎯', '🌟', '🦁', '🦅', '🌍'];

const randomEmoji = () => AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)];

/**
 * Verifica se o erro tem formato de erro do Firebase (duck-typing).
 * Necessário pois `instanceof FirebaseError` não funciona no Hermes (React Native).
 */
function isFirebaseError(err: unknown): err is { code: string; message: string } {
    return (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        typeof (err as any).code === 'string'
    );
}

/**
 * Traduz os códigos de erro do Firebase Auth para português.
 */
function mapFirebaseError(code: string): string {
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

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // aguarda onAuthStateChanged na inicialização

    /**
     * Escuta mudanças de autenticação no Firebase.
     * Ao iniciar, verifica se há sessão salva (via AsyncStorage persistence).
     */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Busca dados extras do Firestore (username, avatarEmoji, etc.)
                try {
                    const docRef = doc(db, 'users', firebaseUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUser({
                            id: firebaseUser.uid,
                            username: data.username ?? firebaseUser.displayName ?? firebaseUser.email!.split('@')[0],
                            email: firebaseUser.email!,
                            avatarEmoji: data.avatarEmoji ?? '⚽',
                            stickerCount: data.stickerCount ?? 0,
                            joinedAt: data.joinedAt ?? new Date().toLocaleDateString('pt-BR'),
                            figurinha: data.figurinha,
                        });
                    } else {
                        // Fallback: usuário no Auth mas sem documento no Firestore
                        setUser({
                            id: firebaseUser.uid,
                            username: firebaseUser.displayName ?? firebaseUser.email!.split('@')[0],
                            email: firebaseUser.email!,
                            avatarEmoji: '⚽',
                            stickerCount: 0,
                            joinedAt: new Date().toLocaleDateString('pt-BR'),
                        });
                    }
                } catch {
                    // Em caso de erro ao buscar Firestore, usa dados mínimos do Auth
                    setUser({
                        id: firebaseUser.uid,
                        username: firebaseUser.displayName ?? firebaseUser.email!.split('@')[0],
                        email: firebaseUser.email!,
                        avatarEmoji: '⚽',
                        stickerCount: 0,
                        joinedAt: new Date().toLocaleDateString('pt-BR'),
                    });
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /**
     * Login com e-mail e senha via Firebase Authentication.
     */
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        if (!email.trim()) return { success: false, error: 'Informe o e-mail.' };
        if (!password.trim()) return { success: false, error: 'Informe a senha.' };
        if (!email.includes('@')) return { success: false, error: 'E-mail inválido.' };

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
            // onAuthStateChanged cuidará de atualizar o estado do usuário
            return { success: true };
        } catch (err) {
            if (isFirebaseError(err)) {
                return { success: false, error: mapFirebaseError(err.code) };
            }
            return { success: false, error: 'Erro inesperado. Tente novamente.' };
        }
    };

    /**
     * Cadastro com e-mail e senha via Firebase Authentication.
     * Também cria um documento no Firestore com dados extras do usuário.
     */
    const register = async (
        username: string,
        email: string,
        password: string,
        stickerCount: number,
        figurinha: FigurinhaEspecial,
    ): Promise<{ success: boolean; error?: string }> => {
        if (!username.trim()) return { success: false, error: 'Informe o nome de usuário.' };
        if (username.trim().length < 3) return { success: false, error: 'Username deve ter ao menos 3 caracteres.' };
        if (!email.trim() || !email.includes('@')) return { success: false, error: 'E-mail inválido.' };
        if (!password.trim()) return { success: false, error: 'Informe a senha.' };
        if (password.length < 6) return { success: false, error: 'A senha deve ter ao menos 6 caracteres.' };
        if (isNaN(stickerCount) || stickerCount < 0) return { success: false, error: 'Quantidade de figurinhas inválida.' };

        let createdFirebaseUser: any = null;

        try {
            // 1. Cria o usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
            createdFirebaseUser = userCredential.user;

            // 2. Atualiza o displayName do usuário no Auth
            await updateProfile(createdFirebaseUser, { displayName: username.trim() });

            // 3. Persiste dados extras no Firestore
            const avatarEmoji = randomEmoji();
            const joinedAt = new Date().toLocaleDateString('pt-BR');

            await setDoc(doc(db, 'users', createdFirebaseUser.uid), {
                username: username.trim(),
                email: email.trim(),
                avatarEmoji,
                stickerCount: Number(stickerCount),
                joinedAt,
                createdAt: new Date().toISOString(),
                figurinha: {
                    Jogador: figurinha.Jogador.trim(),
                    Seleção: figurinha.Seleção.trim(),
                    Pais: figurinha.Pais.trim(),
                    Posição: figurinha.Posição.trim(),
                },
            });

            return { success: true };
        } catch (err) {
            console.error('Erro detalhado no registro de usuário:', err);

            // Se o erro ocorreu após a criação do usuário no Authentication (ex: falha no Firestore),
            // deletamos o usuário recém-criado para evitar conta orfã (sem doc no Firestore)
            if (createdFirebaseUser) {
                try {
                    console.log('Realizando rollback: deletando conta criada no Auth devido a falha no Firestore...');
                    await deleteUser(createdFirebaseUser);
                    console.log('Rollback concluído com sucesso.');
                } catch (rollbackErr) {
                    console.error('Falha crítica ao tentar deletar conta órfã no Auth:', rollbackErr);
                }
            }

            if (isFirebaseError(err)) {
                // Mensagem personalizada caso seja permissão negada no Firestore
                if (err.code === 'permission-denied') {
                    return { success: false, error: 'Permissão negada no Firestore. Verifique as regras de segurança.' };
                }
                return { success: false, error: mapFirebaseError(err.code) };
            }
            return { success: false, error: 'Erro inesperado ao criar conta. Tente novamente.' };
        }
    };

    /**
     * Desloga o usuário do Firebase Auth.
     */
    const logout = async (): Promise<void> => {
        await signOut(auth);
        // onAuthStateChanged irá setar user para null automaticamente
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = () => useContext(AuthContext);
