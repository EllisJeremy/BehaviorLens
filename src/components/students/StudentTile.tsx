import { Pressable, StyleSheet, Text, View } from "react-native";
import { StudentType } from "@/src/state/useStudentsStore";
import Octicons from "@expo/vector-icons/Octicons";
import { useStudentsStore } from "@/src/state/useStudentsStore";

export default function StudentTile({
  uuid,
  firstName,
  lastName,
  grade,
}: StudentType) {
  const { removeStudent } = useStudentsStore();
  return (
    <View style={styles.tile}>
      <View style={styles.info}>
        <Text style={styles.text}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.grade}>Grade {grade}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.iconButton}
          onPress={() => {
            removeStudent(uuid);
          }}
        >
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
    borderColor: "#d6d6d6ff",
    width: "100%",
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
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
