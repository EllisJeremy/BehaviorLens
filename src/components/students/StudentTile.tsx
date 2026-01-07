import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActionSheetIOS,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import {
  useStudentsStore,
  StudentType,
} from "@/src/state/students/useStudentsStore";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";
import { colors, fontSizes } from "@/src/utils/styles";

export default function StudentTile({
  uuid,
  firstName,
  lastName,
  grade,
}: StudentType) {
  const { removeStudent } = useStudentsStore();
  const { setFirstName, setLastName, setGrade, setOpen, setUuid } =
    useStudentsModalStore();
  return (
    <View style={styles.tile}>
      <View style={styles.info}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {firstName} {lastName}
        </Text>
        <Text style={styles.subText}>Grade {grade}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.iconButton}
          onPress={() => {
            setFirstName(firstName);
            setLastName(lastName);
            setGrade(grade);
            setUuid(uuid);
            setOpen(true);
          }}
        >
          <Octicons name="pencil" size={20} color="white" />
        </Pressable>

        <Pressable
          style={[styles.iconButton, styles.deleteButton]}
          onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ["Cancel", "Delete"],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
              },
              (index: number) => {
                if (index === 1) removeStudent(uuid);
              }
            );
          }}
        >
          <Octicons name="trash" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderColor: "#d6d6d6ff",
    width: "100%",
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  info: {
    flexShrink: 1,
    flex: 1,
  },
  text: {
    fontSize: fontSizes.text,
    fontWeight: "600",
    color: "#333",
  },
  subText: {
    fontSize: fontSizes.subText,
    color: colors.darkGray,
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    backgroundColor: colors.blue,
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: colors.red,
  },
});
