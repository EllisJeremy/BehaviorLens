import { colors } from "@/src/utils/colors";
import { StyleSheet, TextInput } from "react-native";
import { KeyboardTypeOptions } from "react-native";

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
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
    fontSize: 18,
  },
});
