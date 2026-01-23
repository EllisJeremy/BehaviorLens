import { create } from "zustand";

type CounterObservationState = {
  open: boolean;
  setOpen: (v: boolean) => void;

  counter: Record<string, number[]>;
  startedAt: number | null;

  start: (observationsList: string[]) => void;
  pushCount: (observation: string) => void;
  popCount: (observation: string) => void;
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

    pushCount: (observation) => {
      set((state) => ({
        counter: {
          ...state.counter,
          [observation]: [...state.counter[observation], Date.now()],
        },
      }));
    },

    popCount: (observation) => {
      set((state) => ({
        counter: {
          ...state.counter,
          [observation]: state.counter[observation].slice(0, -1),
        },
      }));
    },

    clearForm: () =>
      set({
        open: false,
        counter: {},
        startedAt: null,
      }),
  }),
);
