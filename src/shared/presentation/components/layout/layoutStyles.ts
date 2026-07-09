import { Platform, StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#05110B',
  },
  header: {
    backgroundColor: '#030A06',
    borderBottomWidth: 1,
    borderBottomColor: '#102A1C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
        zIndex: 50,
      },
    }),
  },
  headerContent: {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hamburgerButton: {
    padding: 8,
  },
  hamburgerText: {
    color: '#8CA185',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#4ADE80', // Minty/green logo
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0E291B',
    borderWidth: 1.5,
    borderColor: '#4ADE80',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 16,
  },
  
  // Body scroll and container
  scrollView: {
    flex: 1,
    backgroundColor: '#05110B',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    maxWidth: 600,
    width: '100%',
    flex: 1,
    paddingBottom: 80, // Keep space for the floating bottom navigation bar
  },

  // Bottom Navigation Bar (1-to-1 design)
  bottomNav: {
    height: 68,
    backgroundColor: '#030A06',
    borderTopWidth: 1,
    borderTopColor: '#102A1C',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: Platform.OS === 'ios' ? 12 : 4,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    cursor: 'pointer',
  },
  navIcon: {
    fontSize: 18,
    color: '#8CA185',
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#8CA185',
    textTransform: 'uppercase',
  },
  
  // Active state - capsule shape (like "HOME" tab in the screenshot)
  activeTabCapsule: {
    backgroundColor: '#FACC15', // Yellow background
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 76,
  },
  activeNavIcon: {
    fontSize: 16,
    color: '#05110B', // Black/dark green text/icon inside yellow pill
  },
  activeNavLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#05110B',
    textTransform: 'uppercase',
  },

  // Footer (simple and premium)
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#102A1C',
    marginTop: 20,
    marginBottom: 80,
  },
  footerText: {
    color: '#344E41',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
});
