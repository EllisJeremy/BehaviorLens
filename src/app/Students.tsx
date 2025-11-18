import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { loadObject, saveObject } from "../utils/storage";
import StudentTile from "../components/students/StudentTile";
import AddStudentModal from "../components/students/AddStudentModal";
import Octicons from "@expo/vector-icons/Octicons";

export type StudentType = {
  firstName: string;
  lastName: string;
  grade: string;
};

export default function Settings() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await loadObject("students");
      if (data) setStudents(data);
    };
    load();
  }, []);

  const addStudent = () => {
    if (!firstName || !lastName || !grade) return;

    const newStudent: StudentType = { firstName, lastName, grade };
    const newList = [...students, newStudent];

    setStudents(newList);
    saveObject("students", newList);
    setFirstName("");
    setLastName("");
    setGrade("");
  };

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
      <AddStudentModal open={open} setOpen={setOpen} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  item: {
    marginTop: 10,
    fontSize: 16,
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
