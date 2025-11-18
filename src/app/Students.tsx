import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Pressable } from "react-native";
import StudentTile from "../components/students/StudentTile";
import AddStudentModal from "../components/students/AddStudentModal";
import Octicons from "@expo/vector-icons/Octicons";
import { useStudentsStore } from "../state/useStudentsStore";

export default function Students() {
  const students = useStudentsStore((s) => s.students);
  const loadStudents = useStudentsStore((s) => s.loadStudents);
  const open = useStudentsStore((s) => s.open);
  const setOpen = useStudentsStore((s) => s.setOpen);

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flexGrow: 0, borderTopWidth: 1, borderColor: "#d6d6d6ff" }}
        data={students}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <StudentTile
            firstName={item.firstName}
            lastName={item.lastName}
            grade={item.grade}
          />
        )}
      />

      <Pressable style={styles.add} onPress={() => setOpen(true)}>
        <Octicons name="plus" size={20} color="white" />
      </Pressable>

      <AddStudentModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-end",
  },
  add: {
    backgroundColor: "rgba(12, 185, 0, 1)",
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 20,
  },
});
