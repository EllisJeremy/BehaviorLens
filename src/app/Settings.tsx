import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import FormContainer from "../components/universal/form/FormContainer";
import InputWithLabel from "../components/universal/form/InputWithLabel";
import { useSettingsUIStore } from "../state/settings/useSettingsUIStore";
import { useSettingsStore } from "../state/settings/useSettingsStore";
import { ThemeColor, themeColors, colors } from "../utils/objects/styles";
import DropDownMenu, {
  Option,
} from "../components/universal/form/DropDownMenu";
import { capitalizeFirst } from "../utils/format/capitalizeFirst";

export default function Settings() {
  const { username, setUsername, themeColor, setThemeColor } =
    useSettingsUIStore();
  const { updateSettings } = useSettingsStore();
  const { settings } = useSettingsStore();

  useEffect(() => {
    setUsername(settings.username);
    setThemeColor(settings.themeColor);
  }, [settings]);

  const themeColorOptions: Option<string>[] = Object.entries(themeColors).map(
    ([key, value]) => ({
      label: capitalizeFirst(key),
      value: value,
    }),
  );

  return (
    <View style={styles.container}>
      <FormContainer title="settings" backgroundColor={colors.white}>
        <InputWithLabel
          defaultValue={username}
          placeholder="Enter username"
          onChangeText={(v: string) => {
            updateSettings("username", v);
            setUsername(v);
          }}
          label="Username"
          backgroundColor={colors.white}
        />
        <DropDownMenu
          title="Theme Color"
          options={themeColorOptions}
          value={themeColor}
          setValue={(v: ThemeColor) => {
            updateSettings("themeColor", v);
            setThemeColor(v);
          }}
          backgroundColor={colors.white}
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
