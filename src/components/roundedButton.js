import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RoundedButton = ({title, subTitle, onPress, retryIcon}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient
        colors={['#6F26A1', '#8569F6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}>
        {retryIcon ? (
          <View style={styles.iconContainer}>
            <Image
              source={require('../assets/icons/retry.png')}
              style={styles.icon}
            />
          </View>
        ) : null}
        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <Text style={styles.subTitle}>{subTitle}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    flex: 1,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    height: 52,
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    width: 13,
    height: 13,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NexaBold',
    textAlign: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'NexaBold',
    textAlign: 'center',
  },
});

export default RoundedButton;
