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
  const { settings } = useSettingsStore();

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
