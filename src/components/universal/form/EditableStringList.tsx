import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { colors, fontSizes } from "@/src/utils/objects/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";

export default function EditableStringList({
  values,
  onAdd,
  onRemove,
  placeholder,
  backgroundColor = colors.offWhite,
}: {
  values: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
  placeholder?: string;
  backgroundColor?: string;
}) {
  const { settings } = useSettingsStore();
  const [draft, setDraft] = useState("");

  function submit() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setDraft("");
  }

  return (
    <View style={styles.container}>
      {values.map((value) => (
        <View key={value} style={styles.row}>
          <Text style={[styles.label, { backgroundColor }]}>{value}</Text>

          <Pressable
            onPress={() => onRemove(value)}
            hitSlop={10}
            style={styles.icon}
          >
            <Feather name="x" size={16} color={colors.red} />
          </Pressable>
        </View>
      ))}

      <View style={styles.row}>
        <TextInput
          value={draft}
          placeholder={placeholder}
          onChangeText={setDraft}
          onSubmitEditing={submit}
          style={[
            styles.input,
            { backgroundColor, color: settings.themeColor },
          ]}
          returnKeyType="done"
          placeholderTextColor={colors.gray}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.offWhite,
  },
  icon: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    paddingVertical: 10,
    fontSize: fontSizes.text,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: fontSizes.text,
  },
});
