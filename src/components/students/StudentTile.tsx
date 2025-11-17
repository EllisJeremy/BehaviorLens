import { Pressable, StyleSheet, Text, View } from "react-native";
import { StudentType } from "../../app/Students";
import Octicons from "@expo/vector-icons/Octicons";

export default function StudentTile({
  firstName,
  lastName,
  grade,
}: StudentType) {
  return (
    <View style={styles.tile}>
      <View style={styles.info}>
        <Text style={styles.text}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.grade}>Grade {grade}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable style={styles.iconButton}>
          <Octicons name="pencil" size={20} color="white" />
        </Pressable>

        <Pressable style={[styles.iconButton, styles.deleteButton]}>
          <Octicons name="trash" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: "100%",
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
  info: {
    flexShrink: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  grade: {
    fontSize: 14,
    color: "rgba(92, 92, 92, 1)",
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    backgroundColor: "rgba(45, 164, 255, 1)",
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "rgba(255, 52, 52, 1)",
  },
});
