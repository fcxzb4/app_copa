import React, { useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Easing,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { teams } from '../../../shared/data/worldCupData';
import { stickersStyles as styles } from './styles/stickers_styles';
import { useStickerDatabase } from '../data/useStickerDatabase';

// ─── Tipos ─────────────────────────────────────────────────────────────────────

interface OpenedSticker {
    id: string;
    name: string;
    flag: string;
    group: string;
    teamId: string;
}

const starPlayers: Record<string, string> = {
    BRA: 'Vinícius Jr.',
    ARG: 'Lionel Messi',
    FRA: 'Kylian Mbappé',
    POR: 'Cristiano Ronaldo',
    ENG: 'Jude Bellingham',
    CRO: 'Luka Modrić',
    MEX: 'Guillermo Ochoa',
    CAN: 'Alphonso Davies',
    USA: 'Christian Pulisic',
    GER: 'Jamal Musiala',
    ESP: 'Lamine Yamal',
    BEL: 'Kevin De Bruyne',
};

/** Total de figurinhas do álbum completo */
const TOTAL_ALBUM_STICKERS = 640;

// ─── Componente Principal ──────────────────────────────────────────────────────

export default function StickersScreen() {
    const router = useRouter();
    const {
        packsRemaining,
        totalCollected,
        isLoading,
        openPack,
        saveStickers,
    } = useStickerDatabase();

    const [isOpening, setIsOpening] = useState(false);
    const [revealedStickers, setRevealedStickers] = useState<OpenedSticker[]>([]);
    const [showReveal, setShowReveal] = useState(false);

    // Animações do card de rasgar
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    const runOpenAnimation = (onDone: () => void) => {
        Animated.sequence([
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true, easing: Easing.linear }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true, easing: Easing.linear }),
                Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true, easing: Easing.linear }),
                Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true, easing: Easing.linear }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true, easing: Easing.linear }),
            ]),
            Animated.timing(scaleAnim, { toValue: 1.08, duration: 180, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 0.85, duration: 300, useNativeDriver: true }),
            Animated.timing(glowAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.timing(glowAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start(onDone);
    };

    const handleRasg = async () => {
        if (packsRemaining <= 0 || isOpening || isLoading) return;
        setIsOpening(true);

        await openPack();

        runOpenAnimation(() => {
            const shuffled = [...teams].sort(() => Math.random() - 0.5);
            const picked: OpenedSticker[] = shuffled.slice(0, 3).map((t) => ({
                id: `${t.id}-${Math.floor(Math.random() * 20) + 1}`,
                name: starPlayers[t.id] ?? `Jogador ${t.id}`,
                flag: t.flag,
                group: t.group,
                teamId: t.id,
            }));

            setRevealedStickers(picked);
            setIsOpening(false);
            setShowReveal(true);
        });
    };

    const handleSaveToAlbum = async () => {
        try {
            await saveStickers(
                revealedStickers.map((s) => ({
                    sticker_id: s.id,
                    player_name: s.name,
                    flag: s.flag,
                    group_name: s.group,
                    team_id: s.teamId,
                }))
            );
        } catch {
            Alert.alert('Erro', 'Não foi possível salvar as figurinhas. Tente novamente.');
        } finally {
            setShowReveal(false);
        }
    };

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
    });

    const progressPercent = Math.min(
        Math.round((totalCollected / TOTAL_ALBUM_STICKERS) * 100),
        100
    );
    const missing = Math.max(0, TOTAL_ALBUM_STICKERS - totalCollected);

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* ── Card: Minha Coleção ── */}
                <View style={styles.collectionCard}>
                    <View style={styles.collectionHeader}>
                        <View>
                            <Text style={styles.collectionTitleLabel}>Minha Coleção</Text>
                            <Text style={styles.collectionProgressText}>
                                {progressPercent}% COMPLETADA
                            </Text>
                        </View>
                        <Text style={styles.collectionCountText}>
                            {totalCollected}/{TOTAL_ALBUM_STICKERS}
                        </Text>
                    </View>

                    {/* Barra de progresso */}
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBarFill,
                                { width: `${progressPercent}%` },
                            ]}
                        />
                    </View>

                    {/* Botões */}
                    <View style={styles.collectionButtonsContainer}>
                        <TouchableOpacity
                            style={styles.scanButton}
                            onPress={() =>
                                Alert.alert(
                                    'Escanear',
                                    'Funcionalidade de escaneamento disponível em breve!'
                                )
                            }
                        >
                            <Ionicons name="scan-outline" size={14} color="#05110B" />
                            <Text style={styles.scanButtonText}>ESCANEAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.openCollectionButton}
                            onPress={() => router.push('/collection' as any)}
                        >
                            <Text style={styles.openCollectionButtonText}>
                                ABRA A SUA COLEÇÃO
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Card: Rasgue o seu Pacote ── */}
                <Animated.View
                    style={[
                        styles.ripCardContainer,
                        {
                            transform: [
                                { translateX: shakeAnim },
                                { scale: scaleAnim },
                            ],
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={handleRasg}
                        disabled={packsRemaining === 0 || isOpening || isLoading}
                        activeOpacity={0.88}
                    >
                        <LinearGradient
                            colors={
                                packsRemaining === 0 || isLoading
                                    ? ['#1A2E20', '#1A2E20']
                                    : ['#2E7D32', '#4CAF50']
                            }
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.ripCardGradient}
                        >
                            {/* Glow ao abrir */}
                            <Animated.View
                                pointerEvents="none"
                                style={[
                                    StyleSheet.absoluteFillObject,
                                    {
                                        backgroundColor: '#FACC15',
                                        borderRadius: 16,
                                        opacity: glowOpacity,
                                    },
                                ]}
                            />

                            <Text style={styles.ripCardText}>
                                {isOpening
                                    ? 'RASGANDO...'
                                    : packsRemaining === 0
                                    ? 'SEM PACOTES'
                                    : 'RASGAR O SEU PACOTE'}
                            </Text>

                            <View style={styles.ripCardIconContainer}>
                                <Ionicons
                                    name={packsRemaining === 0 ? 'close-circle-outline' : 'file-tray-full-outline'}
                                    size={28}
                                    color="#FFFFFF"
                                />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                {/* Indicador de pacotes restantes */}
                <View style={localStyles.packsIndicator}>
                    <Ionicons name="checkmark-circle" size={13} color="#8CA185" />
                    <Text style={localStyles.packsIndicatorText}>
                        {isLoading
                            ? 'Carregando...'
                            : packsRemaining === 0
                            ? 'Nenhum pacote disponível'
                            : `Você tem ${packsRemaining} pacote${packsRemaining !== 1 ? 's' : ''} disponível${packsRemaining !== 1 ? 'is' : ''}`}
                    </Text>
                </View>

                {/* ── Card: Pacote Lendário (Oferta Limitada) ── */}
                <TouchableOpacity
                    style={styles.promoCard}
                    onPress={() =>
                        Alert.alert(
                            'Pacote Lendário',
                            'Sistema de compra de pacotes premium disponível em breve!'
                        )
                    }
                    activeOpacity={0.9}
                >
                    {/* Badge */}
                    <View style={styles.promoBadge}>
                        <Ionicons name="flash" size={10} color="#05110B" />
                        <Text style={styles.promoBadgeText}>OFERTA LIMITADA</Text>
                    </View>

                    <Text style={styles.promoTitle}>PACOTE LENDÁRIO</Text>
                    <Text style={styles.promoSubtitle}>
                        3 jogadores brilhantes garantidos neste pacote.
                    </Text>

                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={() =>
                            Alert.alert(
                                'Pacote Lendário',
                                'Sistema de compra disponível em breve!'
                            )
                        }
                    >
                        <Text style={styles.buyButtonText}>COMPRE AGORA</Text>
                    </TouchableOpacity>

                    {/* Decoração de cards ao fundo */}
                    <View style={styles.promoGraphicsContainer}>
                        <View style={styles.promoGraphicCard1} />
                        <View style={styles.promoGraphicCard2} />
                    </View>
                </TouchableOpacity>

                {/* ── Card: Faltam para Você ── */}
                <TouchableOpacity
                    style={styles.missingCard}
                    onPress={() => router.push('/collection' as any)}
                    activeOpacity={0.8}
                >
                    <View style={styles.missingLeft}>
                        <Ionicons name="albums-outline" size={20} color="#4ADE80" />
                        <Text style={styles.missingTitle}>FALTAM PARA VOCÊ</Text>
                    </View>

                    <View style={styles.missingRight}>
                        <Text style={styles.missingBadgeText}>{missing}</Text>
                        <Ionicons name="chevron-down" size={14} color="#8CA185" />
                    </View>
                </TouchableOpacity>

            </ScrollView>

            {/* ── Modal de Revelação ── */}
            <Modal visible={showReveal} transparent animationType="fade">
                <View style={localStyles.modalOverlay}>
                    <View style={localStyles.modalCard}>
                        <Text style={localStyles.modalTitle}>✨ NOVAS FIGURINHAS! ✨</Text>

                        <View style={styles.stickersRow}>
                            {revealedStickers.map((s) => (
                                <View key={s.id} style={styles.stickerRevealCard}>
                                    <Text style={styles.stickerRevealFlag}>{s.flag}</Text>
                                    <Text style={styles.stickerRevealName} numberOfLines={2}>
                                        {s.name}
                                    </Text>
                                    <Text style={styles.stickerRevealGroup}>GRUPO {s.group}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={localStyles.saveBtn}
                            onPress={handleSaveToAlbum}
                        >
                            <Text style={localStyles.saveBtnText}>GUARDAR NO ÁLBUM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// ─── Estilos locais complementares ───────────────────────────────────────────

const localStyles = StyleSheet.create({
    packsIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.07)',
        marginTop: -6,
    },
    packsIndicatorText: {
        color: '#8CA185',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.88)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '88%',
        backgroundColor: '#0A1C13',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1E3C2A',
    },
    modalTitle: {
        color: '#FACC15',
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 20,
        letterSpacing: 1,
    },
    saveBtn: {
        width: '100%',
        backgroundColor: '#FACC15',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    saveBtnText: {
        color: '#05110B',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    },
});
