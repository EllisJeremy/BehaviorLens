import { colors, fontSizes } from "@/src/utils/objects/styles";
import { StyleSheet, TextInput, KeyboardTypeOptions } from "react-native";

export default function Input({
  defaultValue,
  placeholder,
  onChangeText,
  keyboardType,
}: {
  defaultValue: string;
  placeholder: string;
  onChangeText: (v: string) => void;
  keyboardType?: KeyboardTypeOptions;
}) {
  return (
    <TextInput
      style={styles.input}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType ? keyboardType : "default"}
      placeholderTextColor={colors.gray}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
    fontSize: fontSizes.text,
  },
});
