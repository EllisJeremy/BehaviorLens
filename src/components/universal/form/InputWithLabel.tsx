import { colors, fontSizes } from "@/src/utils/styles";
import {
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  View,
  Text,
} from "react-native";

export default function InputWithLabel({
  defaultValue,
  placeholder,
  onChangeText,
  keyboardType,
  label,
}: {
  defaultValue: string;
  placeholder: string;
  onChangeText: (v: string) => void;
  keyboardType?: KeyboardTypeOptions;
  label: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType ? keyboardType : "default"}
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
    color: colors.blue,
  },
  label: {
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
    fontSize: fontSizes.text,
  },
});
