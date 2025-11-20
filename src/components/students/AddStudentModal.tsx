import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useStudentsStore } from "../../state/useStudentsStore";
import SlideUpModal from "../universal/SlideUpModal";
import { v4 as uuidv4 } from "uuid";

export default function AddStudentModal() {
  const { students, setOpen, open, addStudent } = useStudentsStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState("");

  function clearForm() {
    setFirstName("");
    setLastName("");
    setGrade("");
    setOpen(false);
  }

  function submitForm() {
    if (!firstName) return;
    const uuid = uuidv4();
    addStudent({ firstName, lastName, grade, uuid });
    clearForm();
  }

  function AddStudentForm() {
    return (
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
          placeholder="Last Name"
          placeholderTextColor="#A0A0A0"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setGrade(text)}
          placeholder="Grade"
          placeholderTextColor="#A0A0A0"
        />
      </View>
    );
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={setOpen}
      title="Add Student"
      form={<AddStudentForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}

const styles = StyleSheet.create({
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
