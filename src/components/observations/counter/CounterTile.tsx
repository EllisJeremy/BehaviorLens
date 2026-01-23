import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { fontSizes, colors } from "@/src/utils/styles";
import { useCounterObservationStore } from "@/src/state/observations/useCounterObservationStore";
import Octicons from "@expo/vector-icons/Octicons";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";

export default function CounterTile({
  behavior,
  status,
}: {
  behavior: string;
  status: string;
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
          >
            <Octicons name="dash" size={40} color={colors.darkGray} />
          </Pressable>
          <Pressable
            onPress={() => {
              if (status === "RUNNING") pushCount(behavior);
            }}
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
