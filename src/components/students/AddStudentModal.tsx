import { View, TextInput, StyleSheet } from "react-native";
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
    prevFirstName,
    prevLastName,
    prevGrade,
  } = useStudentsModalStore();

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
          onChangeText={(text) => setFirstName(text)}
          defaultValue={prevFirstName}
          placeholder="First Name"
          placeholderTextColor="#A0A0A0"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          defaultValue={prevLastName}
          placeholder="Last Name"
          placeholderTextColor="#A0A0A0"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setGrade(text)}
          defaultValue={prevGrade}
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
