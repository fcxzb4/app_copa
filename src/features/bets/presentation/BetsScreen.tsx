import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useBetDatabase } from '../data/useBetDatabase';
import { useStickerDatabase } from '../../stickers/data/useStickerDatabase';
import { BetPrediction } from '../domain/entities/Bet';
import { matches, teams } from '../../../shared/data/worldCupData';
import { betsStyles as styles } from './styles/betsStyles';
import { useFocusEffect } from 'expo-router';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTeam(teamId: string) {
  return teams.find((t) => t.id === teamId);
}

function formatDate(dateStr: string): string {
  try {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  } catch {
    return dateStr;
  }
}

function isToday(dateStr: string): boolean {
  try {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  } catch {
    return false;
  }
}

function predictionLabel(prediction: BetPrediction, homeTeamName: string, awayTeamName: string): string {
  if (prediction === 'home_win') return `${homeTeamName} vence`;
  if (prediction === 'away_win') return `${awayTeamName} vence`;
  return 'Empate';
}

function predictionEmoji(prediction: BetPrediction): string {
  if (prediction === 'home_win') return '🏠';
  if (prediction === 'away_win') return '✈️';
  return '🤝';
}

// ─── Sub-componente: Card de Aposta (jogo disponível) ─────────────────────────

interface MatchBetCardProps {
  matchId: string;
  homeTeamId: string;
  awayTeamId: string;
  dateStr: string;
  timeStr: string;
  stadium: string;
  packsAvailable: number;
  onConfirm: (matchId: string, prediction: BetPrediction, packs: number) => void;
}

function MatchBetCard({
  matchId,
  homeTeamId,
  awayTeamId,
  dateStr,
  timeStr,
  stadium,
  packsAvailable,
  onConfirm,
}: MatchBetCardProps) {
  const homeTeam = getTeam(homeTeamId);
  const awayTeam = getTeam(awayTeamId);
  const [selectedPrediction, setSelectedPrediction] = useState<BetPrediction | null>(null);
  const [packsAmount, setPacksAmount] = useState(1);
  const [confirming, setConfirming] = useState(false);

  const today = isToday(dateStr);

  const handleDecrease = () => setPacksAmount((v) => Math.max(1, v - 1));
  const handleIncrease = () =>
    setPacksAmount((v) => Math.min(packsAvailable, v + 1));

  const handleConfirm = async () => {
    if (!selectedPrediction) return;
    setConfirming(true);
    try {
      await onConfirm(matchId, selectedPrediction, packsAmount);
    } finally {
      setConfirming(false);
    }
  };

  const canConfirm = selectedPrediction !== null && packsAvailable > 0 && !confirming;

  return (
    <View style={styles.matchCard}>
      {/* Header do card */}
      <View style={styles.matchCardHeader}>
        <View style={styles.matchDateBadge}>
          <Ionicons name="calendar-outline" size={11} color="#8CA185" />
          <Text style={styles.matchDateText}>
            {today ? 'Hoje' : formatDate(dateStr)} · {timeStr}
          </Text>
          {today && (
            <View style={styles.todayBadge}>
              <Text style={styles.todayText}>Hoje</Text>
            </View>
          )}
        </View>
        <Text style={styles.stadiumText}>{stadium}</Text>
      </View>

      {/* Times */}
      <View style={styles.matchBody}>
        <View style={styles.matchTeamColumn}>
          <View style={styles.matchFlagCircle}>
            <Text style={styles.matchTeamFlag}>{homeTeam?.flag ?? '🏳️'}</Text>
          </View>
          <Text style={styles.matchTeamName}>{homeTeam?.name ?? homeTeamId}</Text>
        </View>

        <View style={styles.vsCenter}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <View style={styles.matchTeamColumn}>
          <View style={styles.matchFlagCircle}>
            <Text style={styles.matchTeamFlag}>{awayTeam?.flag ?? '🏳️'}</Text>
          </View>
          <Text style={styles.matchTeamName}>{awayTeam?.name ?? awayTeamId}</Text>
        </View>
      </View>

      {/* Seletor de resultado */}
      <View style={{ gap: 8 }}>
        <Text style={styles.predictionLabel}>Seu Palpite</Text>
        <View style={styles.predictionRow}>
          {/* Casa */}
          <TouchableOpacity
            style={[
              styles.predictionBtn,
              selectedPrediction === 'home_win' && styles.predictionBtnActive,
            ]}
            onPress={() => setSelectedPrediction('home_win')}
            activeOpacity={0.7}
          >
            <Text style={styles.predictionBtnEmoji}>{homeTeam?.flag ?? '🏠'}</Text>
            <Text
              style={[
                styles.predictionBtnText,
                selectedPrediction === 'home_win' && styles.predictionBtnTextActive,
              ]}
            >
              Casa
            </Text>
          </TouchableOpacity>

          {/* Empate */}
          <TouchableOpacity
            style={[
              styles.predictionBtn,
              selectedPrediction === 'draw' && styles.predictionBtnActive,
            ]}
            onPress={() => setSelectedPrediction('draw')}
            activeOpacity={0.7}
          >
            <Text style={styles.predictionBtnEmoji}>🤝</Text>
            <Text
              style={[
                styles.predictionBtnText,
                selectedPrediction === 'draw' && styles.predictionBtnTextActive,
              ]}
            >
              Empate
            </Text>
          </TouchableOpacity>

          {/* Fora */}
          <TouchableOpacity
            style={[
              styles.predictionBtn,
              selectedPrediction === 'away_win' && styles.predictionBtnActive,
            ]}
            onPress={() => setSelectedPrediction('away_win')}
            activeOpacity={0.7}
          >
            <Text style={styles.predictionBtnEmoji}>{awayTeam?.flag ?? '✈️'}</Text>
            <Text
              style={[
                styles.predictionBtnText,
                selectedPrediction === 'away_win' && styles.predictionBtnTextActive,
              ]}
            >
              Fora
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contador de pacotes */}
      <View style={styles.packsRow}>
        <Text style={styles.packsRowLabel}>🎴 Pacotes a Apostar</Text>
        <View style={styles.packsCounter}>
          <TouchableOpacity
            style={styles.packsCounterBtn}
            onPress={handleDecrease}
            activeOpacity={0.7}
          >
            <Text style={styles.packsCounterBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.packsCounterValue}>{packsAmount}</Text>
          <TouchableOpacity
            style={styles.packsCounterBtn}
            onPress={handleIncrease}
            activeOpacity={0.7}
          >
            <Text style={styles.packsCounterBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão Confirmar */}
      <TouchableOpacity
        style={[styles.confirmBtn, !canConfirm && styles.confirmBtnDisabled]}
        onPress={handleConfirm}
        disabled={!canConfirm}
        activeOpacity={0.8}
      >
        {confirming ? (
          <ActivityIndicator size="small" color="#05110B" />
        ) : (
          <>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color={canConfirm ? '#05110B' : '#475569'}
            />
            <Text
              style={[
                styles.confirmBtnText,
                !canConfirm && styles.confirmBtnTextDisabled,
              ]}
            >
              {packsAvailable === 0
                ? 'Sem pacotes'
                : selectedPrediction === null
                ? 'Escolha um resultado'
                : `Apostar ${packsAmount} pacote${packsAmount > 1 ? 's' : ''}`}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

// ─── Sub-componente: Card de Histórico ───────────────────────────────────────

interface HistoryBetCardProps {
  matchId: string;
  prediction: BetPrediction;
  packsWagered: number;
  status: 'open' | 'won' | 'lost';
  createdAt: string;
}

function HistoryBetCard({
  matchId,
  prediction,
  packsWagered,
  status,
  createdAt,
}: HistoryBetCardProps) {
  const match = matches.find((m) => m.id === matchId);
  const homeTeam = match ? getTeam(match.homeTeamId) : null;
  const awayTeam = match ? getTeam(match.awayTeamId) : null;

  const statusConfig = {
    open: {
      chip: styles.statusChipOpen,
      text: styles.statusChipTextOpen,
      label: 'Em Aberto',
      icon: '⏳' as string,
    },
    won: {
      chip: styles.statusChipWon,
      text: styles.statusChipTextWon,
      label: 'Ganhou',
      icon: '🏆' as string,
    },
    lost: {
      chip: styles.statusChipLost,
      text: styles.statusChipTextLost,
      label: 'Vencido',
      icon: '❌' as string,
    },
  }[status];

  const matchLabel = homeTeam && awayTeam
    ? `${homeTeam.flag} ${homeTeam.name} vs ${awayTeam.name} ${awayTeam.flag}`
    : matchId;

  const predLabel = homeTeam && awayTeam
    ? predictionLabel(prediction, homeTeam.name, awayTeam.name)
    : prediction;

  const packsResult =
    status === 'won'
      ? `+${packsWagered * 2} pacotes`
      : status === 'lost'
      ? `-${packsWagered} pacote${packsWagered > 1 ? 's' : ''}`
      : `${packsWagered} pacote${packsWagered > 1 ? 's' : ''} apostado${packsWagered > 1 ? 's' : ''}`;

  return (
    <View style={styles.doneCard}>
      <View style={styles.doneBadgeArea}>
        <Text style={styles.doneBadgeIcon}>{statusConfig.icon}</Text>
      </View>

      <View style={styles.doneInfo}>
        <Text style={styles.doneTitle} numberOfLines={1}>
          {matchLabel}
        </Text>
        <View style={styles.predChip}>
          <Text style={styles.predChipText}>
            {predictionEmoji(prediction)} {predLabel}
          </Text>
        </View>
      </View>

      <View style={styles.doneRight}>
        <View style={[styles.statusChip, statusConfig.chip]}>
          <Text style={[styles.statusChipText, statusConfig.text]}>
            {statusConfig.label}
          </Text>
        </View>
        <Text style={[styles.donePacksText, status === 'won' && styles.donePacksTextWon]}>
          {packsResult}
        </Text>
      </View>
    </View>
  );
}

// ─── Tela Principal ───────────────────────────────────────────────────────────

export default function BetsScreen() {
  const {
    bets,
    isLoading,
    createBet,
    hasBetForMatch,
    refresh,
  } = useBetDatabase();

  const { packsRemaining, refresh: refreshPacks } = useStickerDatabase();

  // Sincroniza saldo de pacotes sempre que a tela entrar em foco
  useFocusEffect(
    useCallback(() => {
      refresh();
      refreshPacks();
    }, [refresh, refreshPacks])
  );

  // Filtra apenas partidas futuras sem palpite registrado
  const upcomingMatches = matches.filter(
    (m) => m.status === 'upcoming' && !hasBetForMatch(m.id)
  );

  const handleConfirmBet = useCallback(
    async (matchId: string, prediction: BetPrediction, packs: number) => {
      try {
        await createBet({ match_id: matchId, prediction, packs_wagered: packs });
        await refreshPacks();
        Alert.alert(
          '🎴 Palpite Registrado!',
          `Você apostou ${packs} pacote${packs > 1 ? 's' : ''} de figurinha. Boa sorte!`,
          [{ text: 'OK', style: 'default' }]
        );
      } catch (err: any) {
        Alert.alert('Erro', err?.message ?? 'Não foi possível registrar o palpite.', [
          { text: 'OK' },
        ]);
      }
    },
    [createBet, refreshPacks]
  );

  if (isLoading) {
    return (
      <View style={[styles.screen, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4ADE80" />
        <Text style={styles.loadingText}>Carregando palpites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header da Tela */}
        <View style={styles.screenHeader}>
          <View>
            <Text style={styles.subHeaderLabel}>Copa do Mundo 2026</Text>
            <Text style={styles.titleText}>Palpites</Text>
          </View>

          {/* Badge de saldo */}
          <View style={styles.packsBadge}>
            <Text style={styles.packsIcon}>🎴</Text>
            <View>
              <Text style={styles.packsBadgeText}>{packsRemaining}</Text>
              <Text style={styles.packsBadgeLabel}>pacotes</Text>
            </View>
          </View>
        </View>

        {/* ── Próximos Jogos ─────────────────────────────────────────────── */}
        <View>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="football-outline" size={15} color="#FACC15" />
              <Text style={styles.sectionTitle}>Próximos Jogos</Text>
            </View>
          </View>

          {packsRemaining === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎴</Text>
              <Text style={styles.emptyTitle}>Sem pacotes disponíveis</Text>
              <Text style={styles.emptySubtitle}>
                Abra mais pacotes de figurinha na aba{'\n'}Figurinhas para poder fazer palpites!
              </Text>
            </View>
          )}

          {packsRemaining > 0 && upcomingMatches.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🏟️</Text>
              <Text style={styles.emptyTitle}>Nenhum jogo disponível</Text>
              <Text style={styles.emptySubtitle}>
                Você já fez palpites em todos os jogos disponíveis.{'\n'}
                Aguarde novos jogos!
              </Text>
            </View>
          )}

          {packsRemaining > 0 && (
            <View style={styles.matchesContainer}>
              {upcomingMatches.slice(0, 6).map((match) => (
                <MatchBetCard
                  key={match.id}
                  matchId={match.id}
                  homeTeamId={match.homeTeamId}
                  awayTeamId={match.awayTeamId}
                  dateStr={match.date}
                  timeStr={match.time}
                  stadium={match.stadium}
                  packsAvailable={packsRemaining}
                  onConfirm={handleConfirmBet}
                />
              ))}
            </View>
          )}
        </View>

        {/* ── Histórico ─────────────────────────────────────────────────── */}
        {bets.length > 0 && (
          <View>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="time-outline" size={15} color="#FACC15" />
                <Text style={styles.sectionTitle}>Histórico</Text>
              </View>
              <TouchableOpacity onPress={refresh} activeOpacity={0.7}>
                <Ionicons name="refresh-outline" size={14} color="#4ADE80" />
              </TouchableOpacity>
            </View>

            <View style={styles.matchesContainer}>
              {bets.map((bet) => (
                <HistoryBetCard
                  key={bet.id}
                  matchId={bet.match_id}
                  prediction={bet.prediction}
                  packsWagered={bet.packs_wagered}
                  status={bet.status}
                  createdAt={bet.created_at}
                />
              ))}
            </View>
          </View>
        )}

        {bets.length === 0 && upcomingMatches.length > 0 && (
          <View>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="time-outline" size={15} color="#FACC15" />
                <Text style={styles.sectionTitle}>Histórico</Text>
              </View>
            </View>
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>Nenhum palpite ainda</Text>
              <Text style={styles.emptySubtitle}>
                Faça seu primeiro palpite nos jogos acima!
              </Text>
            </View>
          </View>
        )}

      </ScrollView>
    </View>
  );
}
