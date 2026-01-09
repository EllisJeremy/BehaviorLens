import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FormContainer from "../components/universal/form/FormContainer";
import InputWithLabel from "../components/universal/form/InputWithLabel";
import { useSettingsUIStore } from "../state/settings/useSettingsUIStore";
import { useSettingsStore } from "../state/settings/useSettingsStore";
import DropDownMenu from "../components/universal/form/DropDownMenu";
import { themeColors } from "../utils/styles";

export default function Settings() {
  const { username, setUsername, themeColor, setThemeColor } =
    useSettingsUIStore();
  return (
    <View style={styles.container}>
      <FormContainer title="settings" backgroundColor="white">
        <InputWithLabel
          defaultValue={username}
          placeholder="enter username"
          onChangeText={(v: string) => setUsername(v)}
          label="Username"
          backgroundColor="white"
        />
        <DropDownMenu
          title="Theme Color"
          options={Object.keys(themeColors)}
          value={themeColor}
          setValue={setThemeColor}
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
