import {
  StyleSheet,
  View,
  FlatList,
  Animated,
  ActionSheetIOS,
  Easing,
} from "react-native";
import { useEffect, useRef, memo } from "react";
import SlideUpModal from "../../universal/SlideUpModal";
import IntervalTile from "./IntervalTile";
import Controller from "../Controller";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { IntervalObservationPreset } from "@/src/types/observations/observationTypes";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import { constants } from "@/src/utils/objects/constants";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { useTimer } from "use-timer";
import { IntervalObservationType } from "@/src/types/observations/intervalTypes";
import * as Crypto from "expo-crypto";
import { IntervalReportType } from "@/src/types/reportsTypes";
import { useReportsStore } from "@/src/state/reports/useReportsStore";
import { savePDF } from "@/src/utils/pdf/storePDF";
import { createPDF } from "@/src/utils/pdf/createPDF";

export default function IntervalObservationModal({
  preset,
}: {
  preset: IntervalObservationPreset;
}) {
  const {
    open,
    clearForm,
    currentInterval,
    observations,
    nextInterval,
    startedAt,
  } = useIntervalObservationStore();

  const { settings } = useSettingsStore();
  const {
    clearForm: clearStartForm,
    name,
    studentUuid,
  } = useStartObservationModalStore();

  const { addReport } = useReportsStore();
  const {
    intervalSeconds,
    totalIntervals,
    onTaskList,
    offTaskList,
    subject,
    educationalSetting,
    instructionalSetting,
  } = preset;
  const totalSeconds = intervalSeconds * totalIntervals;

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
    if (time % intervalSeconds === 0) {
      nextInterval(totalIntervals);
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
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: "Cancel Observation",
        message: "Your progress will not be saved",
        options: ["Continue Observation", "Cancel Observation"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (index: number) => {
        if (index === 1) {
          clearForm();
          setTimeout(clearStartForm, constants.modalDelay);
        }
      },
    );
  }

  function done(time: number) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: "Finish Observation",
        message: "Exit the observation and save the data to a report",
        options: ["Continue Observation", "Finish Observation"],
        cancelButtonIndex: 0,
      },
      async (index: number) => {
        if (index === 1) {
          if (startedAt) {
            const filename = `${name}-${Date.now()}.pdf`;
            const report: IntervalReportType = {
              uuid: Crypto.randomUUID(),
              filename: filename,
              name,
              studentUuid,
              startedAt,
              type: "interval",
              totalSeconds: time,
              subject,
              educationalSetting,
              instructionalSetting,
              totalIntervals,
              finalInterval: currentInterval,
              intervalSeconds,
              observations: observations.splice(0, currentInterval),
            };
            addReport(report);

            const intervalPDF = createPDF(preset.type, report);

            await savePDF(intervalPDF, filename);
          } else {
            console.error("missing timestamp");
          }

          clearForm();
          setTimeout(clearStartForm, constants.modalDelay);
        }
      },
    );
  }

  const progress = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(0);

  function startAnimation() {
    Animated.timing(progress, {
      toValue: 1,
      duration: (1 - progressRef.current) * intervalSeconds * 1000,
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
      saveText="Done"
      modalOpen={open}
      title="Interval Observation"
      clearForm={exit}
      submitForm={() => {
        done(time);
      }}
      scrollable={false}
      padding={0}
      form={
        <IntervalObservation
          observations={observations}
          currentInterval={currentInterval}
          totalIntervals={totalIntervals}
          onTaskList={onTaskList}
          offTaskList={offTaskList}
          time={time}
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
  totalIntervals: number;
  onTaskList: string[];
  offTaskList: string[];
  time: number;
  borderAnim: Animated.Value;
  themeColor: string;
  status: string;
  progress: Animated.Value;
  onToggle: () => void;
};

const IntervalObservation = memo(function IntervalObservationType({
  observations,
  currentInterval,
  totalIntervals,
  onTaskList,
  offTaskList,
  time,
  borderAnim,
  themeColor,
  status,
  onToggle,
  progress,
}: BodyProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={observations.slice(0, currentInterval + 1)}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        renderItem={({ item, index }) => (
          <IntervalTile
            index={index}
            observation={item}
            onTaskList={onTaskList}
            offTaskList={offTaskList}
            currentInterval={currentInterval}
            progress={progress}
            themeColor={themeColor}
          />
        )}
      />
      <Controller
        time={time}
        currentInterval={currentInterval}
        totalIntervals={totalIntervals}
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
    paddingLeft: 20,
    paddingRight: 20,
  },
});
