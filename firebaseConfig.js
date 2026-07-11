import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Auth com persistência de login para o Expo
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa o Banco de Dados (Firestore)
const db = getFirestore(app);

export { app, auth, db };


{
    "type": "service_account",
        "project_id": "projeto-album-copa-26",
            "private_key_id": "26f6777101bacc72af579cf1f7330193fe24d3c3",
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChVhcrUHXwrLlA\ngYoXxBraVmn8x+ziFrZJlySwfEF/VpzcF9k7wguKkaaX8eju26rPcJ/6z+d9a5Np\nauanWApdXCtsK1fZKJ7tG0u9Ov+krF2qqCUOjRhsVp7RG1tSyrS9ZT+yd73cF9ih\nB/vTFewAPkDxpPM4sfbpqaJM83e+Dd2E9H+estpAIFINYpxZiAd6qvyQqk+XMlhd\nhmXPp833SOPpdjMvR57CY8vkVItxToMrVGZnZlASNjrT7GD7rduI6ew71LNGzDFq\nKJ68qaHKAFi2GNRX1Opq0kpEo8uG/oeYLKL/bmyj7Q+fMlkgAeh7ibzGkHmA0TEp\nhFa9kXL/AgMBAAECggEAARO1GxlenUWuQ2LKeN23ztaWWhzvTU4Y12spVB0expFK\nYvPrA8Wu1hnQ7TaN3Aax2oKlUiQ82SYuuF6cxVCpeQzrw3d70MtDFBaqGn7Smf3v\nHSpf0VEUWahtpH4wtlRB9YW0JAdcyFYJgZcEcpMKIYLE/05CAYK6+yJUujXd+py1\nN51U9+0dg+VY066hEV3e/Ds3HM0f7dLNTbKKMgulyv57LlZPxSy9620p0Qbgzpmw\n/69gVAAyGXaq9mFq6r1DMUyfqmJEBv8OfaoLt+ojJ1r9iS9KY7SZFF/3nYnxDFPL\n3jjfO2+fuIX10oPX5UXxlFGr/QGEoKI+JkIz2Tpl+QKBgQDPb80PZhppjiZRWXGl\nzXXeclziW9W2FZ5P4ajTWJ6Qb9TiOLQSyPM3+go7QD7IWKnYhmqWNs2ypg0zBQrk\nZYU+0bxFoQzevffAIg6N30zt667CFpc28tFn7q9t2F/tgB2ocfZtHkM4/KkiUqSa\nWi/ItGZ2lBNOGr4meT8liLK1XQKBgQDHG2A6+tIT3Eub6eZGZdKmey5fkKss6LBd\nqTEr19JY54+aFL7oS0o0E46Mbvp2iEJzrz6Z2biQHCWW5YPmNtTnHEDJZAvFHRxY\nY645ovKtWyhoJp72aaGlswH5NSWJ48Vcbywe93QmJNqt108R3l4Zj0s9d2tQnlNy\nqR0AYs/ICwKBgQCJ/Ulf0QAI77K1stZTAVZDX7hCK+0Cb2ccpHR2AyGX24y14BqJ\n1HtW5VIhEB+zjqeNjf0hZ9t119g39EbGoHH+0+52MygolB5XBVDBN6YpLvrVyclV\nmDmM9c5lN+a4St1vzD+tXtBA/HJWjrtIom3fCYKPpvkgn9GWLlm/UivvUQKBgGdd\nX/Tel8c1u47iu+haHiTNmEKGkUcMOds15dAUCCCdfmCIWp+vzoMAkCV5y89TZ+Q0\n2zP14qn14tHWr0YJuzeL5Fpo9O9M8JU2kpFbdc7nny+KtUXJiuDB8MlWfPl75M7a\n7DXbU1ImGdzcBTGKlqGAUZhEcdL1ju7curCjm6kHAoGBAKutlqNqGrQ4Tnr3WtCg\nvEYDsS+BTA6Q9Ilo4K0uWTwmytMncgwobjmOynFMoI8znXNwcSyjWmVUU+BslWU9\nCz5CTXjp64/JHtIBYGyIKTj5nr2Tc1ky5vFDwaXtr9pcwCq9o7otk+y2417t0C6F\nm+QQhJBZ5VDeWq+DPJe8hMtQ\n-----END PRIVATE KEY-----\n",
                    "client_email": "firebase-adminsdk-fbsvc@projeto-album-copa-26.iam.gserviceaccount.com",
                        "client_id": "109473676251218177214",
                            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                                "token_uri": "https://oauth2.googleapis.com/token",
                                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                                        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40projeto-album-copa-26.iam.gserviceaccount.com",
                                            "universe_domain": "googleapis.com"
}
