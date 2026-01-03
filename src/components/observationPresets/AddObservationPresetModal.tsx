import { View, TextInput, StyleSheet } from "react-native";
import { useStudentsStore } from "../../state/students/useStudentsStore";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";
import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import { useObservationPresetStore } from "@/src/state/observations/useObservationsStore";
import { useObservationModalStore } from "@/src/state/observations/useObservationsModalStore";

export default function AddObservationPresetModal() {
  const { addObservationPreset } = useObservationPresetStore();
  const {
    open,
    setOpen,
    name,
    setName,
    type,
    setType,
    numberOfObservations,
    setNumberOfObservations,
    observationIntervalSeconds,
    setObservationIntervalSeconds,
    clearForm,
  } = useObservationModalStore();

  function submitForm() {
    if (!name) return;

    clearForm();
  }

  function AddStudentForm() {
    const fields = [
      {
        value: firstNameRef,
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
