import { StyleSheet, Pressable } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

export default function PlusButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.add} onPress={onPress}>
      <Octicons name="plus" size={20} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  add: {
    backgroundColor: "rgba(12, 185, 0, 1)",
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 20,
  },
});
