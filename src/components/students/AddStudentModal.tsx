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
    const fields = [
      {
        value: prevFirstName,
        placeholder: "First Name",
        onChange: setFirstName,
      },
      { value: prevLastName, placeholder: "Last Name", onChange: setLastName },
      { value: prevGrade, placeholder: "Grade", onChange: setGrade },
    ];

    return (
      <View style={styles.inputContainer}>
        {fields.map((field, i) => (
          <TextInput
            key={i}
            style={[
              styles.input,
              i < fields.length - 1 && styles.inputSeparator,
            ]}
            defaultValue={field.value}
            onChangeText={field.onChange}
            placeholder={field.placeholder}
            placeholderTextColor="#A0A0A0"
          />
        ))}
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
    backgroundColor: "rgba(240,240,240,1)",
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  input: {
    paddingVertical: 10,
  },
  inputSeparator: {
    borderBottomWidth: 1,
    borderColor: "rgba(197,197,197,1)",
  },
});
