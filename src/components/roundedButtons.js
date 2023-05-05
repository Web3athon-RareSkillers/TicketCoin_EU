
import React from 'react';
import { TouchableOpacity, Text, StyleSheet,Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const SCREEN_WIDTH = Dimensions.get('window').width;

const RoundedButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient
        colors={['#6F26A1', '#8569F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {

    alignItems: 'center',
    justifyContent: 'center',
    width:305,
    height:50
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily:"NexaLight",
    textAlign: 'center',
  },
});

export default RoundedButton;
