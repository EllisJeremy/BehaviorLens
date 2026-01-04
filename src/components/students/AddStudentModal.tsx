import { View, TextInput, StyleSheet } from "react-native";
import { useStudentsStore } from "../../state/students/useStudentsStore";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";
import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import { colors } from "@/src/utils/colors";

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
    clearForm,
    editStudent,
  } = useStudentsModalStore();

  function submitForm() {
    if (!firstName) return;
    const uuid =
      editStudent.uuid === "" ? Crypto.randomUUID() : editStudent.uuid;
    addStudent({ firstName, lastName, grade, uuid });
    clearForm();
  }

  function AddStudentForm() {
    const fields = [
      {
        value: editStudent.firstName,
        placeholder: "First Name",
        onChange: setFirstName,
      },
      {
        value: editStudent.lastName,
        placeholder: "Last Name",
        onChange: setLastName,
      },
      { value: editStudent.grade, placeholder: "Grade", onChange: setGrade },
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
      title={editStudent.uuid === "" ? "Add Student" : "Edit Student"}
      form={<AddStudentForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.offWhite,
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
    borderColor: colors.lightGray,
  },
});
