import SlideUpModal from "../universal/SlideUpModal";
import FormContainer from "../universal/form/FormContainer";
import Input from "../universal/form/Input";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import InputWithLabel from "../universal/form/InputWithLabel";
import { useStudentsStore } from "@/src/state/students/useStudentsStore";
import DropDownMenu from "../universal/form/DropDownMenu";

function StartObservationForm() {
  const { name, setName, studentUuid, setStudentUuid } =
    useStartObservationModalStore();
  const { students } = useStudentsStore();
  return (
    <FormContainer>
      <InputWithLabel
        placeholder="Enter Name"
        label="Observation Name"
        defaultValue={name}
        onChangeText={setName}
      />
      <DropDownMenu
        title="Assign Student"
        options={Object.keys(students)}
        value={studentUuid}
        setValue={setStudentUuid}
      />
    </FormContainer>
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
