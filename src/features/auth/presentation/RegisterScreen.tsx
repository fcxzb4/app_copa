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
    SpecialStickerFields,
} from './components';
import { authStyles as styles } from './styles/authStyles';

export default function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [figurinhas, setFigurinhas] = useState('');
    const [jogador, setJogador] = useState('');
    const [selecao, setSelecao] = useState('');
    const [pais, setPais] = useState('');
    const [posicao, setPosicao] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        setError(null);

        if (figurinhas.trim() === '') {
            setError('Informe a quantidade inicial de figurinhas.');
            return;
        }

        const stickerNum = Number(figurinhas);
        if (isNaN(stickerNum) || stickerNum < 0) {
            setError('A quantidade de figurinhas deve ser um número maior ou igual a zero.');
            return;
        }

        if (!jogador.trim()) {
            setError('Informe o nome do jogador da sua figurinha especial.');
            return;
        }
        if (!selecao.trim()) {
            setError('Informe a seleção da sua figurinha especial.');
            return;
        }
        if (!pais.trim()) {
            setError('Informe o país de nascimento do jogador.');
            return;
        }
        if (!posicao.trim()) {
            setError('Informe a posição do jogador (ex: Goleiro, Atacante).');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setLoading(true);
        const result = await register(
            username.trim(),
            email.trim(),
            password,
            stickerNum,
            {
                Jogador: jogador.trim(),
                Seleção: selecao.trim(),
                Pais: pais.trim(),
                Posição: posicao.trim(),
            }
        );
        setLoading(false);

        if (result.success) {
            router.replace('/profile' as any);
        } else {
            setError(result.error ?? 'Erro ao criar conta.');
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
                    emoji="🏆"
                    title="Criar Conta"
                    subtitle="Junte-se à torcida e monte sua coleção da Copa 2026"
                />

                {/* ── Error Box ── */}
                <AuthErrorBox error={error} />

                {/* ── Form Fields ── */}
                <View style={styles.inputGroup}>
                    <AuthInput
                        iconName="at-outline"
                        placeholder="Nome de usuário"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoComplete="username"
                        returnKeyType="next"
                    />

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
                        iconName="albums-outline"
                        placeholder="Quantidade de figurinhas"
                        value={figurinhas}
                        onChangeText={setFigurinhas}
                        keyboardType="number-pad"
                        returnKeyType="next"
                    />

                    <SpecialStickerFields
                        jogador={jogador}
                        onChangeJogador={setJogador}
                        selecao={selecao}
                        onChangeSelecao={setSelecao}
                        pais={pais}
                        onChangePais={setPais}
                        posicao={posicao}
                        onChangePosicao={setPosicao}
                    />

                    <AuthInput
                        iconName="lock-closed-outline"
                        placeholder="Crie uma senha"
                        value={password}
                        onChangeText={setPassword}
                        isPassword
                        returnKeyType="next"
                    />

                    <AuthInput
                        iconName="shield-checkmark-outline"
                        placeholder="Confirme a senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        isPassword
                        hasError={!!(password && confirmPassword && password !== confirmPassword)}
                        returnKeyType="done"
                        onSubmitEditing={handleRegister}
                    />
                </View>

                {/* ── Submit ── */}
                <AuthSubmitButton title="Criar Conta" loading={loading} onPress={handleRegister} />

                {/* ── Footer link ── */}
                <View style={styles.formFooterRow}>
                    <Text style={styles.formFooterText}>Já tem conta?</Text>
                    <TouchableOpacity onPress={() => router.replace('/login' as any)}>
                        <Text style={styles.formFooterLink}>Entrar agora</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
