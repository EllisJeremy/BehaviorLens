import { View, Text, StyleSheet } from "react-native";
import DropDownMenu, { Option } from "../../universal/form/DropDownMenu";
import { fontSizes, colors } from "@/src/utils/styles";
import { IntervalObservation } from "@/src/types/observations/intervalTypes";

function toOptions(values: string[]): Option<string>[] {
  return values.map((v) => ({
    label: v,
    value: v,
  }));
}

export default function IntervalTile({
  index,
  observation,
  onTaskList,
  offTaskList,
  setObservation,
}: {
  index: number;
  observation: IntervalObservation | null;
  onTaskList: string[];
  offTaskList: string[];
  setObservation: (v: IntervalObservation) => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Interval {index + 1}</Text>
        <Text style={styles.value}>
          {observation?.value ?? "No observation"}
        </Text>
      </View>

      <View style={styles.controls}>
        <DropDownMenu
          title="On task"
          options={toOptions(onTaskList)}
          value={""}
          setValue={() => {}}
        />

        <DropDownMenu
          title="Off task"
          options={toOptions(offTaskList)}
          value={""}
          setValue={() => {}}
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
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: fontSizes.text,
    fontWeight: "500",
  },

  value: {
    fontSize: fontSizes.small,
    color: colors.gray,
  },

  controls: {
    gap: 8,
  },
});
