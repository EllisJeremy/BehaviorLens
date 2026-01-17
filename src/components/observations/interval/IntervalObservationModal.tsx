import { ScrollView, StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect } from "react";
import SlideUpModal from "../../universal/SlideUpModal";
import IntervalTile from "./IntervalTile";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { IntervalObservationPreset } from "@/src/types/observations/observationTypes";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import { constants } from "@/src/utils/constants";
import { IntervalObservation } from "@/src/types/observations/intervalTypes";
import { colors } from "@/src/utils/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { useTimer } from "use-timer";
import { timeFormatter } from "@/src/utils/timeFormatter";

export default function IntervalObservationModal({
  preset,
}: {
  preset: IntervalObservationPreset;
}) {
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

  const { time, start, pause, reset } = useTimer({
    interval: 1000,
  });

  useEffect(() => {
    if (open) {
      start();
    }
  }, [open]);

  useEffect(() => {
    if (time === 0) return;

    if (time % observationIntervalSeconds === 0) {
      nextInterval(numberOfObservations);
    }
  }, [time]);

  function exit() {
    clearForm();

    setTimeout(() => {
      clearStartForm();
    }, constants.modalDelay);
  }

  function IntervalObservation() {
    return (
      <View style={styles.container}>
        <FlatList
          data={observations.slice(0, currentInterval)}
          keyExtractor={(_, i) => i.toString()}
          style={styles.flatlist}
          renderItem={({ item, index }) => (
            <IntervalTile
              index={index}
              observation={item}
              onTaskList={onTaskList}
              offTaskList={offTaskList}
            />
          )}
        />

        <View
          style={[styles.controller, { borderTopColor: settings.themeColor }]}
        >
          <Text>{currentInterval}</Text>
          <Text>{timeFormatter(time)}</Text>
          <Text>
            {observationIntervalSeconds - (time % observationIntervalSeconds)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={() => {}}
      title="Interval Observation"
      clearForm={exit}
      submitForm={exit}
      form={<IntervalObservation />}
      scrollable={false}
      padding={0}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    padding: 20,
  },
  controller: {
    borderTopWidth: 1,

    height: 100,

    marginBottom: 25,
  },
});
