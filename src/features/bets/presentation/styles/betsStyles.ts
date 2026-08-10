import { StyleSheet } from 'react-native';

export const betsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#05110B',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  scrollContent: {
    paddingBottom: 100,
    gap: 24,
  },

  // ── Header da Tela ────────────────────────────────────────────────────────
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  subHeaderLabel: {
    color: '#FACC15',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Badge de pacotes disponíveis
  packsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0A1C13',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#133021',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  packsIcon: {
    fontSize: 16,
  },
  packsBadgeText: {
    color: '#4ADE80',
    fontSize: 13,
    fontWeight: '800',
  },
  packsBadgeLabel: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // ── Seção ─────────────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  seeAllText: {
    color: '#4ADE80',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  matchesContainer: {
    gap: 12,
  },

  // ── Card de Partida para Palpite ──────────────────────────────────────────
  matchCard: {
    backgroundColor: '#0A1C13',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#133021',
    padding: 14,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  matchCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#102A1C',
    paddingBottom: 10,
  },
  matchDateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchDateText: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  todayBadge: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: '#4ADE80',
  },
  todayText: {
    color: '#4ADE80',
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  stadiumText: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '600',
  },

  // Times dentro do card
  matchBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 8,
  },
  matchTeamColumn: {
    flex: 2,
    alignItems: 'center',
    gap: 6,
  },
  matchFlagCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#102A1C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#183B27',
  },
  matchTeamFlag: {
    fontSize: 22,
  },
  matchTeamName: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  vsCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    color: '#8CA185',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
  },

  // ── Seletor de Resultado ──────────────────────────────────────────────────
  predictionLabel: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  predictionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  predictionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#133021',
    backgroundColor: '#06160E',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  predictionBtnActive: {
    borderColor: '#FACC15',
    backgroundColor: 'rgba(250, 204, 21, 0.12)',
  },
  predictionBtnText: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  predictionBtnTextActive: {
    color: '#FACC15',
  },
  predictionBtnEmoji: {
    fontSize: 14,
  },

  // ── Contador de Pacotes ───────────────────────────────────────────────────
  packsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#06160E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#133021',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  packsRowLabel: {
    color: '#8CA185',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  packsCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  packsCounterBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0E291B',
    borderWidth: 1,
    borderColor: '#133021',
    alignItems: 'center',
    justifyContent: 'center',
  },
  packsCounterBtnText: {
    color: '#4ADE80',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 22,
  },
  packsCounterValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    minWidth: 28,
    textAlign: 'center',
  },

  // ── Botão Confirmar ───────────────────────────────────────────────────────
  confirmBtn: {
    backgroundColor: '#FACC15',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  confirmBtnDisabled: {
    backgroundColor: '#1A2E1F',
    borderWidth: 1,
    borderColor: '#133021',
  },
  confirmBtnText: {
    color: '#05110B',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  confirmBtnTextDisabled: {
    color: '#475569',
  },

  // ── Card de Palpite já realizado ──────────────────────────────────────────
  doneCard: {
    backgroundColor: '#0A1C13',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#133021',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  doneBadgeArea: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#06160E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#133021',
  },
  doneBadgeIcon: {
    fontSize: 20,
  },
  doneInfo: {
    flex: 1,
    gap: 3,
  },
  doneTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  doneSubtitle: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '600',
  },
  doneRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusChip: {
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  statusChipOpen: {
    backgroundColor: 'rgba(250, 204, 21, 0.15)',
    borderWidth: 1,
    borderColor: '#FACC15',
  },
  statusChipWon: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    borderWidth: 1,
    borderColor: '#4ADE80',
  },
  statusChipLost: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  statusChipText: {
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  statusChipTextOpen: { color: '#FACC15' },
  statusChipTextWon: { color: '#4ADE80' },
  statusChipTextLost: { color: '#EF4444' },
  donePacksText: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '700',
  },
  donePacksTextWon: {
    color: '#4ADE80',
  },

  // ── Estado Vazio ──────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 10,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#8CA185',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },

  // ── Divisor ───────────────────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: '#102A1C',
    marginVertical: 4,
  },

  // ── Loading ───────────────────────────────────────────────────────────────
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    color: '#8CA185',
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Chip de predição no histórico ─────────────────────────────────────────
  predChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(139, 161, 133, 0.1)',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  predChipText: {
    color: '#8CA185',
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
