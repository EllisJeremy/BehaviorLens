import {
  StyleSheet,
  View,
  Animated,
  ActionSheetIOS,
  FlatList,
} from "react-native";
import { useEffect, useRef, memo } from "react";
import SlideUpModal from "../../universal/SlideUpModal";
import Controller from "../Controller";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import { constants } from "@/src/utils/objects/constants";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { useTimer } from "use-timer";
import * as Crypto from "expo-crypto";
import { CounterReportType } from "@/src/types/reportsTypes";
import { useReportsStore } from "@/src/state/reports/useReportsStore";
import { savePDF } from "@/src/utils/pdf/storePDF";
import { createPDF } from "@/src/utils/pdf/createPDF";
import { CounterObservationPreset } from "@/src/types/observations/observationTypes";
import { useCounterObservationStore } from "@/src/state/observations/useCounterObservationStore";
import { CounterType } from "@/src/state/observations/useCounterObservationStore";
import CounterTile from "./CounterTile";

export default function CounterObservationModal({
  preset,
}: {
  preset: CounterObservationPreset;
}) {
  const { open, clearForm, startedAt, counter } = useCounterObservationStore();

  const { settings } = useSettingsStore();
  const {
    clearForm: clearStartForm,
    name,
    studentUuid,
  } = useStartObservationModalStore();

  const { addReport } = useReportsStore();
  const { totalMins, subject, educationalSetting, instructionalSetting } =
    preset;
  const totalSeconds = totalMins * 60;

  const { time, start, pause, status } = useTimer({
    interval: 1000,
    endTime: totalSeconds,
  });
  const borderAnim = useRef(new Animated.Value(2)).current;

  useEffect(() => {
    if (open) {
      start();
    }
  }, [open]);

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
            const report: CounterReportType = {
              uuid: Crypto.randomUUID(),
              filename: filename,
              name,
              studentUuid,
              startedAt,
              type: "counter",
              subject,
              educationalSetting,
              instructionalSetting,
              totalSeconds: time,
              counter,
            };
            addReport(report);

            const counterPDF = createPDF(preset.type, report);

            await savePDF(counterPDF, filename);
          } else {
            console.error("missing timestamp");
          }

          clearForm();
          setTimeout(clearStartForm, constants.modalDelay);
        }
      },
    );
  }

  function togglePause() {
    if (time === totalSeconds) return;
    if (status === "RUNNING") {
      pause();
    } else {
      start();
    }
  }

  return (
    <SlideUpModal
      saveText="Done"
      modalOpen={open}
      title="Counter Observation"
      clearForm={exit}
      submitForm={() => {
        done(time);
      }}
      canSubmit={true}
      scrollable={false}
      padding={0}
      form={
        <CounterObservation
          counter={counter}
          time={time}
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
  counter: CounterType;
  time: number;
  borderAnim: Animated.Value;
  themeColor: string;
  status: string;
  onToggle: () => void;
};

const CounterObservation = memo(function IntervalObservationType({
  counter,
  time,
  borderAnim,
  themeColor,
  status,
  onToggle,
}: BodyProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(counter)}
        keyExtractor={(item) => item}
        style={styles.flatList}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
        renderItem={({ item }) => (
          <CounterTile
            key={item}
            behavior={item}
            status={status}
            secondsPassed={time}
          />
        )}
      />

      <Controller
        time={time}
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
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
