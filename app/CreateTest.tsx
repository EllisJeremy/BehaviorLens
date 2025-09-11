import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function CreateTest() {
  useEffect(() => {
    const loadData = async () => {
      const storedName = await AsyncStorage.getItem("tests");
      if (storedName) {
        // retrieve
      }
    };
    loadData();
  }, []);
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
