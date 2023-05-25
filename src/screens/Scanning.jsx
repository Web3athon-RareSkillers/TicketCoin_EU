import React, {useState} from 'react';

import {Image, StyleSheet, View, Text} from 'react-native';
import VerifyAttendeeHeader from '../components/VerifyAttendeeHeader';
import Footer from '../components/Footer';
import Scanner from '../components/Scanner';
import checkedIcon from '../assets/icons/checked.png';
import uncheckedIcon from '../assets/icons/unchecked.png';
import globalStyles from '../globalStyles';

export default function Scanning({navigation}) {
  const [scanState, setScanState] = useState(false);

  const handleScan = data => {
    setScanState(data);
  };

  return (
    <>
      <View style={globalStyles.mainContainer}>
        <View>
          <VerifyAttendeeHeader navigation={navigation} />
        </View>

        <View style={styles.progressbarWrapper}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.checkIconChecked}
              source={require('../assets/icons/checked.png')}
            />
            <Text style={[styles.iconText, styles.textDone]}>Event</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image
              style={scanState ? styles.checkIconChecked : styles.checkIcon}
              source={scanState ? checkedIcon : uncheckedIcon}
            />
            <Text
              style={[
                styles.iconText,
                scanState ? styles.textDone : styles.textInactive,
              ]}>
              Scan
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Image
              style={scanState ? styles.checkIconChecked : styles.checkIcon}
              source={scanState ? checkedIcon : uncheckedIcon}
            />
            <Text
              style={[
                styles.iconText,
                scanState ? styles.textDone : styles.textInactive,
              ]}>
              Success
            </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Scanner emitScanState={handleScan}></Scanner>
        </View>

        <View style={globalStyles.footerContainer}>
          <Footer></Footer>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  backIcon: {
    height: 20,
    width: 12,
    marginRight: 12,
  },
  emptyView: {
    width: 12,
  },
  progressbarWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 96,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: 12,
    opacity: 0.5,
  },
  checkIconChecked: {
    marginRight: 12,
  },
  brightIcon: {
    opacity: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NexaBold',
    textAlign: 'center',
  },
  inputTitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'NexaBold',
    textAlign: 'left',
    paddingBottom: 4,
  },
  iconText: {
    fontSize: 12,
    fontFamily: 'NexaBold',
    textAlign: 'center',
  },
  textInactive: {
    color: '#999999',
  },
  textActive: {
    color: 'white',
  },
  textDone: {
    color: '#A55AD8',
  },
});
