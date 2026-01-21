import { create } from "zustand";

type ReportModalStore = {
  filename: string;
  setFilename: (v: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const useReportModalStore = create<ReportModalStore>((set, get) => ({
  filename: "",
  setFilename: (v: string) => set({ filename: v }),
  open: false,
  setOpen: (v: boolean) => set({ open: v }),
}));
