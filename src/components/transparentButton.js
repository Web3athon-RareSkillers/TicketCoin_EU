import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const TransparentButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.gradient}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: '#1F1F1F',
    borderWidth: 1,
    flex: 1,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 52,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NexaLight',
    textAlign: 'center',
  },
});

export default TransparentButton;
