import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import RoundedButton from '../components/roundedButton';
import Video from 'react-native-video';
const SCREEN_WIDTH = Dimensions.get('window').width;

function Intro({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <View style={styles.contentContainer}>
        <Video
          source={require('../assets/videos/introVideo.mp4')} // Can be a URL or a local file.
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />

        <View style={styles.absoluteContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo_mini.png')}
            />
            <Text style={styles.logoText}>Ticketcoin</Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Secure event tickets using{' '}
              <Text style={styles.highlightedText}>Blockchain</Text>
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <RoundedButton
              onPress={() => navigation.navigate('Onboard')}
              title={'Start Experience    >>'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  absoluteContainer: {
    padding: 16,
    flexDirection: 'column',
    flex: 1,
    position: 'absolute',
  },
  logo: {
    height: 32,
    width: 32,
  },
  logoContainer: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontFamily: 'NexaBold',
    paddingLeft: 8,
    fontSize: 18,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    color: 'white',
    fontFamily: 'NexaBold',
    fontSize: 32,
  },
  highlightedText: {
    color: '#7B4ACD',
    fontFamily: 'NexaBold',
    fontSize: 32,
  },
  buttonContainer: {
    marginBottom: 48,
    flex: 1,
    justifyContent: 'center',
    width: SCREEN_WIDTH - 32,
  },
});

export default Intro;
