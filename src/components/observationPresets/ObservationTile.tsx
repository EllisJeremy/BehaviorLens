import { Alert } from "react-native";
import { useObservationPresetsModalStore } from "@/src/state/observationPresets/useObservationPresetsModalStore";
import { ObservationPreset } from "@/src/types/observations/observationTypes";
import { useObservationPresetsStore } from "@/src/state/observationPresets/useObservationPresetsStore";
import { typeToIcon } from "@/src/utils/observationPresets/typeToIcon";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import { useStudentsStore } from "@/src/state/students/useStudentsStore";
import { router } from "expo-router";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import Tile from "../universal/Tile";

export default function ObservationTile({
  observationPreset,
}: {
  observationPreset: ObservationPreset;
}) {
  const { removeObservationPreset } = useObservationPresetsStore();
  const {
    setName,
    setType,
    setTotalIntervals,
    setIntervalSeconds,
    setOpen,
    setUuid,
    setOffTask,
    setOnTask,
  } = useObservationPresetsModalStore();
  const { openWithPreset } = useStartObservationModalStore();
  const { students } = useStudentsStore();
  const { setOpen: setStudentOpen } = useStudentsModalStore();
  const { settings } = useSettingsStore();

  function onPress() {
    if (Object.keys(students).length === 0) {
      Alert.alert(
        "No Students",
        "Observations require a student to be assigned to them. Create a student to continue.",
        [
          {
            onPress: () => {
              router.push("/Students");
              setStudentOpen(true);
            },
          },
        ],
      );
    } else if (settings.username === "") {
      Alert.alert(
        "No Username",
        "You do not have a username set in settings. If you wish to continue without a name, the report for this observation will have a blank name.",
        [
          {
            text: "Set Name",
            onPress: () => {
              router.push("/Settings");
            },
          },
          {
            text: "Continue",
            style: "destructive",
            onPress: () => {
              openWithPreset(observationPreset);
            },
          },
        ],
      );
    } else {
      openWithPreset(observationPreset);
    }
  }

  function onEdit() {
    setUuid(observationPreset.uuid);
    setName(observationPreset.name);
    setType(observationPreset.type);

    if (observationPreset.type === "interval") {
      setTotalIntervals(observationPreset.totalIntervals);
      setIntervalSeconds(observationPreset.intervalSeconds);
      setOnTask(observationPreset.onTaskList);
      setOffTask(observationPreset.offTaskList);
    }
    setOpen(true);
  }

  function onRemove() {
    removeObservationPreset(observationPreset.uuid);
  }

  const totalMins =
    observationPreset.type === "interval"
      ? Math.floor(
          (observationPreset.intervalSeconds *
            observationPreset.totalIntervals) /
            60,
        )
      : observationPreset.totalMins;

  return (
    <Tile
      title={observationPreset.name}
      subTitle={`${totalMins} mins`}
      onPress={onPress}
      onEdit={onEdit}
      onRemove={onRemove}
      iconSource={typeToIcon[observationPreset.type]}
    />
  );
}
