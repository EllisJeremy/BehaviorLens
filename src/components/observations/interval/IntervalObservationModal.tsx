import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Animated,
  ActionSheetIOS,
  Text,
  Easing,
} from "react-native";
import { useEffect, useRef, memo } from "react";
import SlideUpModal from "../../universal/SlideUpModal";
import IntervalTile from "./IntervalTile";
import Controller from "./Controller";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { IntervalObservationPreset } from "@/src/types/observations/observationTypes";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import { constants } from "@/src/utils/constants";
import { colors, fontSizes } from "@/src/utils/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { useTimer } from "use-timer";
import { IntervalObservationType } from "@/src/types/observations/intervalTypes";

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
    if (open) {
      start();
      restartAnimation();
    }
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

  const progress = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(0);

  function startAnimation() {
    Animated.timing(progress, {
      toValue: 1,
      duration: (1 - progressRef.current) * observationIntervalSeconds * 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }

  function pauseAnimation() {
    progress.stopAnimation((value) => {
      progressRef.current = value;
    });
  }

  useEffect(() => {
    if (!open) return;
    restartAnimation();
  }, [currentInterval]);

  function restartAnimation() {
    progress.setValue(0);
    progressRef.current = 0;
    startAnimation();
  }

  function togglePause() {
    if (time === totalSeconds) return;
    if (status === "RUNNING") {
      pause();
      pauseAnimation();
    } else {
      start();
      startAnimation();
    }
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
          numberOfObservations={numberOfObservations}
          onTaskList={onTaskList}
          offTaskList={offTaskList}
          time={time}
          observationIntervalSeconds={observationIntervalSeconds}
          borderAnim={borderAnim}
          themeColor={settings.themeColor}
          status={status}
          onToggle={togglePause}
          progress={progress}
        />
      }
    />
  );
}

type BodyProps = {
  observations: IntervalObservationType[];
  currentInterval: number;
  numberOfObservations: number;
  onTaskList: string[];
  offTaskList: string[];
  time: number;
  observationIntervalSeconds: number;
  borderAnim: Animated.Value;
  themeColor: string;
  status: string;
  progress: Animated.Value;
  onToggle: () => void;
};

const IntervalObservation = memo(function IntervalObservationType({
  observations,
  currentInterval,
  numberOfObservations,
  onTaskList,
  offTaskList,
  time,
  observationIntervalSeconds,
  borderAnim,
  themeColor,
  status,
  onToggle,
  progress,
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
        {currentInterval < numberOfObservations && (
          <View style={styles.progressTile}>
            <Text style={styles.progressTitle}>{`Interval ${
              currentInterval + 1
            }`}</Text>
            <Text style={styles.inProgress}>In progress</Text>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            ></Animated.View>
          </View>
        )}
      </View>
      <Controller
        time={time}
        currentInterval={currentInterval}
        numberOfObservations={numberOfObservations}
        borderAnim={borderAnim}
        themeColor={themeColor}
        status={status}
        onToggle={onToggle}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatList: {
    padding: 20,
    flex: 1,
  },
  progressTile: {
    height: 75,
    borderRadius: 12,
    backgroundColor: colors.offWhite,
    overflow: "hidden",
    justifyContent: "space-between",
    padding: 12,
  },
  progressBar: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    height: 5,
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
  },
  progressTitle: {
    fontSize: fontSizes.text,
    fontWeight: "500",
  },
  inProgress: {
    fontSize: fontSizes.text,
    color: colors.gray,
    width: 200,
  },
});
