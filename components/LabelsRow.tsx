import { labelsRowArray } from '@/constants/generateSquares';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const LabelsRow = () => {
  return (
    <View style={styles.labelsRowContainer}>
      {labelsRowArray.map((item, i) => (
        <View key={i} style={styles.labelRow}>
          <Text style={styles.labelText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  labelsRowContainer: {
    backgroundColor:'#555555',
    width: '7%', // Full width of the screen
    height: height * 0.5, // 60% of the screen height
    marginBottom: height * 0.05, // 5% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // Ensure rows are vertically aligned for mobile
  },
  labelRow: {
    height: '12.5%', // Keep consistent spacing between rows
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8, // Adjusted padding for mobile
    paddingHorizontal: 10,
  },
  labelText: {
    color: 'white',
    fontSize: width * 0.04, // Dynamically set font size based on screen width
  },
});

export default LabelsRow;
