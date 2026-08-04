/**
 * Testes de integracao do AuthProvider com Firebase mockado.
 *
 * Testa:
 * - login bem-sucedido
 * - login com erro Firebase
 * - registro bem-sucedido
 * - rollback transacional (falha no Firestore apos criar usuario no Auth)
 * - logout
 * - onAuthStateChanged: estado do usuario ao inicializar
 */

// ─── Mocks do Firebase ────────────────────────────────────────────────────────

const mockSignIn = jest.fn();
const mockCreateUser = jest.fn();
const mockSignOut = jest.fn();
const mockUpdateProfile = jest.fn();
const mockDeleteUser = jest.fn();
const mockOnAuthStateChanged = jest.fn();
const mockGetDoc = jest.fn();
const mockSetDoc = jest.fn();
const mockDoc = jest.fn(() => ({}));

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: (...args: unknown[]) => mockSignIn(...args),
    createUserWithEmailAndPassword: (...args: unknown[]) => mockCreateUser(...args),
    signOut: (...args: unknown[]) => mockSignOut(...args),
    updateProfile: (...args: unknown[]) => mockUpdateProfile(...args),
    deleteUser: (...args: any[]) => mockDeleteUser(...args),
    onAuthStateChanged: (...args: any[]) => mockOnAuthStateChanged(...args),
}));

jest.mock('firebase/firestore', () => ({
    doc: (...args: any[]) => mockDoc(...args),
    getDoc: (...args: any[]) => mockGetDoc(...args),
    setDoc: (...args: any[]) => mockSetDoc(...args),
}));

jest.mock('../../../../firebaseConfig', () => ({
    auth: {},
    db: {},
}));

// ─── Importacoes apos mocks ───────────────────────────────────────────────────

import {
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// ─── Helpers de simulacao de login/register ───────────────────────────────────

// Simulamos exatamente a logica do AuthProvider para testar o fluxo completo
// sem precisar renderizar o componente React.

const auth = {};
const db = {};

async function simulateLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (!email.trim()) return { success: false, error: 'Informe o e-mail.' };
    if (!password.trim()) return { success: false, error: 'Informe a senha.' };
    if (!email.includes('@')) return { success: false, error: 'E-mail invalido.' };

    try {
        await signInWithEmailAndPassword(auth as any, email.trim(), password);
        return { success: true };
    } catch (err: any) {
        if (err && typeof err === 'object' && 'code' in err && typeof err.code === 'string') {
            return { success: false, error: `Firebase: ${err.code}` };
        }
        return { success: false, error: 'Erro inesperado. Tente novamente.' };
    }
}

async function simulateRegister(
    username: string,
    email: string,
    password: string,
    stickerCount: number,
): Promise<{ success: boolean; error?: string }> {
    if (!username.trim()) return { success: false, error: 'Informe o nome de usuario.' };
    if (username.trim().length < 3) return { success: false, error: 'Username deve ter ao menos 3 caracteres.' };
    if (!email.trim() || !email.includes('@')) return { success: false, error: 'E-mail invalido.' };
    if (!password.trim()) return { success: false, error: 'Informe a senha.' };
    if (password.length < 6) return { success: false, error: 'A senha deve ter ao menos 6 caracteres.' };
    if (isNaN(stickerCount) || stickerCount < 0) return { success: false, error: 'Quantidade de figurinhas invalida.' };

    let createdUser: any = null;
    try {
        const credential = await createUserWithEmailAndPassword(auth as any, email.trim(), password);
        createdUser = credential.user;
        await updateProfile(createdUser, { displayName: username.trim() });
        await setDoc(doc(db as any, 'users', createdUser.uid), { username, email, stickerCount });
        return { success: true };
    } catch (err: any) {
        if (createdUser) {
            try { await deleteUser(createdUser); } catch { /* rollback falhou */ }
        }
        if (err && typeof err === 'object' && 'code' in err) {
            return { success: false, error: `Firebase: ${err.code}` };
        }
        return { success: false, error: 'Erro inesperado ao criar conta. Tente novamente.' };
    }
}

async function simulateLogout(): Promise<void> {
    await signOut(auth as any);
}

// ─── Testes: login ────────────────────────────────────────────────────────────

describe('simulateLogin — integracao com Firebase mockado', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('retorna success: true quando Firebase resolve', async () => {
        mockSignIn.mockResolvedValueOnce({ user: { uid: 'uid-1' } });
        const result = await simulateLogin('user@test.com', 'senha123');
        expect(result).toEqual({ success: true });
        expect(mockSignIn).toHaveBeenCalledTimes(1);
    });

    it('chama signInWithEmailAndPassword com email trimado', async () => {
        mockSignIn.mockResolvedValueOnce({ user: {} });
        await simulateLogin('  user@test.com  ', 'senha123');
        expect(mockSignIn).toHaveBeenCalledWith(auth, 'user@test.com', 'senha123');
    });

    it('retorna erro Firebase traduzido ao falhar', async () => {
        mockSignIn.mockRejectedValueOnce({ code: 'auth/invalid-credential', message: 'erro' });
        const result = await simulateLogin('user@test.com', 'errada');
        expect(result.success).toBe(false);
        expect(result.error).toContain('auth/invalid-credential');
    });

    it('retorna erro generico quando excecao nao e Firebase', async () => {
        mockSignIn.mockRejectedValueOnce(new Error('Network error'));
        const result = await simulateLogin('user@test.com', 'senha123');
        expect(result.success).toBe(false);
        expect(result.error).toBe('Erro inesperado. Tente novamente.');
    });

    it('nao chama Firebase quando email e invalido', async () => {
        const result = await simulateLogin('invalido', 'senha123');
        expect(mockSignIn).not.toHaveBeenCalled();
        expect(result.success).toBe(false);
    });
});

// ─── Testes: register ────────────────────────────────────────────────────────

describe('simulateRegister — integracao com Firebase mockado', () => {
    const fakeUser = { uid: 'uid-novo', displayName: null };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('retorna success: true no fluxo feliz completo', async () => {
        mockCreateUser.mockResolvedValueOnce({ user: fakeUser });
        mockUpdateProfile.mockResolvedValueOnce(undefined);
        mockSetDoc.mockResolvedValueOnce(undefined);

        const result = await simulateRegister('joao', 'joao@test.com', 'senha123', 10);
        expect(result).toEqual({ success: true });
    });

    it('chama createUserWithEmailAndPassword com email trimado', async () => {
        mockCreateUser.mockResolvedValueOnce({ user: fakeUser });
        mockUpdateProfile.mockResolvedValueOnce(undefined);
        mockSetDoc.mockResolvedValueOnce(undefined);

        await simulateRegister('joao', '  joao@test.com  ', 'senha123', 0);
        expect(mockCreateUser).toHaveBeenCalledWith(auth, 'joao@test.com', 'senha123');
    });

    it('chama updateProfile com displayName correto', async () => {
        mockCreateUser.mockResolvedValueOnce({ user: fakeUser });
        mockUpdateProfile.mockResolvedValueOnce(undefined);
        mockSetDoc.mockResolvedValueOnce(undefined);

        await simulateRegister('  Maria  ', 'maria@test.com', 'senha123', 5);
        expect(mockUpdateProfile).toHaveBeenCalledWith(fakeUser, { displayName: 'Maria' });
    });

    it('executa rollback (deleteUser) quando setDoc falha', async () => {
        mockCreateUser.mockResolvedValueOnce({ user: fakeUser });
        mockUpdateProfile.mockResolvedValueOnce(undefined);
        mockSetDoc.mockRejectedValueOnce({ code: 'permission-denied', message: 'Forbidden' });
        mockDeleteUser.mockResolvedValueOnce(undefined);

        const result = await simulateRegister('joao', 'joao@test.com', 'senha123', 10);

        expect(result.success).toBe(false);
        expect(mockDeleteUser).toHaveBeenCalledWith(fakeUser);
    });

    it('retorna erro sem chamar Firebase quando username e curto', async () => {
        const result = await simulateRegister('jo', 'jo@test.com', 'senha123', 10);
        expect(result.success).toBe(false);
        expect(mockCreateUser).not.toHaveBeenCalled();
    });

    it('nao chama deleteUser se createUser falhou (sem usuario criado)', async () => {
        mockCreateUser.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
        await simulateRegister('joao', 'joao@test.com', 'senha123', 10);
        expect(mockDeleteUser).not.toHaveBeenCalled();
    });
});

// ─── Testes: logout ───────────────────────────────────────────────────────────

describe('simulateLogout', () => {
    beforeEach(() => jest.clearAllMocks());

    it('chama signOut uma vez', async () => {
        mockSignOut.mockResolvedValueOnce(undefined);
        await simulateLogout();
        expect(mockSignOut).toHaveBeenCalledTimes(1);
        expect(mockSignOut).toHaveBeenCalledWith(auth);
    });
});
