import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import { useObservationPresetStore } from "@/src/state/observations/useObservationsStore";
import { useObservationModalStore } from "@/src/state/observations/useObservationsModalStore";
import { presetBuilder } from "@/src/utils/observationPresets/presetBuilder";
import ObservationPresetForm from "./ObservationPresetForm";

export default function AddObservationPresetModal() {
  const { addObservationPreset } = useObservationPresetStore();
  const { open, setOpen, name, clearForm } = useObservationModalStore();

  function submitForm() {
    if (!name) return;
    const uuid = Crypto.randomUUID();
    const state = useObservationModalStore.getState();
    const preset = presetBuilder[state.type]({ ...state, uuid });
    addObservationPreset(preset);
    clearForm();
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={setOpen}
      title="observation preset"
      form={<ObservationPresetForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}
