import { View, Text, StyleSheet, Animated } from "react-native";
import { fontSizes, colors } from "@/src/utils/styles";
import { useCounterObservationStore } from "@/src/state/observations/useCounterObservationStore";

export default function CounterTile({ behavior }: { behavior: string }) {
  const { counter, pushCount, popCount } = useCounterObservationStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{behavior}</Text>

      <View style={styles.content}>
        <Text style={styles.value}>{counter[behavior]}</Text>

        <View style={styles.controls}></View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offWhite,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    minHeight: 72,
    justifyContent: "space-between",
    gap: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  progressBar: {
    borderRadius: 10,
    height: 15,
  },
  title: {
    fontSize: fontSizes.text,
    fontWeight: "500",
  },

  value: {
    fontSize: fontSizes.text,
    color: colors.gray,
    maxWidth: "40%",
  },

  controls: {
    gap: 20,
    flexDirection: "row",
  },
});
