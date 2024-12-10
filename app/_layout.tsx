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
  const { width, height } = Dimensions.get("window");

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container} >
        <ScrollView contentContainerStyle={styles.container}>
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
        </ScrollView>

        {/* Arrows */}
        <ReturnArrows />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent : 'flex-start',
    width: "100%", 
    height: "100%",
    ...customStyles.flexCenter,
    backgroundColor: "#333333",
  },
  containerChild: {
    width: "85%",
    ...customStyles.flexCenterColumn,
    marginBottom: 35,
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
