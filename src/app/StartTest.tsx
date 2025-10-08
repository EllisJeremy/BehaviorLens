import Octicons from "@expo/vector-icons/Octicons";
import { Pressable, StyleSheet, View } from "react-native";
import StartTestTile from "../components/startTest/StartTestTile";

export default function StartTest() {
  return (
    <View style={styles.container}>
      <StartTestTile
        backgroundColor="#E3F2FD"
        color="#1976D2"
        icon="stopwatch"
        title="On-Task Behavior"
        time={30}
      />
      <StartTestTile
        backgroundColor="#F3E5F5"
        color="#7B1FA2"
        icon="note"
        title="ABC Data Collection"
        time={15}
      />

      <StartTestTile
        backgroundColor="#FFF3E0"
        color="#F57C00"
        icon="graph"
        title="Engagement Tracking"
        time={20}
      />

      <StartTestTile
        backgroundColor="#E8F5E9"
        color="#388E3C"
        icon="checklist"
        title="Task Completion"
        time={25}
      />

      <Pressable
        style={({ pressed }) => [
          styles.circleButton,
          ,
          pressed && { transform: [{ scale: 0.95 }] },
        ]}
      >
        <Octicons name="plus" size={20} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
    color: "#333",
  },
  circleButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0080ff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    transitionDelay: "1s",
  },
});
