import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05110B',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  scrollContent: {
    paddingBottom: 100, // Safe padding above bottom floating tab bar
    gap: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  // Live Matches Horizontal Scroll
  liveScroll: {
    marginBottom: 8,
  },
  liveScrollContent: {
    gap: 12,
    paddingRight: 16,
  },
  liveCard: {
    width: 250,
    backgroundColor: '#0A1C13',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#133021',
    padding: 16,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  liveCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveCardPhase: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  liveBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  liveTeamsContainer: {
    gap: 12,
  },
  liveTeamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveTeamLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveTeamFlag: {
    fontSize: 20,
  },
  liveTeamCode: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  liveTeamScore: {
    color: '#FACC15', // Gold score
    fontSize: 22,
    fontWeight: '900',
  },

  // Classificação Card
  groupsCard: {
    backgroundColor: '#0A1C13',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#133021',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  groupsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  groupsCardTitle: {
    color: '#4ADE80', // Mint green title
    fontSize: 24,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupsCardSubtitle: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  groupsRowsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  groupsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 42, 28, 0.4)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#102A1C',
  },
  groupsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  groupsRowPos: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '900',
    width: 14,
  },
  groupsRowFlag: {
    fontSize: 18,
  },
  groupsRowName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  groupsRowRight: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  groupsRowPts: {
    color: '#FACC15', // Gold points
    fontSize: 12,
    fontWeight: '800',
  },
  groupsRowSG: {
    fontSize: 11,
    fontWeight: '700',
  },
  sgPositive: {
    color: '#10B981',
  },
  sgNegative: {
    color: '#EF4444',
  },
  viewTableBtn: {
    backgroundColor: '#FACC15',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  viewTableBtnText: {
    color: '#05110B',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },

  // Shortcuts grid
  shortcutsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  shortcutCard: {
    flex: 1,
    backgroundColor: '#0A1C13',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#133021',
    padding: 16,
    justifyContent: 'center',
    gap: 12,
    minHeight: 110,
  },
  shortcutIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#102A1C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#183B27',
  },
  shortcutTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  shortcutSubtitle: {
    color: '#8CA185',
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
