import React from 'react';
import {Image, StyleSheet, View, Text, Dimensions} from 'react-native';
import RoundedButton from '../components/roundedButton';
import Footer from '../components/Footer';
import Dropdown from '../components/Dropdown';
import InputField from '../components/InputField';
import VerifyAttendeeHeader from '../components/VerifyAttendeeHeader';
import globalStyles from '../globalStyles';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function VerifyAttendee({navigation}) {
  const handleDropdownSelect = option => {
    console.log('Selected option:', option);
  };

  const handleInputChange = text => {
    console.log('Input value:', text);
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
              style={[styles.checkIcon, styles.brightIcon]}
              source={require('../assets/icons/unchecked.png')}
            />
            <Text style={[styles.iconText, styles.textActive]}>Event</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image
              style={styles.checkIcon}
              source={require('../assets/icons/unchecked.png')}
            />
            <Text style={[styles.iconText, styles.textInactive]}>Scan</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image
              style={styles.checkIcon}
              source={require('../assets/icons/unchecked.png')}
            />
            <Text style={[styles.iconText, styles.textInactive]}>Success</Text>
          </View>
        </View>
        <View style={styles.titleDropdownContainer}>
          <Text style={styles.inputTitle}>Event Category</Text>
          <Dropdown
            options={['All', 'Sport', 'Music', 'Art', 'Food']}
            onSelect={handleDropdownSelect}
            dropdownPlaceholder="All"
          />
        </View>
        <View style={styles.titleInputContainer}>
          <Text style={styles.inputTitle}>Event Name</Text>
          <InputField
            onInputChange={handleInputChange}
            placeholderText={'Type event name here'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
            onPress={() => navigation.navigate('Scanning')}
            title={'Proceed to scan    >> '}
          />
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
  titleInputContainer: {
    paddingHorizontal: 16,
    flex: 1,
    marginBottom: 16,
    maxHeight: 104,
    zIndex: 1,
  },
  titleDropdownContainer: {
    paddingHorizontal: 16,
    flex: 1,
    marginBottom: 16,
    maxHeight: 104,
    zIndex: 2,
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
    marginBottom: 80,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: 12,
    opacity: 0.5,
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
  buttonContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    maxHeight: 52,
  },
  buttonsWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxHeight: 220,
  },
});
