import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, FigurinhaEspecial } from '../domain/entities/User';
import type { IAuthRepository } from '../domain/repositories/IAuthRepository';
import { LoginUseCase } from '../domain/usecases/LoginUseCase';
import { RegisterUseCase } from '../domain/usecases/RegisterUseCase';
import { LogoutUseCase } from '../domain/usecases/LogoutUseCase';
import { FirebaseAuthRepository } from '../data/repositories/FirebaseAuthRepository';

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

interface AuthProviderProps {
    children: ReactNode;
    authRepository?: IAuthRepository;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children, authRepository }: AuthProviderProps) {
    const repository = authRepository ?? new FirebaseAuthRepository();
    const loginUseCase = new LoginUseCase(repository);
    const registerUseCase = new RegisterUseCase(repository);
    const logoutUseCase = new LogoutUseCase(repository);

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Escuta mudanças de autenticação no Firebase via Repositório.
     */
    useEffect(() => {
        const unsubscribe = repository.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userData = await repository.getUserData(firebaseUser.uid);
                    if (userData) {
                        setUser(userData);
                    } else {
                        // Fallback: usuário no Auth mas sem documento no Firestore
                        setUser({
                            id: firebaseUser.uid,
                            username: firebaseUser.displayName ?? firebaseUser.email.split('@')[0],
                            email: firebaseUser.email,
                            avatarEmoji: '⚽',
                            stickerCount: 0,
                            joinedAt: new Date().toLocaleDateString('pt-BR'),
                        });
                    }
                } catch {
                    setUser({
                        id: firebaseUser.uid,
                        username: firebaseUser.displayName ?? firebaseUser.email.split('@')[0],
                        email: firebaseUser.email,
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

    const login = async (email: string, password: string) => {
        return loginUseCase.execute(email, password);
    };

    const register = async (
        username: string,
        email: string,
        password: string,
        stickerCount: number,
        figurinha: FigurinhaEspecial,
    ) => {
        return registerUseCase.execute(username, email, password, stickerCount, figurinha);
    };

    const logout = async () => {
        await logoutUseCase.execute();
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = () => useContext(AuthContext);
