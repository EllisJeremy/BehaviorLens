import { Pressable, StyleSheet, Text, View } from "react-native";
import { StudentType } from "../../app/Students";

export default function StudentTile({
  firstName,
  lastName,
  grade,
}: StudentType) {
  return (
    <Pressable>
      <View>
        <Text style={styles.text}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.time}>{grade}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingVertical: 24,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
    color: "#333",
  },
  time: {
    fontSize: 14,
    marginLeft: 16,
    color: "#5c5c5cff",
  },
});
