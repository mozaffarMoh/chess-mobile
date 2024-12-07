import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import LabelsColumn from "@/components/LabelsColumn";
import LabelsRow from "@/components/LabelsRow";
import { customStyles } from "@/constants/styles";

export default function RootLayout() {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <LabelsRow />

        <View style={styles.containerChild}>
          <LabelsColumn />
          <View
            style={{ width: "100%", height: 370, backgroundColor: "black" }}
          >
            <Text>Chess</Text>
          </View>

          <LabelsColumn />
        </View>

        <LabelsRow />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    ...customStyles.flexCenter,
    backgroundColor: "#222222",
  },
  containerChild: {
    width: "85%",
    ...customStyles.flexCenterColumn,
    marginBottom: 35,
  },
});
