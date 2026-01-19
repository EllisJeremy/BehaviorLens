import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { timeFormatter } from "@/src/utils/timeFormatter";
import { fontSizes, colors } from "@/src/utils/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Controller({
  time,
  borderAnim,
  themeColor,
  status,
  onToggle,
}: {
  time: number;
  borderAnim: Animated.Value;
  themeColor: string;
  status: string;
  onToggle: () => void;
}) {
  return (
    <View style={styles.controller}>
      <Text style={styles.time}>{timeFormatter(time)}</Text>

      <Pressable onPress={onToggle}>
        <Animated.View
          style={[
            styles.pause,
            {
              borderWidth: borderAnim,
              paddingLeft: status === "RUNNING" ? 0 : 4,
              borderColor: themeColor,
            },
          ]}
        >
          <Ionicons
            name={status === "RUNNING" ? "pause-outline" : "play-outline"}
            size={40}
            color={themeColor}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: fontSizes.extraLarge,
  },

  controller: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    height: 100,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  pause: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginRight: 20,
  },
});
