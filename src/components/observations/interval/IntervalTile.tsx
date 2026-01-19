import { View, Text, StyleSheet, Animated } from "react-native";
import DropDownMenu, { Option } from "../../universal/form/DropDownMenu";
import { fontSizes, colors } from "@/src/utils/styles";
import { IntervalObservationType } from "@/src/types/observations/intervalTypes";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { listToOptions } from "@/src/utils/listToOptions";
import MiniDropDownMenu from "./MiniDropDownMenu";

export default function IntervalTile({
  index,
  observation,
  onTaskList,
  offTaskList,
  currentInterval,
  progress,
  themeColor,
}: {
  index: number;
  observation: IntervalObservationType | null;
  onTaskList: string[];
  offTaskList: string[];
  currentInterval: number;
  progress: Animated.Value;
  themeColor: string;
}) {
  const { setObservation } = useIntervalObservationStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interval {index + 1}</Text>

      {index === currentInterval ? (
        <Animated.View
          style={[
            styles.progressBar,
            {
              backgroundColor: themeColor,
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        ></Animated.View>
      ) : (
        <View style={styles.content}>
          <Text
            style={[
              styles.value,
              {
                color:
                  observation?.isOnTask !== null
                    ? observation!.isOnTask
                      ? colors.green
                      : colors.red
                    : colors.gray,
              },
            ]}
          >
            {observation?.value ?? "No observation"}
          </Text>

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
      )}
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
