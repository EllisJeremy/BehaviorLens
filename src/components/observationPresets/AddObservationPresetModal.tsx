import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import { useObservationPresetStore } from "@/src/state/observations/useObservationsStore";
import { useObservationModalStore } from "@/src/state/observations/useObservationsModalStore";
import { presetBuilder } from "@/src/utils/observationPresets/presetBuilder";
import ObservationPresetForm from "./ObservationPresetForm";

export default function AddObservationPresetModal() {
  const { addObservationPreset } = useObservationPresetStore();
  const { open, setOpen, name, clearForm, uuid } = useObservationModalStore();

  function submitForm() {
    if (!name) return;
    const submitUuid = uuid === "" ? Crypto.randomUUID() : uuid;
    const state = useObservationModalStore.getState();
    const preset = presetBuilder[state.type]({ ...state, uuid: submitUuid });
    addObservationPreset(preset);
    clearForm();
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={setOpen}
      title={uuid === "" ? "Add Preset" : "Edit Preset"}
      form={<ObservationPresetForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}
