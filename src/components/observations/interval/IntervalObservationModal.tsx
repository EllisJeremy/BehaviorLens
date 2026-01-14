import { ScrollView } from "react-native";
import { useEffect } from "react";
import SlideUpModal from "../../universal/SlideUpModal";
import IntervalTile from "./IntervalTile";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { IntervalObservationPreset } from "@/src/types/observationTypes";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";

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
  const { clearForm } = useStartObservationModalStore();

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
  console.log("here");
  console.log(preset);
  console.log(open);
  function exit() {
    cancel(); // Close the interval modal first

    // Wait for modal animation to complete before clearing preset
    setTimeout(() => {
      clearForm(); // Clear the start observation form
    }, 300);
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={() => {}}
      title="Interval Observation"
      clearForm={exit}
      submitForm={exit} // save handled later
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
