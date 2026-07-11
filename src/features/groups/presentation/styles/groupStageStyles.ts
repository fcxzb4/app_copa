import { Platform, StyleSheet } from "react-native";

export const groupStageStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#05110B',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  scrollContent: {
    paddingBottom: 100, // Safe padding above bottom floating tab bar
    gap: 24,
  },

  // Sub-header details
  subHeaderLabel: {
    color: '#FACC15', // Gold sub-label
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
    marginBottom: 20,
    letterSpacing: 0.5,
  },

  // Group selectors scroll
  groupScroll: {
    marginBottom: 8,
  },
  groupScrollContent: {
    gap: 10,
    flexDirection: 'row',
  },
  groupPill: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#133021',
    backgroundColor: '#0A1C13',
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupPillActive: {
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderColor: '#4ADE80', // Mint green border
  },
  groupPillText: {
    color: '#8CA185',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  groupPillTextActive: {
    color: '#4ADE80', // Mint green text
  },

  // Tabela Card
  tableCard: {
    backgroundColor: '#0A1C13',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#133021',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  tableCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#102A1C',
  },
  tableCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  
  // Table Columns Headers
  tableRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#102A1C',
  },
  colHeaderLabel: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  colTeam: {
    flex: 3,
  },
  colStatHeader: {
    width: 36,
    textAlign: 'center',
  },

  // Table Body Rows
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 42, 28, 0.3)',
  },
  tableTeamInfo: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  posBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posBadgeQualify: {
    backgroundColor: '#10B981', // Green badge
  },
  posBadgeNormal: {
    backgroundColor: '#475569', // Grey badge
  },
  posBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  teamFlag: {
    fontSize: 18,
  },
  teamNameText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  colStatValue: {
    width: 36,
    textAlign: 'center',
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
  },
  colPtsValue: {
    color: '#FACC15', // Gold pts
    fontWeight: '900',
  },
  sgPositive: {
    color: '#10B981',
  },
  sgNegative: {
    color: '#EF4444',
  },

  // Matches Sections
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  matchesContainer: {
    gap: 12,
  },
  
  // Match Card
  matchCard: {
    backgroundColor: '#0A1C13',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#133021',
    padding: 14,
    gap: 12,
  },
  matchCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#102A1C',
    paddingBottom: 8,
  },
  stadiumText: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusBadge: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  statusBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  matchBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 12,
  },
  matchTeamColumn: {
    flex: 2,
    alignItems: 'center',
    gap: 6,
  },
  matchFlagCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#102A1C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#183B27',
  },
  matchTeamName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  scoreCenter: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: '#FACC15', // Gold score
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 8,
  },
  vsText: {
    color: '#8CA185',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
