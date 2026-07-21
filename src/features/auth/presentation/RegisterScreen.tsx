import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { useAuth } from './AuthContext';
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [usernameFocused, setUsernameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [figurinhasFocused, setFigurinhasFocused] = useState(false);
    const [jogadorFocused, setJogadorFocused] = useState(false);
    const [selecaoFocused, setSelecaoFocused] = useState(false);
    const [paisFocused, setPaisFocused] = useState(false);
    const [posicaoFocused, setPosicaoFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const [confirmFocused, setConfirmFocused] = useState(false);

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
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={18} color="#8CA185" />
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>

                {/* ── Logo Area ── */}
                <View style={styles.formLogoArea}>
                    <View style={styles.formLogoBadge}>
                        <Text style={styles.formLogoEmoji}>🏆</Text>
                    </View>
                    <Text style={styles.formTitle}>Criar Conta</Text>
                    <Text style={styles.formSubtitle}>
                        Junte-se à torcida e monte sua coleção da Copa 2026
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
                    {/* Username */}
                    <View style={[
                        styles.inputWrapper,
                        usernameFocused && styles.inputWrapperFocused,
                    ]}>
                        <Ionicons
                            name="at-outline"
                            size={18}
                            color={usernameFocused ? '#4ADE80' : '#4A6741'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome de usuário"
                            placeholderTextColor="#4A6741"
                            value={username}
                            onChangeText={setUsername}
                            onFocus={() => setUsernameFocused(true)}
                            onBlur={() => setUsernameFocused(false)}
                            autoCapitalize="none"
                            autoComplete="username"
                            returnKeyType="next"
                        />
                    </View>

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

                    {/* Figurinhas */}
                    <View style={[
                        styles.inputWrapper,
                        figurinhasFocused && styles.inputWrapperFocused,
                    ]}>
                        <Ionicons
                            name="albums-outline"
                            size={18}
                            color={figurinhasFocused ? '#4ADE80' : '#4A6741'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantidade de figurinhas"
                            placeholderTextColor="#4A6741"
                            value={figurinhas}
                            onChangeText={setFigurinhas}
                            onFocus={() => setFigurinhasFocused(true)}
                            onBlur={() => setFigurinhasFocused(false)}
                            keyboardType="number-pad"
                            returnKeyType="next"
                        />
                    </View>

                    {/* Seção Figurinha Especial */}
                    <Text style={{ color: '#8CA185', fontSize: 13, fontWeight: '600', marginTop: 12, marginBottom: 4, marginLeft: 4 }}>
                        Figurinha Especial
                    </Text>

                    {/* Jogador */}
                    <View style={[
                        styles.inputWrapper,
                        jogadorFocused && styles.inputWrapperFocused,
                    ]}>
                        <Ionicons
                            name="person-outline"
                            size={18}
                            color={jogadorFocused ? '#4ADE80' : '#4A6741'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Jogador da figurinha"
                            placeholderTextColor="#4A6741"
                            value={jogador}
                            onChangeText={setJogador}
                            onFocus={() => setJogadorFocused(true)}
                            onBlur={() => setJogadorFocused(false)}
                            returnKeyType="next"
                        />
                    </View>

                    {/* Seleção */}
                    <View style={[
                        styles.inputWrapper,
                        selecaoFocused && styles.inputWrapperFocused,
                    ]}>
                        <Ionicons
                            name="flag-outline"
                            size={18}
                            color={selecaoFocused ? '#4ADE80' : '#4A6741'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Seleção (Time)"
                            placeholderTextColor="#4A6741"
                            value={selecao}
                            onChangeText={setSelecao}
                            onFocus={() => setSelecaoFocused(true)}
                            onBlur={() => setSelecaoFocused(false)}
                            returnKeyType="next"
                        />
                    </View>

                    {/* Pais */}
                    <View style={[
                        styles.inputWrapper,
                        paisFocused && styles.inputWrapperFocused,
                    ]}>
                        <Ionicons
                            name="earth-outline"
                            size={18}
                            color={paisFocused ? '#4ADE80' : '#4A6741'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="País de origem"
                            placeholderTextColor="#4A6741"
                            value={pais}
                            onChangeText={setPais}
                            onFocus={() => setPaisFocused(true)}
                            onBlur={() => setPaisFocused(false)}
                            returnKeyType="next"
                        />
                    </View>

                    {/* Posição */}
                    <View style={[
                        styles.inputWrapper,
                        posicaoFocused && styles.inputWrapperFocused,
                    ]}>
                        <Ionicons
                            name="football-outline"
                            size={18}
                            color={posicaoFocused ? '#4ADE80' : '#4A6741'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Posição (ex: Atacante)"
                            placeholderTextColor="#4A6741"
                            value={posicao}
                            onChangeText={setPosicao}
                            onFocus={() => setPosicaoFocused(true)}
                            onBlur={() => setPosicaoFocused(false)}
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
                            placeholder="Crie uma senha"
                            placeholderTextColor="#4A6741"
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setPassFocused(true)}
                            onBlur={() => setPassFocused(false)}
                            secureTextEntry={!showPassword}
                            returnKeyType="next"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={18}
                                color="#4A6741"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Confirm Password */}
                    <View style={[
                        styles.inputWrapper,
                        confirmFocused && styles.inputWrapperFocused,
                        (password && confirmPassword && password !== confirmPassword)
                            ? styles.inputWrapperError : undefined,
                    ]}>
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={18}
                            color={confirmFocused ? '#4ADE80' : '#4A6741'}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirme a senha"
                            placeholderTextColor="#4A6741"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            onFocus={() => setConfirmFocused(true)}
                            onBlur={() => setConfirmFocused(false)}
                            secureTextEntry={!showConfirm}
                            returnKeyType="done"
                            onSubmitEditing={handleRegister}
                        />
                        <TouchableOpacity onPress={() => setShowConfirm(prev => !prev)}>
                            <Ionicons
                                name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                                size={18}
                                color="#4A6741"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Submit ── */}
                <TouchableOpacity
                    style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                    activeOpacity={0.85}
                >
                    {loading ? (
                        <ActivityIndicator color="#05110B" />
                    ) : (
                        <Text style={styles.submitBtnText}>Criar Conta</Text>
                    )}
                </TouchableOpacity>

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
