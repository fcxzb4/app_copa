import { FirebaseAuthRepository } from '../data/repositories/FirebaseAuthRepository';

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
    deleteUser: (...args: unknown[]) => mockDeleteUser(...args),
    onAuthStateChanged: (...args: unknown[]) => mockOnAuthStateChanged(...args),
}));

jest.mock('firebase/firestore', () => ({
    doc: (...args: unknown[]) => mockDoc(...args),
    getDoc: (...args: unknown[]) => mockGetDoc(...args),
    setDoc: (...args: unknown[]) => mockSetDoc(...args),
}));

jest.mock('../../../../firebaseConfig', () => ({
    auth: {},
    db: {},
}));

describe('FirebaseAuthRepository', () => {
    let repo: FirebaseAuthRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        repo = new FirebaseAuthRepository();
    });

    describe('signIn', () => {
        it('retorna success: true ao autenticar com sucesso', async () => {
            mockSignIn.mockResolvedValueOnce({ user: { uid: 'uid123' } });
            const result = await repo.signIn('user@test.com', 'password123');
            expect(result).toEqual({ success: true });
        });

        it('retorna erro formatado quando signInWithEmailAndPassword lança exceção do Firebase', async () => {
            mockSignIn.mockRejectedValueOnce({ code: 'auth/wrong-password', message: 'Wrong password' });
            const result = await repo.signIn('user@test.com', 'wrong');
            expect(result).toEqual({ success: false, error: 'E-mail ou senha incorretos.' });
        });

        it('retorna erro genérico quando exceção desconhecida é lançada', async () => {
            mockSignIn.mockRejectedValueOnce(new Error('Fatal error'));
            const result = await repo.signIn('user@test.com', 'wrong');
            expect(result).toEqual({ success: false, error: 'Erro inesperado. Tente novamente.' });
        });
    });

    describe('signUp', () => {
        const figurinhaMock = {
            Jogador: 'Neymar',
            Seleção: 'Brasil',
            Pais: 'Brasil',
            Posição: 'Atacante',
        };

        it('cria conta no Auth e salva dados no Firestore com sucesso', async () => {
            const fakeUser = { uid: 'uid999' };
            mockCreateUser.mockResolvedValueOnce({ user: fakeUser });
            mockUpdateProfile.mockResolvedValueOnce(undefined);
            mockSetDoc.mockResolvedValueOnce(undefined);

            const result = await repo.signUp('torcedor', 'torcedor@test.com', 'pass123', 5, figurinhaMock);
            expect(result).toEqual({ success: true });
            expect(mockCreateUser).toHaveBeenCalled();
            expect(mockUpdateProfile).toHaveBeenCalledWith(fakeUser, { displayName: 'torcedor' });
            expect(mockSetDoc).toHaveBeenCalled();
        });

        it('realiza rollback (deleteUser) se setDoc do Firestore falhar', async () => {
            const fakeUser = { uid: 'uid999' };
            mockCreateUser.mockResolvedValueOnce({ user: fakeUser });
            mockUpdateProfile.mockResolvedValueOnce(undefined);
            mockSetDoc.mockRejectedValueOnce({ code: 'permission-denied' });
            mockDeleteUser.mockResolvedValueOnce(undefined);

            const result = await repo.signUp('torcedor', 'torcedor@test.com', 'pass123', 5, figurinhaMock);
            expect(result.success).toBe(false);
            expect(result.error).toContain('Permissão negada');
            expect(mockDeleteUser).toHaveBeenCalledWith(fakeUser);
        });
    });

    describe('signOut', () => {
        it('chama firebase signOut', async () => {
            mockSignOut.mockResolvedValueOnce(undefined);
            await repo.signOut();
            expect(mockSignOut).toHaveBeenCalled();
        });
    });

    describe('getUserData', () => {
        it('retorna o usuário formatado se o documento existir no Firestore', async () => {
            mockGetDoc.mockResolvedValueOnce({
                exists: () => true,
                data: () => ({
                    username: 'pele',
                    email: 'pele@brasil.com',
                    avatarEmoji: '👑',
                    stickerCount: 10,
                    joinedAt: '01/01/2026',
                }),
            });

            const user = await repo.getUserData('uid-pele');
            expect(user).not.toBeNull();
            expect(user?.username).toBe('pele');
            expect(user?.avatarEmoji).toBe('👑');
        });

        it('retorna null se o documento não existir', async () => {
            mockGetDoc.mockResolvedValueOnce({
                exists: () => false,
            });

            const user = await repo.getUserData('uid-inexistente');
            expect(user).toBeNull();
        });
    });

    describe('onAuthStateChanged', () => {
        it('registra listener e mapeia callback', () => {
            const callback = jest.fn();
            const unsubscribeMock = jest.fn();
            mockOnAuthStateChanged.mockImplementationOnce((_auth, cb) => {
                cb({ uid: 'u1', email: 'e1@test.com', displayName: 'User 1' });
                return unsubscribeMock;
            });

            const unsub = repo.onAuthStateChanged(callback);
            expect(callback).toHaveBeenCalledWith({
                uid: 'u1',
                email: 'e1@test.com',
                displayName: 'User 1',
            });
            expect(unsub).toBe(unsubscribeMock);
        });
    });
});
