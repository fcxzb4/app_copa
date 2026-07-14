import { Platform, StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
    // ── Common ───────────────────────────────────────────────────────────────
    screen: {
        flex: 1,
        backgroundColor: '#05110B',
    },

    // ── Profile Screen ────────────────────────────────────────────────────────
    profileContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#0E291B',
        borderWidth: 3,
        borderColor: '#4ADE80',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            web: {
                boxShadow: '0 0 24px rgba(74, 222, 128, 0.3)',
            },
        }) as any,
    },
    avatarText: {
        fontSize: 48,
    },
    avatarEditBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FACC15',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#05110B',
    },
    usernameText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#F1F5F0',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    emailText: {
        fontSize: 13,
        color: '#8CA185',
        marginBottom: 12,
    },
    joinedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0E291B',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 12,
        gap: 4,
    },
    joinedText: {
        fontSize: 11,
        color: '#4ADE80',
        fontWeight: '600',
    },

    // Stats section
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 28,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#0A1E11',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#102A1C',
        paddingVertical: 20,
        paddingHorizontal: 12,
        alignItems: 'center',
        gap: 6,
    },
    statValue: {
        fontSize: 32,
        fontWeight: '900',
        color: '#4ADE80',
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#8CA185',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center',
    },

    // Collection button
    collectionBtn: {
        backgroundColor: '#4ADE80',
        borderRadius: 14,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 16,
        ...Platform.select({
            web: {
                boxShadow: '0 4px 16px rgba(74, 222, 128, 0.25)',
            },
        }) as any,
    },
    collectionBtnText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#05110B',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // Settings card
    settingsCard: {
        backgroundColor: '#0A1E11',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#102A1C',
        overflow: 'hidden',
        marginBottom: 24,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 12,
    },
    settingsItemBorder: {
        borderTopWidth: 1,
        borderTopColor: '#102A1C',
    },
    settingsIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#0E291B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#D4E8D0',
    },
    settingsLabelDanger: {
        color: '#F87171',
    },

    // Guest mode (not logged in)
    guestContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 32,
    },
    guestHeader: {
        alignItems: 'center',
        marginBottom: 36,
    },
    guestAvatarCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: '#0A1E11',
        borderWidth: 2,
        borderColor: '#1E4A2D',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    guestTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#F1F5F0',
        marginBottom: 6,
    },
    guestSubtitle: {
        fontSize: 13,
        color: '#8CA185',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 16,
    },
    authOptionsCard: {
        backgroundColor: '#0A1E11',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#102A1C',
        overflow: 'hidden',
        marginBottom: 20,
    },
    authOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 16,
        gap: 14,
    },
    authOptionBorder: {
        borderTopWidth: 1,
        borderTopColor: '#102A1C',
    },
    authOptionIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authOptionTextGroup: {
        flex: 1,
    },
    authOptionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F1F5F0',
        marginBottom: 2,
    },
    authOptionSubtitle: {
        fontSize: 12,
        color: '#8CA185',
    },

    // ── Login / Register ──────────────────────────────────────────────────────
    formScreen: {
        flex: 1,
        backgroundColor: '#05110B',
    },
    formScrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
        maxWidth: 480,
        width: '100%',
        alignSelf: 'center',
    },
    formLogoArea: {
        alignItems: 'center',
        marginBottom: 36,
    },
    formLogoBadge: {
        width: 72,
        height: 72,
        borderRadius: 20,
        backgroundColor: '#0E291B',
        borderWidth: 2,
        borderColor: '#4ADE80',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        ...Platform.select({
            web: {
                boxShadow: '0 0 24px rgba(74, 222, 128, 0.2)',
            },
        }) as any,
    },
    formLogoEmoji: {
        fontSize: 36,
    },
    formTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#F1F5F0',
        marginBottom: 4,
        textAlign: 'center',
    },
    formSubtitle: {
        fontSize: 14,
        color: '#8CA185',
        textAlign: 'center',
        lineHeight: 20,
    },

    // Inputs
    inputGroup: {
        gap: 12,
        marginBottom: 24,
    },
    inputWrapper: {
        backgroundColor: '#0A1E11',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#1E4A2D',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        height: 52,
        gap: 10,
    },
    inputWrapperFocused: {
        borderColor: '#4ADE80',
    },
    inputWrapperError: {
        borderColor: '#F87171',
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#F1F5F0',
        ...Platform.select({
            web: { outlineStyle: 'none' as any },
        }) as any,
    },

    // Submit button
    submitBtn: {
        backgroundColor: '#4ADE80',
        borderRadius: 14,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        ...Platform.select({
            web: {
                boxShadow: '0 4px 16px rgba(74, 222, 128, 0.25)',
                cursor: 'pointer',
            },
        }) as any,
    },
    submitBtnDisabled: {
        opacity: 0.5,
    },
    submitBtnText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#05110B',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },

    // Error
    errorBox: {
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(248, 113, 113, 0.3)',
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    errorText: {
        flex: 1,
        fontSize: 13,
        color: '#F87171',
        fontWeight: '500',
    },

    // Footer link
    formFooterRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    formFooterText: {
        fontSize: 13,
        color: '#8CA185',
    },
    formFooterLink: {
        fontSize: 13,
        fontWeight: '700',
        color: '#4ADE80',
    },

    // Back button
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 8,
        marginBottom: 24,
    },
    backButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8CA185',
    },
});
