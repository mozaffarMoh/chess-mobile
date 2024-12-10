import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { labelsColumnArray } from "@/constants/generateSquares";

// Get screen dimensions
const { width } = Dimensions.get("window");

const LabelsColumn = () => {
  return (
    <View style={styles.labelsColumnContainer}>
      {labelsColumnArray.map((item, i) => (
        <View key={i} style={styles.labelColumn}>
          <Text style={styles.labelText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  labelsColumnContainer: {
    width: '12%', // Full width of the container
    height:30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", // Items stack vertically
  },
  labelColumn: {
    width: "100%", // Full width of each label
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#888888",
    paddingVertical: 3, // Equivalent to `padding: 3px` in CSS
  },
  labelText: {
    color: "white",
    fontSize: width * 0.04, // Dynamically set font size based on screen width
  },
});

export default LabelsColumn;
