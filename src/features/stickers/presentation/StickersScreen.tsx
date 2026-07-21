import React, { useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { teams } from '../../../shared/data/worldCupData';

// ─── Tipos ─────────────────────────────────────────────────────────────────────

interface OpenedSticker {
    id: string;
    name: string;
    flag: string;
    group: string;
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

const TOTAL_PACKS = 5;

// ─── Componente Principal ──────────────────────────────────────────────────────

export default function StickersScreen() {
    const [packsRemaining, setPacksRemaining] = useState(TOTAL_PACKS);
    const [isOpening, setIsOpening] = useState(false);
    const [revealedStickers, setRevealedStickers] = useState<OpenedSticker[]>([]);
    const [showReveal, setShowReveal] = useState(false);

    // Animações do card
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    const runOpenAnimation = (onDone: () => void) => {
        Animated.sequence([
            // Shake
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true, easing: Easing.linear }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true, easing: Easing.linear }),
                Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true, easing: Easing.linear }),
                Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true, easing: Easing.linear }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true, easing: Easing.linear }),
            ]),
            // Scale up then down
            Animated.timing(scaleAnim, { toValue: 1.08, duration: 180, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 0.85, duration: 300, useNativeDriver: true }),
            // Glow pulse
            Animated.timing(glowAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.timing(glowAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start(onDone);
    };

    const handleRasg = () => {
        if (packsRemaining <= 0 || isOpening) return;
        setIsOpening(true);

        runOpenAnimation(() => {
            // Pick 3 random stickers
            const shuffled = [...teams].sort(() => Math.random() - 0.5);
            const picked: OpenedSticker[] = shuffled.slice(0, 3).map((t) => ({
                id: `${t.id}-${Math.floor(Math.random() * 20) + 1}`,
                name: starPlayers[t.id] ?? `Jogador ${t.id}`,
                flag: t.flag,
                group: t.group,
            }));

            setRevealedStickers(picked);
            setPacksRemaining((prev) => prev - 1);
            setIsOpening(false);
            setShowReveal(true);
        });
    };

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
    });

    return (
        <View style={styles.screen}>

            {/* ── Card do Pacote ── */}
            <Animated.View
                style={[
                    styles.cardWrapper,
                    {
                        transform: [
                            { translateX: shakeAnim },
                            { scale: scaleAnim },
                        ],
                    },
                ]}
            >
                <LinearGradient
                    colors={['#2E7D32', '#8BC34A', '#CDDC39', '#C6A21A']}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 0.9, y: 1 }}
                    style={styles.card}
                >
                    {/* Glow overlay on open */}
                    <Animated.View
                        pointerEvents="none"
                        style={[styles.glowOverlay, { opacity: glowOpacity }]}
                    />

                    {/* Premium badge */}
                    <View style={styles.premiumBadge}>
                        <Text style={styles.premiumText}>PREMIUM EDITION</Text>
                    </View>

                    {/* Shield icon */}
                    <View style={styles.shieldContainer}>
                        <View style={styles.shieldGlass}>
                            <Ionicons name="shield" size={44} color="#FACC15" />
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={styles.cardTitle}>POPULAR{'\n'}DA COPA</Text>

                    {/* Dots */}
                    <View style={styles.dotsRow}>
                        <View style={[styles.dot, styles.dotActive]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </LinearGradient>
            </Animated.View>

            {/* ── Botão Rasgar ── */}
            <TouchableOpacity
                style={[styles.rasgarBtn, (packsRemaining === 0 || isOpening) && styles.rasgarBtnDisabled]}
                onPress={handleRasg}
                disabled={packsRemaining === 0 || isOpening}
                activeOpacity={0.85}
            >
                <Text style={styles.rasgarBtnText}>
                    {isOpening ? 'RASGANDO...' : 'RASGAR PACOTE'}
                </Text>
            </TouchableOpacity>

            {/* ── Pacotes restantes ── */}
            <View style={styles.packsRow}>
                <Ionicons name="checkmark-circle" size={14} color="#8CA185" />
                <Text style={styles.packsText}>
                    {packsRemaining === 0
                        ? 'SEM PACOTES RESTANTES'
                        : `VOCÊ TEM ${packsRemaining} PACOTE${packsRemaining !== 1 ? 'S' : ''}`}
                </Text>
            </View>

            {/* ── Modal de Revelação ── */}
            <Modal visible={showReveal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>✨ NOVAS FIGURINHAS! ✨</Text>

                        <View style={styles.stickersRow}>
                            {revealedStickers.map((s) => (
                                <View key={s.id} style={styles.stickerCard}>
                                    <Text style={styles.stickerFlag}>{s.flag}</Text>
                                    <Text style={styles.stickerName} numberOfLines={2}>{s.name}</Text>
                                    <Text style={styles.stickerGroup}>GRUPO {s.group}</Text>
                                    <Text style={styles.stickerId}>{s.id}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={() => setShowReveal(false)}
                        >
                            <Text style={styles.saveBtnText}>GUARDAR NO ÁLBUM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#07110C',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },

    // ── Card ──
    cardWrapper: {
        width: 220,
        height: 320,
        borderRadius: 22,
        shadowColor: '#4ADE80',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 16,
        marginBottom: 40,
    },
    card: {
        flex: 1,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 24,
        paddingHorizontal: 20,
        overflow: 'hidden',
    },
    glowOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FACC15',
        borderRadius: 22,
    },

    // Premium badge
    premiumBadge: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    premiumText: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 1.5,
    },

    // Shield
    shieldContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shieldGlass: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Card title
    cardTitle: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 1,
        lineHeight: 30,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },

    // Dots
    dotsRow: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.35)',
    },
    dotActive: {
        backgroundColor: '#FFFFFF',
        width: 9,
        height: 9,
    },

    // ── Botão Rasgar ──
    rasgarBtn: {
        width: '100%',
        backgroundColor: '#FACC15',
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#FACC15',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.45,
        shadowRadius: 12,
        elevation: 8,
        marginBottom: 14,
    },
    rasgarBtnDisabled: {
        backgroundColor: '#2A3A2F',
        shadowOpacity: 0,
        elevation: 0,
    },
    rasgarBtnText: {
        color: '#05110B',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1.5,
    },

    // ── Pacotes restantes ──
    packsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    packsText: {
        color: '#8CA185',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.8,
    },

    // ── Modal ──
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
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
    stickersRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    stickerCard: {
        flex: 1,
        backgroundColor: '#102A1C',
        borderRadius: 14,
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#1E4A2D',
        minHeight: 110,
        justifyContent: 'center',
    },
    stickerFlag: {
        fontSize: 28,
        marginBottom: 4,
    },
    stickerName: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
    },
    stickerGroup: {
        color: '#4ADE80',
        fontSize: 8,
        fontWeight: '600',
    },
    stickerId: {
        color: '#8CA185',
        fontSize: 7,
        marginTop: 2,
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
