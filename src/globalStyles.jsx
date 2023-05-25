import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0C0C0D',
  },
  innerContainer: {
    padding: 16,
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
  },
  headerWrap: {
    marginBottom: 32,
    marginTop: 48,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 20,
    width: 20,
  },
  ticketcoinText: {
    color: 'white',
    fontFamily: 'NexaBold',
    paddingLeft: 8,
  },
  floatingContainer: {
    position: 'absolute',
    width: 160,
    bottom: 120,
    right: 16,
  },
  footerContainer: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    right: 0,
    left: 0,
  },
  categoryContainer: {
    flexDirection: 'row',
    flex: 1,
    rowGap: 8,
  },
  selectedCategoryText: {
    color: 'white',
    fontFamily: 'NexaBold',
    fontSize: 14,
    marginRight: 12,
  },
  unselectedCategoryText: {
    color: '#999999',
    fontFamily: 'NexaLight',
    fontSize: 14,
    marginRight: 12,
  },
  categoryRow: {
    marginBottom: 12,
  },
  searchBarRow: {
    marginBottom: 16,
  },
  textMediumBold: {
    color: 'white',
    fontFamily: 'NexaBold',
    fontSize: 18,
  },
});

export default globalStyles;
