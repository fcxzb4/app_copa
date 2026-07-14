import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from './AuthContext';
import { authStyles as styles } from './styles/authStyles';

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);
        setLoading(true);
        const result = await login(email.trim(), password);
        setLoading(false);

        if (result.success) {
            // Redireciona de volta ao perfil após login
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
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={18} color="#8CA185" />
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>

                {/* ── Logo Area ── */}
                <View style={styles.formLogoArea}>
                    <View style={styles.formLogoBadge}>
                        <Text style={styles.formLogoEmoji}>⚽</Text>
                    </View>
                    <Text style={styles.formTitle}>Entrar</Text>
                    <Text style={styles.formSubtitle}>
                        Acesse sua conta para ver sua coleção da Copa 2026
                    </Text>
                </View>

                {/* ── Error Box ── */}
                {error && (
                    <View style={styles.errorBox}>
                        <Ionicons name="alert-circle-outline" size={16} color="#F87171" />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                {/* ── Form Fields ── */}
                <View style={styles.inputGroup}>
                    {/* Email */}
                    <View style={[
                        styles.inputWrapper,
                        emailFocused && styles.inputWrapperFocused,
                    ]}>
                        <Ionicons
                            name="mail-outline"
                            size={18}
                            color={emailFocused ? '#4ADE80' : '#4A6741'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Seu e-mail"
                            placeholderTextColor="#4A6741"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            returnKeyType="next"
                        />
                    </View>

                    {/* Password */}
                    <View style={[
                        styles.inputWrapper,
                        passFocused && styles.inputWrapperFocused,
                    ]}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={18}
                            color={passFocused ? '#4ADE80' : '#4A6741'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Sua senha"
                            placeholderTextColor="#4A6741"
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setPassFocused(true)}
                            onBlur={() => setPassFocused(false)}
                            secureTextEntry={!showPassword}
                            returnKeyType="done"
                            onSubmitEditing={handleLogin}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={18}
                                color="#4A6741"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Submit ── */}
                <TouchableOpacity
                    style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                    activeOpacity={0.85}
                >
                    {loading ? (
                        <ActivityIndicator color="#05110B" />
                    ) : (
                        <Text style={styles.submitBtnText}>Entrar</Text>
                    )}
                </TouchableOpacity>

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
