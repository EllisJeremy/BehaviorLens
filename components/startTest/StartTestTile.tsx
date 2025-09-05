import Octicons from "@expo/vector-icons/Octicons";
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type StartTestProps = {
  backgroundColor: ColorValue;
  color: string;
  icon: keyof typeof Octicons.glyphMap;
  title: string;
  time: number;
};

export default function StartTestTile({
  backgroundColor,
  color,
  icon,
  title,
  time,
}: StartTestProps) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor }]}>
      <Octicons name={icon} size={32} color={color} />
      <View>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.time}>{time} min</Text>
      </View>
    </TouchableOpacity>
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
