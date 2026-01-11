import SlideUpModal from "../universal/SlideUpModal";
import FormContainer from "../universal/form/FormContainer";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import InputWithLabel from "../universal/form/InputWithLabel";
import { useStudentsStore } from "@/src/state/students/useStudentsStore";
import DropDownMenu, { Option } from "../universal/form/DropDownMenu";
import { View, Text } from "react-native";

function StartObservationForm() {
  const { name, setName, studentUuid, setStudentUuid } =
    useStartObservationModalStore();
  const { students } = useStudentsStore();

  const studentOptions: Option<string>[] = Object.values(students).map((s) => ({
    label: `${s.firstName} ${s.lastName}`,
    value: s.uuid,
  }));

  return (
    <View>
      <FormContainer>
        <InputWithLabel
          placeholder="Enter Name"
          label="Observation Name"
          defaultValue={name}
          onChangeText={setName}
        />
        <DropDownMenu
          title="Assign Student"
          options={studentOptions}
          value={studentUuid}
          setValue={setStudentUuid}
        />
      </FormContainer>
      <FormContainer title="observation details">
        <Text>asd</Text>
      </FormContainer>
    </View>
  );
}
export default function StartObservationModal() {
  const { open, setOpen, name, clearForm } = useStartObservationModalStore();

  function submitForm() {
    if (!name) return;
    console.log("starting...");
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={setOpen}
      title="Start Observation"
      form={<StartObservationForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}
