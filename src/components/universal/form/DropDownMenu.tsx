import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { colors, fontSizes } from "@/src/utils/styles";
import Popover from "react-native-popover-view";
import { useState } from "react";

export default function DropDownMenu({
  title,
  options,
  value,
  setValue,
  backgroundColor = colors.offWhite,
}: {
  title: string;
  options: string[];
  value: any;
  setValue: (v: any) => void;
  backgroundColor: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={() => setOpen(true)}
    >
      <Text style={styles.text}>{title}</Text>

      <Popover
        isVisible={open}
        onRequestClose={() => setOpen(false)}
        backgroundStyle={{ backgroundColor: "transparent" }}
        popoverStyle={styles.popover}
        arrowSize={{ width: 0, height: 0 }}
        from={
          <View style={styles.button}>
            <Text style={styles.buttonText}>{value}</Text>
            <Entypo style={styles.icon} name="select-arrows" />
          </View>
        }
      >
        <View style={styles.menu}>
          {options.map((opt) => (
            <Pressable
              key={opt}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
              ]}
              onPress={() => {
                setValue(opt);
                setOpen(false);
              }}
            >
              <Text style={styles.text}>{opt}</Text>
              {opt === value && <Entypo style={styles.icon} name="check" />}
            </Pressable>
          ))}
        </View>
      </Popover>
    </Pressable>
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
    color: colors.blue,
  },
  icon: {
    marginTop: 4,
    fontSize: fontSizes.text - 4,
    color: colors.blue,
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
