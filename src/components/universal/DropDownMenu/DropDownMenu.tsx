import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/src/utils/colors";
import Popover from "react-native-popover-view";
import { useState } from "react";

export default function DropDownMenu({
  title,
  options,
  value,
  setValue,
}: {
  title: string;
  options: string[];
  value: string;
  setValue: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>

      <Popover
        isVisible={open}
        onRequestClose={() => setOpen(false)}
        backgroundStyle={{ backgroundColor: "transparent" }}
        popoverStyle={styles.popover}
        arrowSize={{ width: 0, height: 0 }}
        from={
          <Pressable style={styles.button} onPress={() => setOpen(true)}>
            <Text style={styles.buttonText}>{value}</Text>
            <Entypo style={styles.icon} name="select-arrows" />
          </Pressable>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 18,
  },
  buttonText: {
    fontSize: 18,
    color: colors.blue,
  },
  icon: {
    fontSize: 18,
    color: colors.blue,
  },
  menu: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    minWidth: 200,

    gap: 1,
    overflow: "hidden",
  },
  menuItem: {
    fontSize: 200,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.lighterGray,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuItemPressed: {
    backgroundColor: colors.lightGray,
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
