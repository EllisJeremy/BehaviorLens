import { create } from "zustand";
import { loadObject, saveObject } from "../../utils/storage/storage";
import { SettingsType } from "@/src/types/settingsType";

type SettingsStore = {
  settings: SettingsType;

  loadSettings: () => Promise<void>;
  updateSettings: <K extends keyof SettingsType>(
    key: K,
    value: SettingsType[K]
  ) => void;
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: {
    username: "",
    themeColor: "blue",
  },

  loadSettings: async () => {
    const data = await loadObject("settings");
    if (data) set({ settings: data });
  },

  updateSettings: (key, value) => {
    set((state) => {
      const newSettings = {
        ...state.settings,
        [key]: value,
      };

      saveObject("observationPreset", newSettings);

      return { settings: newSettings };
    });
  },
}));
