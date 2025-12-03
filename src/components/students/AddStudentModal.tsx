import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useStudentsStore } from "../../state/students/useStudentsStore";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";
import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";

export default function AddStudentModal() {
  const { addStudent } = useStudentsStore();
  const {
    open,
    setOpen,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    grade,
    setGrade,
    prevUUID,
    clearForm,
  } = useStudentsModalStore();

  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);
  const [localGrade, setLocalGrade] = useState(grade);

  useEffect(() => {
    setLocalFirstName(firstName);
    setLocalLastName(lastName);
    setLocalGrade(grade);
  }, [open, prevUUID]);

  function submitForm() {
    if (!firstName) return;
    const uuid = prevUUID === "" ? Crypto.randomUUID() : prevUUID;
    addStudent({ firstName, lastName, grade, uuid });
    clearForm();
  }
  function AddStudentForm() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLocalFirstName(text)}
          placeholder="First Name"
          placeholderTextColor="#A0A0A0"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLocalLastName(text)}
          placeholder="Last Name"
          placeholderTextColor="#A0A0A0"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLocalGrade(text)}
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
      title={prevUUID === "" ? "Add Student" : "Edit Student"}
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
