import { ScrollView } from "react-native";
import { useEffect } from "react";
import SlideUpModal from "../../universal/SlideUpModal";
import IntervalTile from "./IntervalTile";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { IntervalObservationPreset } from "@/src/types/observationTypes";

export default function IntervalObservationModal({
  preset,
}: {
  preset: IntervalObservationPreset;
}) {
  const {
    open,
    cancel,
    currentInterval,
    observations,
    nextInterval,
    setObservation,
    paused,
  } = useIntervalObservationStore();

  const {
    observationIntervalSeconds,
    numberOfObservations,
    onTaskList,
    offTaskList,
  } = preset;

  // interval timer
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

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={() => {}}
      title="Interval Observation"
      clearForm={cancel}
      submitForm={cancel} // save handled later
      form={
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {Array.from({ length: currentInterval }).map((_, i) => (
            <IntervalTile
              key={i}
              index={i}
              value={observations[i]}
              onTaskList={onTaskList}
              offTaskList={offTaskList}
              setValue={(v) => setObservation(i, v)}
            />
          ))}
        </ScrollView>
      }
    />
  );
}
