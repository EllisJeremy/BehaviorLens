import { create } from "zustand";

type ReportModalStore = {
  filename: string | null;
  setFilename: (v: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;

  clear: () => void;
};

export const useReportModalStore = create<ReportModalStore>((set, get) => ({
  filename: null,
  setFilename: (v: string) => set({ filename: v }),
  open: false,
  setOpen: (v: boolean) => set({ open: v }),

  clear: () => set({ filename: null, open: false }),
}));
