import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { loadObject, saveObject } from "../utils/storage";
import StudentTile from "../components/students/StudentTile";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
});
