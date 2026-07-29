import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Inicializa o Firebase apenas uma vez (guard para HMR do Metro/Expo)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializa o Auth com persistência — usa instância existente se já inicializado (HMR)
// AsyncStorage é carregado de forma lazy (require em vez de import top-level)
// para evitar que o TurboModuleRegistry tente resolver 'PlatformConstants'
// antes do runtime nativo estar pronto (Invariant Violation com New Architecture).
let auth;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} catch {
    // auth/already-initialized: módulo foi re-executado pelo HMR, reutiliza a instância existente
    auth = getAuth(app);
}

// Inicializa o Banco de Dados (Firestore)
const db = getFirestore(app);

export { app, auth, db };
