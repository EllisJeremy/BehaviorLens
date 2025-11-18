import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useStudentsStore } from "../../state/useStudentsStore";

export default function AddStudentModal() {
  const { students, setOpen, open, addStudent } = useStudentsStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState("");

  const clearState = () => {
    setFirstName("");
    setLastName("");
    setGrade("");
    setOpen(false);
  };

  const tryAddStudent = () => {
    if (!firstName) return;

    addStudent({ firstName, lastName, grade });
    clearState();
  };

  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => setOpen(false)}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={clearState}>
            <Text style={styles.save}>Cancel</Text>
          </Pressable>

          <Text style={{ fontSize: 18 }}>Add Student</Text>
          <Pressable onPress={tryAddStudent}>
            <Text style={styles.cancel}>Save</Text>
          </Pressable>
        </View>
        <TextInput onChangeText={(text) => setFirstName(text)} />
        <TextInput onChangeText={(text) => setLastName(text)} />
        <TextInput onChangeText={(text) => setGrade(text)} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "92%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  save: {
    color: "green",
  },
  cancel: {
    color: "blue",
  },
});
