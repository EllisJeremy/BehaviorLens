import { View, Text, StyleSheet, Pressable } from "react-native";
import { fontSizes, colors, styleConsts } from "@/src/utils/objects/styles";
import { useCounterObservationStore } from "@/src/state/observations/useCounterObservationStore";
import Octicons from "@expo/vector-icons/Octicons";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";

export default function CounterTile({
  behavior,
  status,
  secondsPassed,
}: {
  behavior: string;
  status: string;
  secondsPassed: number;
}) {
  const { counter, pushCount, popCount } = useCounterObservationStore();
  const { settings } = useSettingsStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{behavior}</Text>

      <View style={styles.content}>
        <Text style={[styles.value, { color: settings.themeColor }]}>
          {counter[behavior].length}
        </Text>

        <View style={styles.controls}>
          <Pressable
            onPress={() => {
              if (status === "RUNNING") popCount(behavior);
            }}
            style={({ pressed }) => [
              { opacity: pressed ? styleConsts.opacity : 1 },
            ]}
          >
            <Octicons name="dash" size={40} color={colors.darkGray} />
          </Pressable>
          <Pressable
            onPress={() => {
              if (status === "RUNNING") pushCount(behavior, secondsPassed);
            }}
            style={({ pressed }) => [
              { opacity: pressed ? styleConsts.opacity : 1 },
            ]}
          >
            <Octicons name="plus" size={40} color={settings.themeColor} />
          </Pressable>
        </View>
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
    color: colors.darkGray,
  },

  value: {
    fontSize: fontSizes.extraLarge,
    maxWidth: "40%",
  },

  controls: {
    gap: 20,
    flexDirection: "row",
  },
});
