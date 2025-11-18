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
            <Text style={styles.cancel}> {"  Save"}</Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First Name"
            placeholderTextColor="#A0A0A0"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLastName(text)}
            placeholder="First Name"
            placeholderTextColor="#A0A0A0"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLastName(text)}
            placeholder="First Name"
            placeholderTextColor="#A0A0A0"
          />
        </View>
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
    color: "rgba(45, 164, 255, 1)",
    fontSize: 16,
  },
  cancel: {
    color: "rgba(45, 164, 255, 1)",
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: "rgba(240, 240, 240, 1)",
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "rgba(197, 197, 197, 1)",
  },
});
