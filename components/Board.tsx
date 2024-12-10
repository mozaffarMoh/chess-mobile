import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { pieces } from "@/constants/pieces";
import { checkRules } from "@/constants/rules";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import Promote from "@/components/Promote";
import CheckMate from "@/components/CheckMate";
import { RootType } from "../store";
import { addMoves, startfromThisPoint } from "../Slices/MovesSlice";
import { increaseCount } from "../Slices/returnMovesCount";
import { generateSquares } from "@/constants/generateSquares";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Board = () => {
  const moveSound = require("../assets/sounds/move.mp3");
  const checkMateSound = require("../assets/sounds/win.mp3");
  const dispatch = useDispatch();
  const squaresSlice = useSelector((state: RootType) => state.moves.data);
  const returnMovesCount = useSelector(
    (state: RootType) => state.returnMovesCount.value
  );
  const [squares, setSquares] = useState(generateSquares());
  const [prevSquare, setPrevSquare]: any = useState(null);
  const [currentSquare, setCurrentSquare]: any = useState(null);
  const [playerTurn, setPlayerTurn] = useState("white");
  const [winner, setWinner] = useState("");
  const [isMoveSuccess, setIsMoveSuccess] = useState(false);
  const [isPromote, setIsPromote] = useState(false);
  const [isWhiteCastling, setIsWhiteCastling] = useState(false);
  const [isBlackCastling, setIsBlackCastling] = useState(false);
  const [isCastlingEvent, setIsCastlingEvent] = useState(false);
  const [isCheckMate, setIsCheckMate] = useState(false);
  const [promotePiece, setPromotePiece] = useState("");
  const [moveSoundFile, setMoveSoundFile] = useState<Audio.Sound | null>(null);
  const [checkMateSoundFile, setCheckMateSoundFile] =
    useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSounds = async () => {
      const moveSoundObj = new Audio.Sound();
      const checkMateSoundObj = new Audio.Sound();
      await moveSoundObj.loadAsync(moveSound);
      await checkMateSoundObj.loadAsync(checkMateSound);
      setMoveSoundFile(moveSoundObj);
      setCheckMateSoundFile(checkMateSoundObj);
    };
    loadSounds();
    return () => {
      moveSoundFile?.unloadAsync();
      checkMateSoundFile?.unloadAsync();
    };
  }, []);

  const handleSquareClick = (square: any) => {
    if (square.piece?.name !== null && playerTurn === square.piece.color) {
      setPrevSquare(square);
    }

    if (prevSquare && playerTurn !== square.piece.color) {
      const checkValue: any = checkRules(
        prevSquare,
        square,
        squaresSlice[returnMovesCount],
        setSquares,
        isWhiteCastling,
        isBlackCastling
      );

      if (checkValue.result) {
        dispatch(startfromThisPoint(returnMovesCount));
        setCurrentSquare(square);
        setIsMoveSuccess(true);
      }

      checkValue.message === "promote" && setIsPromote(true);
      (checkValue.message === "whiteKing" ||
        checkValue.message === "isCastlingEventWhite") &&
        setIsWhiteCastling(true);
      (checkValue.message === "blackKing" ||
        checkValue.message === "isCastlingEventBlack") &&
        setIsBlackCastling(true);
      if (
        checkValue.message === "isCastlingEventWhite" ||
        checkValue.message === "isCastlingEventBlack"
      ) {
        setIsCastlingEvent(true);
      }

      checkValue.message === "checkMate" && setIsCheckMate(true);
    }
  };

  useEffect(() => {
    dispatch(addMoves(squares));
    if (squaresSlice.length > 0) {
      dispatch(increaseCount());
    }
  }, [squares]);

  useEffect(() => {
    if (returnMovesCount >= 0) {
      setPrevSquare(null);
      setCurrentSquare(null);
    }
    setPlayerTurn(returnMovesCount % 2 === 0 ? "white" : "black");
  }, [returnMovesCount]);

  useEffect(() => {
    if (isMoveSuccess && !isPromote) {
      moveSoundFile?.replayAsync();

      if (!isCastlingEvent) {
        setSquares(() => {
          const newArray = [...squaresSlice[returnMovesCount]];

          const prevIndex = newArray.indexOf(prevSquare);
          const currentIndex = newArray.indexOf(currentSquare);

          newArray[currentIndex] = {
            ...newArray[currentIndex],
            piece: promotePiece
              ? { ...prevSquare.piece, name: promotePiece }
              : prevSquare.piece,
          };

          newArray[prevIndex] = {
            ...newArray[prevIndex],
            piece: { name: null, color: "" },
          };

          return newArray;
        });
      }
      closeAll();
    }
  }, [isMoveSuccess, isPromote]);

  useEffect(() => {
    if (isCastlingEvent) {
      closeAll();
    }
  }, [isCastlingEvent]);

  const closeAll = () => {
    setIsCastlingEvent(false);
    setIsMoveSuccess(false);
    setPrevSquare(null);
    setCurrentSquare(null);
    setPromotePiece("");
  };

  useEffect(() => {
    if (isCheckMate) {
      setWinner(playerTurn);
      checkMateSoundFile?.replayAsync();
    }
  }, [isCheckMate]);

  return (
    <View style={styles.board}>
      {isCheckMate && <CheckMate player={winner} />}
      {isPromote && (
        <Promote
          setIsPromote={setIsPromote}
          playerColor={prevSquare && prevSquare.piece?.color}
          setPromotePiece={setPromotePiece}
        />
      )}
      {squaresSlice[returnMovesCount]?.map((square: any, i: number) => (
        <TouchableOpacity
          key={square.label} // Use square.label for unique key
          style={[
            styles.square,
            square.color === "white" ? styles.whiteSquare : styles.blackSquare,
            square.label === prevSquare?.label && styles.selectedSquare,
          ]}
          onPress={() => handleSquareClick(square)}
        >
          <MaterialCommunityIcons
            name={pieces[square.piece.name]}
            color={square.piece.color}
            size={30}
            style={{
              transform: [
                { rotate: square.piece.color === "black" ? "180deg" : "0deg" },
              ],
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// const { width, height } = Dimensions.get("window");
// console.log(width, height);

const styles = StyleSheet.create({
  board: {
    backgroundColor: "#333333",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: "12%",
    height: "12.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteSquare: {
    backgroundColor: "#bbb",
  },
  blackSquare: {
    backgroundColor: "#555",
  },
  selectedSquare: {
    borderWidth: 2,
    borderColor: "yellow",
  },
});

export default Board;
