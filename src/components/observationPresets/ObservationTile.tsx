import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ActionSheetIOS,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useObservationModalStore } from "@/src/state/observations/useObservationsModalStore";
import { colors, fontSizes } from "@/src/utils/styles";
import { ObservationPreset } from "@/src/types/observationTypes";
import { useObservationPresetStore } from "@/src/state/observations/useObservationsStore";
import { typeToIcon } from "@/src/utils/observationPresets/typeToIcon";

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
    setUuid,
  } = useObservationModalStore();

  return (
    <View style={styles.tile}>
      <View style={styles.iconAndInfo}>
        <Image
          source={typeToIcon[observationPreset.type]}
          style={styles.icon}
        />
        <View style={styles.info}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {observationPreset.name}
          </Text>
          <Text style={styles.subText}>{observationPreset.type}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.iconButton}
          onPress={() => {
            setUuid(observationPreset.uuid);
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
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ["Cancel", "Delete"],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
              },
              (index: number) => {
                if (index === 1)
                  removeObservationPreset(observationPreset.uuid);
              }
            );
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
    gap: 10,
  },
  iconAndInfo: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    flex: 1,
  },
  icon: {
    height: 30,
    width: 30,
  },
  info: {
    flexShrink: 1,
  },
  text: {
    fontSize: fontSizes.text,
    fontWeight: "600",
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
