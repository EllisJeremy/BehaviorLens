import { Platform, useWindowDimensions } from "react-native";

export function useDeviceClass() {
  const { width } = useWindowDimensions();

  const isTablet = Platform.OS === "ios" && width >= 768;

  return { isTablet };
}
