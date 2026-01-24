import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { timeFormatter } from "@/src/utils/format/timeFormatter";
import { fontSizes, colors } from "@/src/utils/objects/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Controller({
  time,
  borderAnim,
  themeColor,
  status,
  currentInterval,
  totalIntervals,

  onToggle,
}: {
  time: number;
  borderAnim: Animated.Value;
  themeColor: string;
  status: string;
  currentInterval?: number;
  totalIntervals?: number;
  onToggle: () => void;
}) {
  return (
    <View style={styles.controller}>
      <View>
        <Text style={styles.time}>{timeFormatter(time)}</Text>
        {totalIntervals !== undefined && currentInterval !== undefined && (
          <Text style={styles.interval}>{`Interval ${Math.min(
            currentInterval + 1,
            totalIntervals,
          )} / ${totalIntervals}`}</Text>
        )}
      </View>
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
    marginBottom: 10,
  },
  interval: {
    fontSize: fontSizes.large,
    color: colors.gray,
  },

  controller: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    height: 120,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
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
