import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from './AuthContext';
import {
    AuthBackButton,
    AuthErrorBox,
    AuthFormHeader,
    AuthInput,
    AuthSubmitButton,
} from './components';
import { authStyles as styles } from './styles/authStyles';

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);
        setLoading(true);
        const result = await login(email.trim(), password);
        setLoading(false);

        if (result.success) {
            router.replace('/profile' as any);
        } else {
            setError(result.error ?? 'Erro ao fazer login.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.formScreen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.formScrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* ── Back Button ── */}
                <AuthBackButton />

                {/* ── Logo Area ── */}
                <AuthFormHeader
                    emoji="⚽"
                    title="Entrar"
                    subtitle="Acesse sua conta para ver sua coleção da Copa 2026"
                />

                {/* ── Error Box ── */}
                <AuthErrorBox error={error} />

                {/* ── Form Fields ── */}
                <View style={styles.inputGroup}>
                    <AuthInput
                        iconName="mail-outline"
                        placeholder="Seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        returnKeyType="next"
                    />

                    <AuthInput
                        iconName="lock-closed-outline"
                        placeholder="Sua senha"
                        value={password}
                        onChangeText={setPassword}
                        isPassword
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                    />
                </View>

                {/* ── Submit ── */}
                <AuthSubmitButton title="Entrar" loading={loading} onPress={handleLogin} />

                {/* ── Footer link ── */}
                <View style={styles.formFooterRow}>
                    <Text style={styles.formFooterText}>Não tem conta?</Text>
                    <TouchableOpacity onPress={() => router.replace('/register' as any)}>
                        <Text style={styles.formFooterLink}>Criar agora</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
