import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FormContainer from "../components/universal/form/FormContainer";
import InputWithLabel from "../components/universal/form/InputWithLabel";
import { useSettingsUIStore } from "../state/settings/useSettingsUIStore";
import { useSettingsStore } from "../state/settings/useSettingsStore";
import DropDownMenu from "../components/universal/form/DropDownMenu";
import { ThemeColor, themeColors } from "../utils/styles";

export default function Settings() {
  const { username, setUsername, themeColor, setThemeColor } =
    useSettingsUIStore();
  const { updateSettings } = useSettingsStore();
  return (
    <View style={styles.container}>
      <FormContainer title="settings" backgroundColor="white">
        <InputWithLabel
          defaultValue={username}
          placeholder="enter username"
          onChangeText={(v: string) => {
            updateSettings("username", v);
            setUsername(v);
          }}
          label="Username"
          backgroundColor="white"
        />
        <DropDownMenu
          title="Theme Color"
          options={Object.keys(themeColors)}
          value={themeColor}
          setValue={(v: ThemeColor) => {
            updateSettings("themeColor", v);
            setThemeColor(v);
          }}
          backgroundColor="white"
        />
      </FormContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
});
