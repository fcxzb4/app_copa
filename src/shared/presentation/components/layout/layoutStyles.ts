import { Platform, StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0A0E1A',
    },
    header: {
        backgroundColor: '#111827',
        borderBottomWidth: 1,
        borderBottomColor: '#2D3748',
        paddingVertical: 16,
        paddingHorizontal: 20,
        ...Platform.select({
            web: {
                position: 'sticky' as any,
                top: 0,
                zIndex: 50,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            },
        }),
    },
    headerContent: {
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
    },
    brand: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    trophy: {
        fontSize: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFD700',
        letterSpacing: 1.5,
    },
    subtitle: {
        fontSize: 10,
        color: '#00E676',
        fontWeight: '600',
        letterSpacing: 2,
        marginTop: 2,
    },
    navBar: {
        flexDirection: 'row',
        gap: 8,
    },
    navItem: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94A3B8',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        overflow: 'hidden',
        textAlign: 'center',
        cursor: 'pointer',
        ...Platform.select({
            web: {
                transitionProperty: 'all',
                transitionDuration: '0.2s',
                transitionTimingFunction: 'ease-in-out',
            },
        }) as any,
    },
    navItemActive: {
        color: '#0A0E1A',
        backgroundColor: '#FFD700',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#0A0E1A',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
    },
    container: {
        maxWidth: 1200,
        width: '100%',
        padding: 20,
        flex: 1,
    },
    footer: {
        width: '100%',
        maxWidth: 1200,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
        marginTop: 'auto',
    },
    footerText: {
        color: '#475569',
        fontSize: 12,
        textAlign: 'center',
    },
});
