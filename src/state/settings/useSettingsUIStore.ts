import { create } from "zustand";
import { ThemeColor } from "@/src/utils/styles";

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
  themeColor: "blue",
  setThemeColor: (v) => {
    set({ themeColor: v });
  },
}));
