import { ObservationPresetEnum } from "@/src/types/observations/observationTypes";
import stopwatch from "@/assets/stopwatch.png";
import abcSquares from "@/assets/abcSquares.png";

export const typeToIcon: Record<ObservationPresetEnum, any> = {
  interval: stopwatch,
  abc: abcSquares,
};
