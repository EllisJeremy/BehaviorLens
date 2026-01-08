import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import { useObservationPresetStore } from "@/src/state/observationPresets/useObservationsStore";
import { useObservationModalStore } from "@/src/state/observationPresets/useObservationsModalStore";
import { presetBuilder } from "@/src/utils/observationPresets/presetBuilder";

import Input from "../universal/form/Input";
import { View } from "react-native";

function StartObservationForm() {
  return <View></View>;
}
export default function AddObservationPresetModal() {
  const { addObservationPreset } = useObservationPresetStore();
  const { open, setOpen, name, clearForm, uuid } = useObservationModalStore();

  function submitForm() {
    if (!name) return;
    console.log("starting...");
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={setOpen}
      title="Start Observation"
      form={<StartObservationForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}
