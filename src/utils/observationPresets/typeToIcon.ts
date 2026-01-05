import Ionicons from "@expo/vector-icons/Ionicons";
import { ObservationPresetEnum } from "@/src/types/observationTypes";
import { ReactNode } from "react";

export const typeToIcon: Record<ObservationPresetEnum, string> = {
  interval: "timer-edit-outline",
  abc: "alphabet-variant",
};
