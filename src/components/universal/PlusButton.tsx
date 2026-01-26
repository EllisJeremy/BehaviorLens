import { StyleSheet, Pressable } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { colors } from "@/src/utils/objects/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { styleConsts } from "@/src/utils/objects/styles";

export default function PlusButton({ onPress }: { onPress: () => void }) {
  const { settings } = useSettingsStore();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.add,
        { backgroundColor: settings.themeColor },
        { opacity: pressed ? styleConsts.opacity : 1 },
      ]}
      onPress={onPress}
    >
      <Octicons name="plus" size={20} color={colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  add: {
    backgroundColor: colors.green,
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 20,
  },
});
