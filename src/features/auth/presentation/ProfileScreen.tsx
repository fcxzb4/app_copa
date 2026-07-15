import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from './AuthContext';
import { authStyles as styles } from './styles/authStyles';

// ─── Logged-in profile view ───────────────────────────────────────────────────

function LoggedInProfile() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert(
            'Sair da conta',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair', style: 'destructive',
                    onPress: async () => {
                        await logout();
                    },
                },
            ]
        );
    };

    if (!user) return null;

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
        >
            <View style={styles.profileContainer}>

                {/* ── Avatar + Username ── */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarCircle}>
                            <Text style={styles.avatarText}>{user.avatarEmoji}</Text>
                        </View>
                        <View style={styles.avatarEditBadge}>
                            <Ionicons name="pencil" size={12} color="#05110B" />
                        </View>
                    </View>

                    <Text style={styles.usernameText}>@{user.username}</Text>
                    <Text style={styles.emailText}>{user.email}</Text>

                    <View style={styles.joinedBadge}>
                        <Ionicons name="calendar-outline" size={11} color="#4ADE80" />
                        <Text style={styles.joinedText}>Membro desde {user.joinedAt}</Text>
                    </View>
                </View>

                {/* ── Stats Cards ── */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{user.stickerCount}</Text>
                        <Text style={styles.statLabel}>Figurinhas{'\n'}Coletadas</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statValue, { fontSize: 24 }]}>🏆</Text>
                        <Text style={styles.statLabel}>Copa{'\n'}2026</Text>
                    </View>
                </View>

                {/* ── Botão Minha Coleção ── */}
                <TouchableOpacity
                    style={styles.collectionBtn}
                    onPress={() => router.push('/collection' as any)}
                    activeOpacity={0.85}
                >
                    <Ionicons name="albums" size={20} color="#05110B" />
                    <Text style={styles.collectionBtnText}>Minha Coleção</Text>
                </TouchableOpacity>

                {/* ── Settings Card ── */}
                <View style={styles.settingsCard}>
                    <TouchableOpacity
                        style={styles.settingsItem}
                        onPress={() => Alert.alert('Editar Perfil', 'Em breve!')}
                    >
                        <View style={styles.settingsIconBox}>
                            <Ionicons name="person-outline" size={18} color="#4ADE80" />
                        </View>
                        <Text style={styles.settingsLabel}>Editar Perfil</Text>
                        <Ionicons name="chevron-forward" size={16} color="#4A6741" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.settingsItem, styles.settingsItemBorder]}
                        onPress={() => Alert.alert('Notificações', 'Em breve!')}
                    >
                        <View style={styles.settingsIconBox}>
                            <Ionicons name="notifications-outline" size={18} color="#FACC15" />
                        </View>
                        <Text style={styles.settingsLabel}>Notificações</Text>
                        <Ionicons name="chevron-forward" size={16} color="#4A6741" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.settingsItem, styles.settingsItemBorder]}
                        onPress={handleLogout}
                    >
                        <View style={[styles.settingsIconBox, { backgroundColor: 'rgba(248,113,113,0.1)' }]}>
                            <Ionicons name="log-out-outline" size={18} color="#F87171" />
                        </View>
                        <Text style={[styles.settingsLabel, styles.settingsLabelDanger]}>Sair da Conta</Text>
                        <Ionicons name="chevron-forward" size={16} color="#F87171" />
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
}

// ─── Guest view (not logged in) ───────────────────────────────────────────────

function GuestProfile() {
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

// ─── Main Profile Screen ──────────────────────────────────────────────────────

export default function ProfileScreen() {
    const { isLoggedIn } = useAuth();

    return (
        <View style={styles.screen}>
            {isLoggedIn ? <LoggedInProfile /> : <GuestProfile />}
        </View>
    );
}
