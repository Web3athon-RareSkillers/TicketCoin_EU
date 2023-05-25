import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

export default function VerifyAttendeeHeader({navigation}) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backIcon}
          source={require('../assets/icons/back-arrow.png')}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Verify Attendee</Text>
      </View>
      <View style={styles.emptyView} />
    </View>
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
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NexaBold',
    textAlign: 'center',
  },
  backIcon: {
    height: 20,
    width: 12,
    marginRight: 12,
  },
  emptyView: {
    width: 12,
  },
});
