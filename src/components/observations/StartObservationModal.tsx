import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import { useObservationPresetsStore } from "@/src/state/observationPresets/useObservationPresetsStore";
import { useObservationPresetsModalStore } from "@/src/state/observationPresets/useObservationPresetsModalStore";
import { presetBuilder } from "@/src/utils/observationPresets/presetBuilder";

import Input from "../universal/form/Input";
import { View } from "react-native";

function StartObservationForm() {
  return <View></View>;
}
export default function AddObservationPresetModal() {
  const { addObservationPreset } = useObservationPresetsStore();
  const { open, setOpen, name, clearForm, uuid } =
    useObservationPresetsModalStore();

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
