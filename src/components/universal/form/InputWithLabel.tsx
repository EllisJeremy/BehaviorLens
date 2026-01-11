import { colors, fontSizes } from "@/src/utils/styles";
import {
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  View,
  Text,
} from "react-native";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { themeColors } from "@/src/utils/styles";

export default function InputWithLabel({
  defaultValue,
  placeholder,
  onChangeText,
  keyboardType = "default",
  label,
  backgroundColor = colors.offWhite,
}: {
  defaultValue: string;
  placeholder: string;
  onChangeText: (v: string) => void;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  backgroundColor?: string;
}) {
  const { settings } = useSettingsStore();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { backgroundColor }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor },
          { color: settings.themeColor },
        ]}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  input: {
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
    fontSize: fontSizes.text,
    flex: 1,
    textAlign: "right",
  },
  label: {
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
    fontSize: fontSizes.text,
  },
});
