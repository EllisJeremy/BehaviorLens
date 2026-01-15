import { create } from "zustand";
import { IntervalObservation } from "@/src/types/observations/intervalTypes";

type IntervalObservationState = {
  open: boolean;
  setOpen: (v: boolean) => void;

  currentInterval: number;
  observations: (IntervalObservation | null)[];
  paused: boolean;
  startedAt: number | null;

  start: (totalIntervals: number) => void;

  setObservation: (index: number, observation: IntervalObservation) => void;
  nextInterval: (totalIntervals: number) => void;
  togglePause: () => void;
  clearForm: () => void;
};

export const useIntervalObservationStore = create<IntervalObservationState>(
  (set) => ({
    open: false,
    setOpen: (v) => set({ open: v }),

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

    clearForm: () =>
      set({
        open: false,
        currentInterval: 0,
        observations: [],
        paused: false,
        startedAt: null,
      }),
  })
);
