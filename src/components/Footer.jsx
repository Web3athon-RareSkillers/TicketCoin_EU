import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Footer = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const navigation = useNavigation();

  const handleLinkClick = link => {
    navigation.navigate(link);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      const activeRoute = e.data.state.routes[e.data.state.index].name;
      setActiveLink(activeRoute);
    });

    return unsubscribe;
  }, [navigation]);

  const getIconSource = link => {
    switch (link) {
      case 'Home':
        return activeLink === 'Home'
          ? require('../assets/icons/home-clicked.png')
          : require('../assets/icons/home.png');
      case 'Collections':
        return activeLink === 'Collections'
          ? require('../assets/icons/collections-clicked.png')
          : require('../assets/icons/collections.png');
      case 'VerifyAttendee':
        return activeLink === 'VerifyAttendee'
          ? require('../assets/icons/account-clicked.png')
          : require('../assets/icons/account.png');
      case 'Notification':
        return activeLink === 'Notification'
          ? require('../assets/icons/notification-clicked.png')
          : require('../assets/icons/notification.png');
      default:
        return require('../assets/icons/home.png');
    }
  };
  const [keyboardVisible, setKeyboardVisible] = useState(false); // track the visibility of the keyboard

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (keyboardVisible) {
    return null; // hide the footer when the keyboard is visible
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => handleLinkClick('Home')}>
        <Image source={getIconSource('Home')} style={styles.iconImage} />
        <Text
          style={[
            styles.linkLabel,
            activeLink === 'Home' && styles.activeLink,
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => handleLinkClick('Collections')}>
        <Image source={getIconSource('Collections')} style={styles.iconImage} />
        <Text
          style={[
            styles.linkLabel,
            activeLink === 'Collections' && styles.activeLink,
          ]}>
          Collections
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => handleLinkClick('VerifyAttendee')}>
        <Image
          source={getIconSource('VerifyAttendee')}
          style={styles.iconImage}
        />
        <Text
          style={[
            styles.linkLabel,
            activeLink === 'VerifyAttendee' && styles.activeLink,
          ]}>
          Verify
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => handleLinkClick('Notification')}>
        <Image
          source={getIconSource('Notification')}
          style={styles.iconImage}
        />
        <Text
          style={[
            styles.linkLabel,
            activeLink === 'Notification' && styles.activeLink,
          ]}>
          Notification
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#19191A',
    paddingVertical: 16,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  linkLabel: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
  activeLink: {
    color: '#8569F6',
  },
});
export default Footer;
