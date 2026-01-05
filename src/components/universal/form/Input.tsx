import { colors } from "@/src/utils/colors";
import { StyleSheet, TextInput } from "react-native";
import { KeyboardTypeOptions } from "react-native";

export default function Input({
  value,
  placeholder,
  onChangeText,
  keyboardType,
}: {
  value: string;
  placeholder: string;
  onChangeText: (v: string) => void;
  keyboardType?: KeyboardTypeOptions;
}) {
  return (
    <TextInput
      style={styles.input}
      value={value}
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
