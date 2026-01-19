import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import { useObservationPresetsStore } from "@/src/state/observationPresets/useObservationPresetsStore";
import { useObservationPresetsModalStore } from "@/src/state/observationPresets/useObservationPresetsModalStore";
import { presetBuilder } from "@/src/utils/observationPresets/presetBuilder";
import ObservationPresetForm from "./ObservationPresetForm";

export default function AddObservationPresetModal() {
  const { addObservationPreset } = useObservationPresetsStore();
  const { open, setOpen, name, clearForm, uuid } =
    useObservationPresetsModalStore();

  function submitForm() {
    if (!name) return;
    const submitUuid = uuid === "" ? Crypto.randomUUID() : uuid;
    const state = useObservationPresetsModalStore.getState();
    const preset = presetBuilder[state.type]({ ...state, uuid: submitUuid });
    addObservationPreset(preset);
    clearForm();
  }

  return (
    <SlideUpModal
      modalOpen={open}
      title={uuid === "" ? "Add Preset" : "Edit Preset"}
      form={<ObservationPresetForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}
