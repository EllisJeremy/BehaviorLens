import { View, Text } from "react-native";
import { timeFormatter } from "@/src/utils/timeFormatter";

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
      <Text>{currentInterval}</Text>
      <Text>{timeFormatter(time)}</Text>
      <Text>
        {observationIntervalSeconds - (time % observationIntervalSeconds)}
      </Text>
    </View>
  );
}
