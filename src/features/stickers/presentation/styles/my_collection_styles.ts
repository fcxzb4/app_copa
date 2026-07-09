import { StyleSheet } from 'react-native';

export const myCollectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05110B',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  scrollContent: {
    paddingBottom: 100, // Safe scrolling space above floating nav bar
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
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A1C13',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#133021',
    paddingHorizontal: 16,
    marginBottom: 20,
    height: 52,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  clearButton: {
    padding: 6,
  },
  clearText: {
    color: '#8CA185',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Filter Pills
  filterPillsBar: {
    marginBottom: 20,
  },
  filterPillsContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  pillButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#133021',
    backgroundColor: '#0A1C13',
    minWidth: 80,
    alignItems: 'center',
  },
  pillButtonActive: {
    backgroundColor: '#FACC15',
    borderColor: '#FACC15',
  },
  pillButtonText: {
    color: '#8CA185',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  pillButtonTextActive: {
    color: '#05110B',
  },

  // Collection categories list
  cardsList: {
    gap: 16,
  },
  card: {
    backgroundColor: '#0A1C13',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#133021',
    flexDirection: 'row',
    padding: 14,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  
  // Left border colored accent strip
  cardLeftAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  
  // Thumbnail block
  thumbnailContainer: {
    width: 68,
    height: 68,
    borderRadius: 12,
    backgroundColor: '#102A1C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#183B27',
    overflow: 'hidden',
  },
  thumbnailEmoji: {
    fontSize: 32,
  },
  thumbnailImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 17, 11, 0.2)',
  },

  // Card Content Section
  cardContent: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  cardCategory: {
    color: '#8CA185',
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  cardFooterLabel: {
    color: '#8CA185',
    fontSize: 8,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  
  // Progress Bar
  cardProgressBarContainer: {
    height: 6,
    backgroundColor: '#12281D',
    borderRadius: 3,
    width: '90%',
    overflow: 'hidden',
  },
  cardProgressBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Right Side Section (stats)
  cardRightStats: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 2,
    minWidth: 60,
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '900',
  },
  countText: {
    color: '#8CA185',
    fontSize: 10,
    fontWeight: '800',
  },
  completedBadge: {
    marginVertical: 4,
  },
});
