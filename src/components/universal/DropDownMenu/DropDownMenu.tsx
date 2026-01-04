import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export default function DropDownMenu({
  title,
  options,
  prevOption,
  value,
  setValue,
}: {
  title: string;
  options: string[];
  prevOption: string;
  value: string;
  setValue: (v: any) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>example</Text>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Unassigned</Text>
        <Entypo style={styles.icon} name="select-arrows" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
  },
  icon: {
    fontSize: 18,
  },
});
