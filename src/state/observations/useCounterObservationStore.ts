import { create } from "zustand";

type CounterObservationState = {
  open: boolean;
  setOpen: (v: boolean) => void;

  counter: Record<string, string[]>;
  startedAt: number | null;

  start: (observationsList: string[]) => void;
  clearForm: () => void;
};

export const useCounterObservationStore = create<CounterObservationState>(
  (set) => ({
    open: false,
    setOpen: (v) => set({ open: v }),

    counter: {},
    startedAt: null,

    start: (behaviorsList) =>
      set({
        open: true,
        counter: Object.fromEntries(
          behaviorsList.map((behavior) => [behavior, []]),
        ),
        startedAt: Date.now(),
      }),

    clearForm: () =>
      set({
        open: false,
        counter: {},
        startedAt: null,
      }),
  }),
);
