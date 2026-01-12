import { create } from "zustand";

type IntervalObservationState = {
  open: boolean;

  currentInterval: number;
  observations: (string | null)[];
  paused: boolean;
  startedAt: number | null;

  start: (totalIntervals: number) => void;

  setObservation: (index: number, value: string) => void;
  nextInterval: (totalIntervals: number) => void;
  togglePause: () => void;
  cancel: () => void;
};

export const useIntervalObservationStore = create<IntervalObservationState>(
  (set) => ({
    open: false,

    currentInterval: 0,
    observations: [],
    paused: false,
    startedAt: null,

    start: (totalIntervals) =>
      set({
        open: true,
        currentInterval: 0,
        observations: Array(totalIntervals).fill(null),
        paused: false,
        startedAt: Date.now(),
      }),

    setObservation: (index, value) =>
      set((state) => {
        const next = [...state.observations];
        next[index] = value;
        return { observations: next };
      }),

    nextInterval: (totalIntervals) =>
      set((state) => ({
        currentInterval: Math.min(state.currentInterval + 1, totalIntervals),
      })),

    togglePause: () => set((state) => ({ paused: !state.paused })),

    cancel: () =>
      set({
        open: false,
        currentInterval: 0,
        observations: [],
        paused: false,
        startedAt: null,
      }),
  })
);
