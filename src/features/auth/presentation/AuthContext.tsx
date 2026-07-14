import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '../domain/entities/User';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextData {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ─── Provider ─────────────────────────────────────────────────────────────────

const AVATAR_EMOJIS = ['⚽', '🏆', '🥇', '🎯', '🌟', '🦁', '🦅', '🌍'];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    /**
     * Simula um login sem banco de dados.
     * Em produção, aqui seria feita uma chamada de API.
     */
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Validações básicas de campo
        if (!email.trim()) return { success: false, error: 'Informe o e-mail.' };
        if (!password.trim()) return { success: false, error: 'Informe a senha.' };
        if (password.length < 6) return { success: false, error: 'Senha deve ter ao menos 6 caracteres.' };
        if (!email.includes('@')) return { success: false, error: 'E-mail inválido.' };

        // Simulando delay de rede
        await new Promise(resolve => setTimeout(resolve, 800));

        // Cria um usuário "logado" fictício
        const username = email.split('@')[0];
        const mockUser: User = {
            id: Math.random().toString(36).slice(2),
            username,
            email,
            avatarEmoji: AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)],
            stickerCount: Math.floor(Math.random() * 120) + 10,
            joinedAt: new Date().toLocaleDateString('pt-BR'),
        };

        setUser(mockUser);
        return { success: true };
    };

    /**
     * Simula um cadastro sem banco de dados.
     */
    const register = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        if (!username.trim()) return { success: false, error: 'Informe o nome de usuário.' };
        if (username.length < 3) return { success: false, error: 'Username deve ter ao menos 3 caracteres.' };
        if (!email.trim() || !email.includes('@')) return { success: false, error: 'E-mail inválido.' };
        if (!password.trim()) return { success: false, error: 'Informe a senha.' };
        if (password.length < 6) return { success: false, error: 'Senha deve ter ao menos 6 caracteres.' };

        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUser: User = {
            id: Math.random().toString(36).slice(2),
            username,
            email,
            avatarEmoji: AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)],
            stickerCount: 0,
            joinedAt: new Date().toLocaleDateString('pt-BR'),
        };

        setUser(newUser);
        return { success: true };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = () => useContext(AuthContext);
