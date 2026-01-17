import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useEffect } from "react";
import SlideUpModal from "../../universal/SlideUpModal";
import IntervalTile from "./IntervalTile";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { IntervalObservationPreset } from "@/src/types/observations/observationTypes";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import { constants } from "@/src/utils/constants";
import { IntervalObservation } from "@/src/types/observations/intervalTypes";

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
    setObservation,
    paused,
  } = useIntervalObservationStore();

  const { clearForm: clearStartForm } = useStartObservationModalStore();

  const {
    observationIntervalSeconds,
    numberOfObservations,
    onTaskList,
    offTaskList,
  } = preset;

  useEffect(() => {
    if (!open || paused) return;
    if (currentInterval >= numberOfObservations) return;

    const id = setTimeout(
      () => nextInterval(numberOfObservations),
      observationIntervalSeconds * 1000
    );

    return () => clearTimeout(id);
  }, [
    open,
    paused,
    currentInterval,
    observationIntervalSeconds,
    numberOfObservations,
  ]);

  function exit() {
    clearForm();

    setTimeout(() => {
      clearStartForm();
    }, constants.modalDelay);
  }

  function IntervalObservation() {
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {Array.from({ length: currentInterval }).map((_, i) => (
            <IntervalTile
              key={i}
              index={i}
              observation={observations[i]}
              onTaskList={onTaskList}
              offTaskList={offTaskList}
            />
          ))}
        </ScrollView>

        <View style={styles.controller}>
          <Text>{currentInterval}</Text>
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
    />
  );
}

const styles = StyleSheet.create({
  controller: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
