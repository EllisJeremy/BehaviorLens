import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Animated,
  ActionSheetIOS,
} from "react-native";
import { useEffect, useRef, memo } from "react";
import SlideUpModal from "../../universal/SlideUpModal";
import IntervalTile from "./IntervalTile";
import Info from "./Info";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { IntervalObservationPreset } from "@/src/types/observations/observationTypes";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import { constants } from "@/src/utils/constants";
import { colors } from "@/src/utils/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { useTimer } from "use-timer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IntervalObservationType } from "@/src/types/observations/intervalTypes";
import * as Progress from "react-native-progress";

type Props = {
  preset: IntervalObservationPreset;
};

export default function IntervalObservationModal({ preset }: Props) {
  const { open, clearForm, currentInterval, observations, nextInterval } =
    useIntervalObservationStore();

  const { settings } = useSettingsStore();
  const { clearForm: clearStartForm } = useStartObservationModalStore();

  const {
    observationIntervalSeconds,
    numberOfObservations,
    onTaskList,
    offTaskList,
  } = preset;
  const totalSeconds = observationIntervalSeconds * numberOfObservations;

  const { time, start, pause, status } = useTimer({
    interval: 1000,
    endTime: totalSeconds,
  });
  const borderAnim = useRef(new Animated.Value(2)).current;

  useEffect(() => {
    if (open) start();
  }, [open]);

  useEffect(() => {
    if (time === 0) return;
    if (time % observationIntervalSeconds === 0) {
      nextInterval(numberOfObservations);
    }
  }, [time]);

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: status === "RUNNING" ? 3.3 : 2.3,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [status]);

  function exit() {
    clearForm();
    setTimeout(clearStartForm, constants.modalDelay);
  }

  function togglePause() {
    if (time === totalSeconds) return;
    if (status === "RUNNING") {
      pause();
    } else start();
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={() => {}}
      title="Interval Observation"
      clearForm={exit}
      submitForm={exit}
      scrollable={false}
      padding={0}
      form={
        <IntervalObservation
          observations={observations}
          currentInterval={currentInterval}
          onTaskList={onTaskList}
          offTaskList={offTaskList}
          time={time}
          observationIntervalSeconds={observationIntervalSeconds}
          borderAnim={borderAnim}
          themeColor={settings.themeColor}
          status={status}
          onToggle={togglePause}
        />
      }
    />
  );
}

type BodyProps = {
  observations: IntervalObservationType[];
  currentInterval: number;
  onTaskList: string[];
  offTaskList: string[];
  time: number;
  observationIntervalSeconds: number;
  borderAnim: Animated.Value;
  themeColor: string;
  status: string;
  onToggle: () => void;
};

const IntervalObservation = memo(function IntervalObservationType({
  observations,
  currentInterval,
  onTaskList,
  offTaskList,
  time,
  observationIntervalSeconds,
  borderAnim,
  themeColor,
  status,
  onToggle,
}: BodyProps) {
  return (
    <View style={styles.container}>
      <View style={styles.flatList}>
        <FlatList
          data={observations.slice(0, currentInterval)}
          keyExtractor={(item) => item.id}
          style={{ flexGrow: 0 }}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
          }}
          renderItem={({ item, index }) => (
            <IntervalTile
              index={index}
              observation={item}
              onTaskList={onTaskList}
              offTaskList={offTaskList}
            />
          )}
        />
        <Progress.Bar
          progress={
            (time % observationIntervalSeconds) / observationIntervalSeconds
          }
          height={72}
          width={null}
          color={colors.offWhite}
          borderColor={"white"}
          borderRadius={12}
        />
      </View>

      <View style={styles.controller}>
        <Info
          currentInterval={currentInterval}
          time={time}
          observationIntervalSeconds={observationIntervalSeconds}
        />

        <Pressable onPress={onToggle}>
          <Animated.View
            style={[
              styles.pause,
              {
                borderWidth: borderAnim,
                paddingLeft: status === "RUNNING" ? 0 : 4,
                borderColor: themeColor,
              },
            ]}
          >
            <Ionicons
              name={status === "RUNNING" ? "pause-outline" : "play-outline"}
              size={40}
              color={themeColor}
            />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatList: {
    padding: 20,
    flex: 1,
  },
  controller: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    height: 100,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  pause: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginRight: 20,
  },
});
