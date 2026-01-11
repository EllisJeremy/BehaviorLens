import { create } from "zustand";
import { loadObject, saveObject } from "../../utils/storage/storage";
import { ObservationPreset } from "@/src/types/observationTypes";

type ObservationPresetStore = {
  observationPresets: Record<string, ObservationPreset>;

  loadObservationPresets: () => Promise<void>;
  addObservationPreset: (observationPreset: ObservationPreset) => void;
  removeObservationPreset: (uuid: string) => void;
};

export const useObservationPresetsStore = create<ObservationPresetStore>(
  (set, get) => ({
    observationPresets: {},

    loadObservationPresets: async () => {
      const data = await loadObject("observationPreset");
      if (data) set({ observationPresets: data });
    },

    addObservationPreset: (observationPreset: ObservationPreset) => {
      set((state) => {
        const newObservationPresets = {
          ...state.observationPresets,
          [observationPreset.uuid]: observationPreset,
        };

        saveObject("observationPreset", newObservationPresets);

        return { observationPresets: newObservationPresets };
      });
    },

    removeObservationPreset: (uuid: string) => {
      set((state) => {
        const newObservationPresets = { ...state.observationPresets };
        if (uuid in newObservationPresets) {
          delete newObservationPresets[uuid];
        } else {
          console.error(
            "ERROR: there is no observation preset with uuid",
            uuid
          );
        }

        saveObject("observationPreset", newObservationPresets);

        return { observationPresets: newObservationPresets };
      });
    },
  })
);
