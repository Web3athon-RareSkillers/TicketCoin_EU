import React, {useRef, useState} from 'react';

import {Dimensions} from 'react-native';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

function SearchBar({onInputChange}) {
  const inputRef = useRef(); // Create a reference

  const handlePress = () => {
    inputRef.current.focus(); // Focus the input when the view is pressed
  };
  const [text, setText] = useState('');

  const handleTextChange = value => {
    setText(value);
    onInputChange(value);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Adjust this offset according to your needs
    >
      {}
      <TouchableOpacity style={styles.outerContainer} onPress={handlePress}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/search.png')}
            resizeMode="contain"
          />
          <TextInput
            ref={inputRef} // Attach the reference to the input
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#999999"
            onChangeText={handleTextChange}
          />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerContainer: {
    width: SCREEN_WIDTH - 32,
    borderRadius: 8,
  },
  innerContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#1F1F1F',
    borderWidth: 1,
  },
  icon: {
    marginHorizontal: 12,
    width: 16,
    height: 16,
  },
  input: {
    paddingLeft: 8, // Add some left padding
    fontFamily: 'NexaLight',
    color: '#999999',
    width: '80%',
  },
});
export default SearchBar;
