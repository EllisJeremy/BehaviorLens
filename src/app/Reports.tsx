import { Text, View } from "react-native";
import { useReportsStore } from "../state/reports/useReportsStore";

export default function Reports() {
  const { reports } = useReportsStore();
  console.log(reports);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>text example</Text>
    </View>
  );
}
