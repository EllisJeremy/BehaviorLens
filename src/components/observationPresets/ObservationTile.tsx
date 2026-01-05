import { Pressable, StyleSheet, Text, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useObservationModalStore } from "@/src/state/observations/useObservationsModalStore";
import { colors, fontSizes } from "@/src/utils/styles";
import { ObservationPreset } from "@/src/types/observationTypes";
import { useObservationPresetStore } from "@/src/state/observations/useObservationsStore";

export default function ObservationTile({
  observationPreset,
}: {
  observationPreset: ObservationPreset;
}) {
  const { removeObservationPreset } = useObservationPresetStore();
  const {
    setName,
    setType,
    setNumberOfObservations,
    setObservationIntervalSeconds,
    setOpen,
  } = useObservationModalStore();

  return (
    <View style={styles.tile}>
      <View style={styles.info}>
        <Text style={styles.text}>{observationPreset.name}</Text>
        <Text style={styles.subText}>{observationPreset.type}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.iconButton}
          onPress={() => {
            setName(observationPreset.name);
            setType(observationPreset.type);
            if (observationPreset.type === "interval") {
              setNumberOfObservations(observationPreset.numberOfObservations);
              setObservationIntervalSeconds(
                observationPreset.observationIntervalSeconds
              );
            }

            setOpen(true);
          }}
        >
          <Octicons name="pencil" size={20} color="white" />
        </Pressable>

        <Pressable
          style={[styles.iconButton, styles.deleteButton]}
          onPress={() => {
            removeObservationPreset(observationPreset.uuid);
          }}
        >
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
    fontSize: fontSizes.text,
    fontWeight: "600",
    color: "#333",
  },
  subText: {
    fontSize: fontSizes.subText,
    color: colors.darkGray,
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    backgroundColor: colors.blue,
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: colors.red,
  },
});
