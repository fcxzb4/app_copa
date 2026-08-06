import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { authStyles as styles } from '../styles/authStyles';

export function GuestProfile() {
    const router = useRouter();

    return (
        <View style={styles.guestContainer}>
            {/* ── Header ── */}
            <View style={styles.guestHeader}>
                <View style={styles.guestAvatarCircle}>
                    <Ionicons name="person" size={40} color="#1E4A2D" />
                </View>
                <Text style={styles.guestTitle}>Bem-vindo! 👋</Text>
                <Text style={styles.guestSubtitle}>
                    Faça login ou crie sua conta para salvar sua coleção de figurinhas e acompanhar a Copa 2026.
                </Text>
            </View>

            {/* ── Auth Options Card ── */}
            <View style={styles.authOptionsCard}>
                {/* Login */}
                <TouchableOpacity
                    style={styles.authOption}
                    onPress={() => router.push('/login' as any)}
                    activeOpacity={0.8}
                >
                    <View style={[styles.authOptionIconBox, { backgroundColor: '#0E291B' }]}>
                        <Ionicons name="log-in-outline" size={22} color="#4ADE80" />
                    </View>
                    <View style={styles.authOptionTextGroup}>
                        <Text style={styles.authOptionTitle}>Entrar</Text>
                        <Text style={styles.authOptionSubtitle}>Acesse sua conta existente</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#4A6741" />
                </TouchableOpacity>

                {/* Register */}
                <TouchableOpacity
                    style={[styles.authOption, styles.authOptionBorder]}
                    onPress={() => router.push('/register' as any)}
                    activeOpacity={0.8}
                >
                    <View style={[styles.authOptionIconBox, { backgroundColor: '#17391D' }]}>
                        <Ionicons name="person-add-outline" size={22} color="#FACC15" />
                    </View>
                    <View style={styles.authOptionTextGroup}>
                        <Text style={styles.authOptionTitle}>Criar Conta</Text>
                        <Text style={styles.authOptionSubtitle}>Junte-se à torcida da Copa 2026</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#4A6741" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
