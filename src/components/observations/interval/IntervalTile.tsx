import { View, Text, StyleSheet } from "react-native";
import DropDownMenu, { Option } from "../../universal/form/DropDownMenu";
import { fontSizes, colors } from "@/src/utils/styles";
import { IntervalObservation } from "@/src/types/observations/intervalTypes";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { listToOptions } from "@/src/utils/listToOptions";
import MiniDropDownMenu from "./MiniDropDownMenu";

export default function IntervalTile({
  index,
  observation,
  onTaskList,
  offTaskList,
}: {
  index: number;
  observation: IntervalObservation | null;
  onTaskList: string[];
  offTaskList: string[];
}) {
  const { setObservation } = useIntervalObservationStore();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Interval {index + 1}</Text>
        <Text
          style={[
            styles.value,
            {
              color: observation
                ? observation.isOnTask
                  ? colors.green
                  : colors.red
                : colors.gray,
            },
          ]}
        >
          {observation?.value ?? "No observation"}
        </Text>
      </View>

      <View style={styles.controls}>
        <MiniDropDownMenu
          options={listToOptions(onTaskList)}
          setValue={setObservation}
          index={index}
          isOnTask={true}
        />

        <MiniDropDownMenu
          options={listToOptions(offTaskList)}
          setValue={setObservation}
          index={index}
          isOnTask={false}
        />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
    maxWidth: "40%",
  },

  title: {
    fontSize: fontSizes.text,
    fontWeight: "500",
  },

  value: {
    fontSize: fontSizes.text,
    color: colors.gray,
  },

  controls: {
    gap: 30,
    flexDirection: "row",
  },
});
