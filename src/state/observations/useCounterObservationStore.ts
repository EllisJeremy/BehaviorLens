import { create } from "zustand";

type IntervalCounterState = {
  open: boolean;
  setOpen: (v: boolean) => void;

  counter: Record<string, string[]>;
  startedAt: number | null;

  start: (observationsList: string[]) => void;
  clearForm: () => void;
};

export const useIntervalCounterStore = create<IntervalCounterState>((set) => ({
  open: false,
  setOpen: (v) => set({ open: v }),

  counter: {},
  startedAt: null,

  start: (observationsList) =>
    set({
      open: true,
      counter: Object.fromEntries(
        observationsList.map((behavior) => [behavior, []]),
      ),
      startedAt: Date.now(),
    }),

  clearForm: () =>
    set({
      open: false,
      counter: {},
      startedAt: null,
    }),
}));
