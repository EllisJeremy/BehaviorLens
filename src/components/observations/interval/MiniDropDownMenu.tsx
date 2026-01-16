import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { colors, fontSizes, themeColors } from "@/src/utils/styles";
import Popover from "react-native-popover-view";
import { useState } from "react";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";

export type Option<T = string> = {
  label: string;
  value: T;
};

export default function MiniDropDownMenu<T extends string>({
  options,
  setValue,
  index,
  backgroundColor = colors.offWhite,
  isOnTask,
}: {
  options: Option<T>[];
  setValue: (index: number, value: string, isOnTask: boolean) => void;
  index: number;
  backgroundColor?: string;
  isOnTask: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { settings } = useSettingsStore();

  return (
    <Popover
      isVisible={open}
      onRequestClose={() => setOpen(false)}
      backgroundStyle={{ backgroundColor: "transparent" }}
      popoverStyle={styles.popover}
      arrowSize={{ width: 0, height: 0 }}
      from={
        <Pressable style={styles.button} onPress={() => setOpen(true)}>
          <Text style={[styles.buttonText, { color: settings.themeColor }]}>
            {isOnTask ? "On Task" : "Off Task"}
          </Text>
          <Entypo
            style={[styles.icon, { color: settings.themeColor }]}
            name="select-arrows"
          />
        </Pressable>
      }
    >
      <Pressable style={styles.menu}>
        {options.map((opt) => (
          <Pressable
            key={opt.value}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.menuItemPressed,
            ]}
            onPress={() => {
              setValue(index, opt.value, isOnTask);
              setOpen(false);
            }}
          >
            <Text style={styles.text}>{opt.label}</Text>
          </Pressable>
        ))}
      </Pressable>
    </Popover>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offWhite,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  text: {
    fontSize: fontSizes.text,
  },
  buttonText: {
    fontSize: fontSizes.text,
  },
  icon: {
    marginTop: 4,
    fontSize: fontSizes.text - 4,
  },
  menu: {
    backgroundColor: colors.lighterGray,
    borderRadius: 12,
    minWidth: 200,
    gap: 1,
    overflow: "hidden",
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuItemPressed: {
    backgroundColor: colors.lighterGray,
  },
  popover: {
    backgroundColor: "transparent",
    marginHorizontal: -10,

    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
  },
});
