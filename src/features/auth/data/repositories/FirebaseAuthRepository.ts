import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged as firebaseOnAuthStateChanged,
    updateProfile,
    deleteUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../../../firebaseConfig';
import type { User, FigurinhaEspecial } from '../../domain/entities/User';
import type {
    IAuthRepository,
    AuthResult,
    FirebaseUserData,
} from '../../domain/repositories/IAuthRepository';
import { isFirebaseError, mapFirebaseError } from '../utils/mapFirebaseError';

const AVATAR_EMOJIS = ['⚽', '🏆', '🥇', '🎯', '🌟', '🦁', '🦅', '🌍'];

const randomEmoji = () => AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)];

export class FirebaseAuthRepository implements IAuthRepository {
    async signIn(email: string, password: string): Promise<AuthResult> {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (err) {
            if (isFirebaseError(err)) {
                return { success: false, error: mapFirebaseError(err.code) };
            }
            return { success: false, error: 'Erro inesperado. Tente novamente.' };
        }
    }

    async signUp(
        username: string,
        email: string,
        password: string,
        stickerCount: number,
        figurinha: FigurinhaEspecial,
    ): Promise<AuthResult> {
        let createdFirebaseUser: any = null;

        try {
            // 1. Cria o usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            createdFirebaseUser = userCredential.user;

            // 2. Atualiza o displayName do usuário no Auth
            await updateProfile(createdFirebaseUser, { displayName: username });

            // 3. Persiste dados extras no Firestore
            const avatarEmoji = randomEmoji();
            const joinedAt = new Date().toLocaleDateString('pt-BR');

            await setDoc(doc(db, 'users', createdFirebaseUser.uid), {
                username,
                email,
                avatarEmoji,
                stickerCount: Number(stickerCount),
                joinedAt,
                createdAt: new Date().toISOString(),
                figurinha: {
                    Jogador: figurinha.Jogador,
                    Seleção: figurinha.Seleção,
                    Pais: figurinha.Pais,
                    Posição: figurinha.Posição,
                },
            });

            return { success: true };
        } catch (err) {
            console.error('Erro detalhado no registro de usuário:', err);

            // Rollback em falhas do Firestore
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
                if (err.code === 'permission-denied') {
                    return { success: false, error: 'Permissão negada no Firestore. Verifique as regras de segurança.' };
                }
                return { success: false, error: mapFirebaseError(err.code) };
            }
            return { success: false, error: 'Erro inesperado ao criar conta. Tente novamente.' };
        }
    }

    async signOut(): Promise<void> {
        await firebaseSignOut(auth);
    }

    async getUserData(uid: string): Promise<User | null> {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: uid,
                    username: data.username,
                    email: data.email,
                    avatarEmoji: data.avatarEmoji ?? '⚽',
                    stickerCount: data.stickerCount ?? 0,
                    joinedAt: data.joinedAt ?? new Date().toLocaleDateString('pt-BR'),
                    figurinha: data.figurinha,
                };
            }
            return null;
        } catch {
            return null;
        }
    }

    onAuthStateChanged(
        callback: (firebaseUser: FirebaseUserData | null) => void,
    ): () => void {
        return firebaseOnAuthStateChanged(auth, (user) => {
            if (user) {
                callback({
                    uid: user.uid,
                    email: user.email ?? '',
                    displayName: user.displayName,
                });
            } else {
                callback(null);
            }
        });
    }
}
