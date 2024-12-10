import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { pieces } from "@/constants/pieces"; // Assuming pieces is an object with icon components
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { customStyles } from "@/constants/styles";

const Promote = ({ setIsPromote, playerColor, setPromotePiece }: any) => {
  const promoteItems = [
    { icon: pieces.rook, name: "rook" },
    { icon: pieces.bishop, name: "bishop" },
    { icon: pieces.knight, name: "knight" },
    { icon: pieces.queen, name: "queen" },
  ];

  const handleChoosePromote = (name: any) => {
    setIsPromote(false);
    setPromotePiece(name);
  };

  return (
    <View style={styles.promoteContainer}>
      <View style={styles.promote}>
        {promoteItems.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleChoosePromote(item.name)}
            style={styles.promotePieceSquare}
          >
            <MaterialCommunityIcons
              name={item.icon}
              color={playerColor}
              size={35}
              style={styles.promotePiece}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promoteContainer: {
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
  promote: {
    width: 250,
    height: 70,
    backgroundColor: "rgb(172, 163, 163)",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  promotePieceSquare: {
    width: 50,
    height: 50,
    borderRadius: 10,
    ...customStyles.flexCenterColumn,
    backgroundColor: "#777777",
  },
  promotePiece: {
    alignSelf: "flex-end",
    width: 43,
  },
});

export default Promote;
