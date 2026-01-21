import { ObservationPresetEnum } from "@/src/types/observations/observationTypes";
import stopwatch from "@/assets/stopwatch.png";
import abcSquares from "@/assets/abcSquares.png";
import { ImageSourcePropType } from "react-native";

export const typeToIcon: Record<ObservationPresetEnum, ImageSourcePropType> = {
  interval: stopwatch,
  counter: abcSquares,
};
