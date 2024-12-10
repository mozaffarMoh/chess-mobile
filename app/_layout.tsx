import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import LabelsColumn from "@/components/LabelsColumn";
import LabelsRow from "@/components/LabelsRow";
import { customStyles } from "@/constants/styles";
import { Provider } from "react-redux";
import store from "@/store";
import Board from "@/components/Board";
import ReturnArrows from "@/components/ReturnArrows";

export default function RootLayout() {
  const { height } = Dimensions.get("window");

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.rowsWithColumnsContainer}>
            <LabelsRow />

            <View style={styles.containerChild}>
              <LabelsColumn />
              <View
                style={{
                  width: "100%",
                  height: height / 2,
                  backgroundColor: "black",
                }}
              >
                <Board />
              </View>
              <LabelsColumn />
            </View>
            <LabelsRow />
          </View>

          {/* Return Arrows */}
          <ReturnArrows />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  scrollContent: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rowsWithColumnsContainer: {
    marginTop:100,
    ...customStyles.flexCenter,
  },
  containerChild: {
    width: "85%",
    ...customStyles.flexCenterColumn,
    marginBottom: 35,
  },
});
