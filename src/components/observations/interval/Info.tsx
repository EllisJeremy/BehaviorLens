import { View, Text, StyleSheet } from "react-native";
import { timeFormatter } from "@/src/utils/timeFormatter";
import { fontSizes } from "@/src/utils/styles";

export default function Info({
  currentInterval,
  time,
  observationIntervalSeconds,
}: {
  currentInterval: number;
  time: number;
  observationIntervalSeconds: number;
}) {
  return (
    <View>
      <Text style={styles.time}>{timeFormatter(time)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: fontSizes.extraLarge,
  },
});
