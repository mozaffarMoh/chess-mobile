import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Updates from "expo-updates";

const CheckMate = ({ player }: any) => {
  const handleReset = () => {
    Updates.reloadAsync();
  };

  let playerInArabic = player == "white" ? "الأبيض" : "الأسود";
  let wonText = `اللاعب ${playerInArabic} ربح اللعبة`;
  return (
    <View style={styles.checkMateContainer}>
      <View style={styles.checkMate}>
        <Text style={styles.checkMateText}>كش مات</Text>
        <Text style={styles.winnerText}>{wonText}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleReset}>
          <Text style={styles.retryButtonText}> إعادة اللعبة</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkMateContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  checkMate: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  checkMateText: {
    color: "red",
    fontSize: 24,
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  winnerText: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
  },
  retryButton: {
    backgroundColor: "#1e4775",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CheckMate;
