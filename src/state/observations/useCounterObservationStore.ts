import { create } from "zustand";
import { CounterObservationType } from "@/src/types/observations/counterTypes";

export type CounterType = Record<string, CounterObservationType[]>;

type CounterObservationState = {
  open: boolean;
  setOpen: (v: boolean) => void;

  counter: CounterType;
  startedAt: number | null;

  start: (observationsList: string[]) => void;
  pushCount: (observation: string, secondsPassed: number) => void;
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

    pushCount: (observation, secondsPassed) => {
      set((state) => ({
        counter: {
          ...state.counter,
          [observation]: [
            ...state.counter[observation],
            { timestamp: Date.now(), secondsPassed },
          ],
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
