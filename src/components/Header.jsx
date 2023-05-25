import React from 'react';
import {View, Text} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

function Header() {
  return (
    <View>
      <MaterialIcons name="arrow-back-ios" size={28} />
      <Text>Verify Attendee</Text>
    </View>
  );
}

export default Header;
