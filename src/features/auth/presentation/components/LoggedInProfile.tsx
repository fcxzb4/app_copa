import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../AuthContext';
import { authStyles as styles } from '../styles/authStyles';
import { useStickerDatabase } from '../../../stickers/data/useStickerDatabase';

const PACK_PRESETS = [0, 1, 3, 5, 10, 15, 20, 30, 50];

export function LoggedInProfile() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { packsRemaining, setPacksCount } = useStickerDatabase();

    const [showPacksModal, setShowPacksModal] = useState(false);
    const [settingPacks, setSettingPacks] = useState(false);

    const handleLogout = () => {
        Alert.alert(
            'Sair da conta',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                    },
                },
            ]
        );
    };

    const handleSelectPacks = async (amount: number) => {
        try {
            setSettingPacks(true);
            await setPacksCount(amount);
            setShowPacksModal(false);
        } catch {
            Alert.alert('Erro', 'Não foi possível atualizar os pacotes.');
        } finally {
            setSettingPacks(false);
        }
    };

    if (!user) return null;

    return (
        <>
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

                        {/* ── Botão Discreto: Ajustar Pacotes (debug/admin) ── */}
                        <TouchableOpacity
                            style={[styles.settingsItem, styles.settingsItemBorder]}
                            onPress={() => setShowPacksModal(true)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.settingsIconBox, { backgroundColor: 'rgba(74, 222, 128, 0.08)' }]}>
                                <Text style={{ fontSize: 14 }}>🎴</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.settingsLabel, { color: '#4A6741', fontSize: 12 }]}>
                                    Pacotes disponíveis
                                </Text>
                                <Text style={{ color: '#8CA185', fontSize: 10, marginTop: 1 }}>
                                    {packsRemaining} pacote{packsRemaining !== 1 ? 's' : ''}
                                </Text>
                            </View>
                            <Ionicons name="settings-outline" size={13} color="#2D4A35" />
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

            {/* ── Modal de Ajuste de Pacotes ── */}
            <Modal
                visible={showPacksModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowPacksModal(false)}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        justifyContent: 'flex-end',
                    }}
                    activeOpacity={1}
                    onPress={() => setShowPacksModal(false)}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            backgroundColor: '#0A1C13',
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            borderTopWidth: 1,
                            borderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderColor: '#133021',
                            padding: 24,
                            paddingBottom: 36,
                            gap: 20,
                        }}
                    >
                        {/* Handle bar */}
                        <View style={{
                            width: 40, height: 4, borderRadius: 2,
                            backgroundColor: '#133021', alignSelf: 'center',
                        }} />

                        {/* Título */}
                        <View style={{ gap: 4 }}>
                            <Text style={{
                                color: '#FFFFFF', fontSize: 16, fontWeight: '900',
                                textTransform: 'uppercase', letterSpacing: 0.5,
                            }}>
                                🎴 Ajustar Pacotes
                            </Text>
                            <Text style={{ color: '#8CA185', fontSize: 12 }}>
                                Atual: {packsRemaining} pacote{packsRemaining !== 1 ? 's' : ''}
                            </Text>
                        </View>

                        {/* Grid de presets */}
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 10,
                        }}>
                            {PACK_PRESETS.map((amount) => {
                                const isSelected = packsRemaining === amount;
                                return (
                                    <TouchableOpacity
                                        key={amount}
                                        onPress={() => handleSelectPacks(amount)}
                                        disabled={settingPacks}
                                        activeOpacity={0.75}
                                        style={{
                                            paddingVertical: 12,
                                            paddingHorizontal: 0,
                                            width: '30%',
                                            borderRadius: 14,
                                            borderWidth: 1.5,
                                            borderColor: isSelected ? '#4ADE80' : '#133021',
                                            backgroundColor: isSelected
                                                ? 'rgba(74, 222, 128, 0.12)'
                                                : '#06160E',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 3,
                                        }}
                                    >
                                        <Text style={{
                                            color: isSelected ? '#4ADE80' : '#FFFFFF',
                                            fontSize: 18,
                                            fontWeight: '900',
                                        }}>
                                            {amount}
                                        </Text>
                                        <Text style={{
                                            color: isSelected ? '#4ADE80' : '#8CA185',
                                            fontSize: 9,
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                        }}>
                                            {amount === 1 ? 'pacote' : 'pacotes'}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Botão cancelar */}
                        <TouchableOpacity
                            onPress={() => setShowPacksModal(false)}
                            style={{
                                paddingVertical: 13,
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor: '#133021',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#8CA185', fontSize: 13, fontWeight: '700' }}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </>
    );
}
