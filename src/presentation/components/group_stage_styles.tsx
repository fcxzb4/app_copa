import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    heroSection: {
        marginBottom: 24,
        borderLeftWidth: 4,
        borderLeftColor: '#FFD700',
        paddingLeft: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#94A3B8',
        marginTop: 6,
        lineHeight: 20,
    },
    tabsWrapper: {
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#1E293B',
        paddingBottom: 8,
    },
    tabsBar: {
        flexDirection: 'row',
        gap: 12,
    },
    tabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111827',
        borderWidth: 1,
        borderColor: '#1E293B',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        cursor: 'pointer',
        ...Platform.select({
            web: {
                transitionProperty: 'all',
                transitionDuration: '0.15s',
            },
        }) as any,
    },
    tabButtonActive: {
        backgroundColor: '#FFD700',
        borderColor: '#FFD700',
    },
    tabButtonIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    tabButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94A3B8',
    },
    tabButtonTextActive: {
        color: '#0A0E1A',
    },
    tabContent: {
        flex: 1,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    groupCard: {
        backgroundColor: '#111827',
        borderWidth: 1,
        borderColor: '#1E293B',
        borderRadius: 16,
        padding: 16,
        minWidth: 260,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '22%',
        ...Platform.select({
            web: {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            },
        }) as any,
    },
    groupHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#2D3748',
        paddingBottom: 10,
        marginBottom: 12,
    },
    groupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700',
        letterSpacing: 1,
    },
    groupTeamsList: {
        gap: 8,
    },
    groupTeamItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2D3748',
    },
    groupTeamIndex: {
        color: '#64748B',
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 12,
        width: 14,
    },
    groupTeamFlag: {
        fontSize: 20,
        marginRight: 8,
    },
    groupTeamName: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
        flex: 1,
    },
    groupTeamConfed: {
        fontSize: 10,
        color: '#64748B',
        backgroundColor: '#0F172A',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        fontWeight: '700',
    },
    tablesContainer: {
        gap: 24,
    },
    tableCard: {
        backgroundColor: '#111827',
        borderWidth: 1,
        borderColor: '#1E293B',
        borderRadius: 16,
        padding: 16,
        ...Platform.select({
            web: {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            },
        }) as any,
    },
    tableGroupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 12,
    },
    tableRowHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#2D3748',
        paddingBottom: 8,
        marginBottom: 8,
    },
    tableCol: {
        color: '#64748B',
        fontWeight: '700',
        fontSize: 12,
    },
    colTeamHeader: {
        flex: 3,
    },
    colNumberHeader: {
        width: 38,
        textAlign: 'center',
    },
    colPts: {
        color: '#FFD700',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1E293B',
    },
    colTeam: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    posBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    posText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    posQualified: {
        backgroundColor: '#10B981', // green for top 2
    },
    posPlayoff: {
        backgroundColor: '#D4AF37', // gold/yellow for 3rd
    },
    posGeneral: {
        backgroundColor: '#475569', // grey for 4th
    },
    teamFlag: {
        fontSize: 20,
    },
    teamName: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    colNumber: {
        width: 38,
        textAlign: 'center',
        color: '#E2E8F0',
        fontSize: 13,
    },
    boldText: {
        fontWeight: 'bold',
    },
    positiveSG: {
        color: '#10B981',
        fontWeight: '600',
    },
    negativeSG: {
        color: '#EF4444',
        fontWeight: '600',
    },
    legendRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginTop: 12,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        color: '#64748B',
        fontSize: 11,
    },
    matchesList: {
        gap: 16,
    },
    matchCard: {
        backgroundColor: '#111827',
        borderWidth: 1,
        borderColor: '#1E293B',
        borderRadius: 16,
        padding: 16,
        ...Platform.select({
            web: {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            },
        }) as any,
    },
    matchCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#1E293B',
        paddingBottom: 10,
        marginBottom: 16,
    },
    matchGroupBadge: {
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderWidth: 1,
        borderColor: '#FFD700',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 8,
    },
    matchGroupBadgeText: {
        color: '#FFD700',
        fontSize: 10,
        fontWeight: 'bold',
    },
    matchDateInfo: {
        color: '#64748B',
        fontSize: 12,
        fontWeight: '600',
    },
    matchBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
        gap: 8,
    },
    matchTeam: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    teamAlignRight: {
        justifyContent: 'flex-end',
    },
    teamAlignLeft: {
        justifyContent: 'flex-start',
    },
    matchTeamName: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    matchFlag: {
        fontSize: 24,
    },
    winnerBold: {
        color: '#FFD700', // Highlight winner name
        fontWeight: 'bold',
    },
    scoreContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F172A',
        borderWidth: 1,
        borderColor: '#1E293B',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        gap: 8,
    },
    scoreValue: {
        color: '#94A3B8',
        fontSize: 18,
        fontWeight: 'bold',
        width: 20,
        textAlign: 'center',
    },
    winnerScore: {
        color: '#FFD700', // Highlight winner score
    },
    scoreDivider: {
        color: '#64748B',
        fontWeight: 'bold',
    },
    vsContainer: {
        backgroundColor: '#1E293B',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#2D3748',
    },
    vsText: {
        color: '#00E676',
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 1,
    },
    matchFooter: {
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
        paddingTop: 10,
        marginTop: 16,
        alignItems: 'center',
    },
    stadiumText: {
        color: '#64748B',
        fontSize: 11,
        fontWeight: '600',
    },
    tableHeaderZone: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 64,
        backgroundColor: '#151E33',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#22335C',
        marginTop: 16,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
        opacity: 0.5,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
