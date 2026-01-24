import { create } from "zustand";
import { ThemeColor } from "@/src/utils/objects/styles";

type SettingsUIStore = {
  username: string;
  setUsername: (v: string) => void;
  themeColor: ThemeColor;
  setThemeColor: (v: ThemeColor) => void;
};

export const useSettingsUIStore = create<SettingsUIStore>((set) => ({
  username: "",
  setUsername: (v) => {
    set({ username: v });
  },
  themeColor: "rgb(45, 164, 255)",
  setThemeColor: (v) => {
    set({ themeColor: v });
  },
}));
