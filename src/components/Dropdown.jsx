import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function Dropdown({options, onSelect, dropdownPlaceholder}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  function handleOptionSelect(option) {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.dropdownButtonText}>
          {selectedOption || dropdownPlaceholder}
        </Text>
        <Image
          style={styles.arrowDownIcon}
          source={require('../assets/icons/arrow-down.png')}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option)}>
              <Text style={styles.optionButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    borderRadius: 99999,
    height: 52,
    borderWidth: 1,
    borderColor: 'white',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    color: '#999999',
    fontFamily: 'NexaBold',
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#0C0C0D',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    padding: 8,
    marginTop: 8,
  },
  optionButton: {
    padding: 8,
  },
  arrowDownIcon: {
    width: 10,
  },
  optionButtonText: {
    color: 'white',
    fontFamily: 'NexaBold',
  },
});
