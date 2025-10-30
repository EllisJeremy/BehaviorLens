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

type Student = {
  firstName: string;
  lastName: string;
  grade: string;
};

export default function Settings() {
  const [students, setStudents] = useState<Student[]>([]);
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

    const newStudent: Student = { firstName, lastName, grade };
    const newList = [...students, newStudent];

    setStudents(newList);
    saveObject("students", newList);
    setFirstName("");
    setLastName("");
    setGrade("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Grade"
        value={grade}
        onChangeText={setGrade}
        style={styles.input}
      />
      <Button title="Add Student" onPress={addStudent} />

      <FlatList
        data={students}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.firstName} {item.lastName} - Grade {item.grade}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
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
