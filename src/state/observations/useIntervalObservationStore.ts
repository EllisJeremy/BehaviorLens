import { create } from "zustand";
import { IntervalObservation } from "@/src/types/observations/intervalTypes";

type IntervalObservationState = {
  open: boolean;
  setOpen: (v: boolean) => void;

  currentInterval: number;
  observations: (IntervalObservation | null)[];
  paused: boolean;
  startedAt: number | null;
  seconds: number;

  start: (totalIntervals: number) => void;

  setObservation: (index: number, value: string, isOnTask: boolean) => void;
  nextInterval: (totalIntervals: number) => void;
  togglePause: () => void;
  setSeconds: (v: number) => void;
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
    seconds: 1,

    start: (totalIntervals) =>
      set({
        open: true,
        currentInterval: 0,
        observations: Array(totalIntervals).fill(null),
        paused: false,
        startedAt: Date.now(),
      }),

    setObservation: (index, value, isOnTask) =>
      set((state) => {
        const next = [...state.observations];
        const currObservation: IntervalObservation = {
          isOnTask,
          value,
          timestamp: new Date().toISOString(),
        };
        next[index] = currObservation;
        return { observations: next };
      }),

    nextInterval: (totalIntervals) =>
      set((state) => ({
        currentInterval: Math.min(state.currentInterval + 1, totalIntervals),
      })),

    togglePause: () => set((state) => ({ paused: !state.paused })),
    setSeconds: (v) => set({ seconds: v }),

    clearForm: () =>
      set({
        open: false,
        currentInterval: 0,
        observations: [],
        paused: false,
        startedAt: null,
        seconds: 0,
      }),
  })
);
