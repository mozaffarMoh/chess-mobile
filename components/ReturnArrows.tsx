import { useDispatch, useSelector } from "react-redux";
import { decreaseCount, increaseCount } from "../Slices/returnMovesCount";
import { RootType } from "../store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Dimensions, View } from "react-native";
import { customStyles } from "@/constants/styles";
import * as Updates from "expo-updates";

const ReturnArrows = () => {
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("window");
  const squaresSlice = useSelector((state: RootType) => state.moves.data);
  const returnMovesCount = useSelector(
    (state: RootType) => state.returnMovesCount.value
  );

  const handleIncrease = () => {
    if (returnMovesCount < squaresSlice.length - 1) {
      dispatch(increaseCount());
    }
  };

  const handleDecrease = () => {
    if (returnMovesCount > 0) {
      dispatch(decreaseCount());
    }
  };

  const handleReset = () => {
    Updates.reloadAsync();
  };

  return (
    <View
      style={[
        {
          position: "absolute",
          bottom: height - (height - 10),
          left: width - width / 1.7,
          gap:20,
        },
        customStyles.flexCenterColumn,
      ]}
    >
      <View style={[customStyles.flexCenter, { gap: 20 }]}>
        <MaterialCommunityIcons
          name="step-backward"
          size={32}
          color="white"
          onPress={handleDecrease}
        />
        <MaterialCommunityIcons
          name="step-forward"
          size={32}
          color="white"
          onPress={handleIncrease}
        />
      </View>
      <Button title="إعادة اللعبة" onPress={handleReset} color={"grey"} />
    </View>
  );
};

export default ReturnArrows;
