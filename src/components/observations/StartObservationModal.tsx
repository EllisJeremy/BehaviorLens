import SlideUpModal from "../universal/SlideUpModal";
import FormContainer from "../universal/form/FormContainer";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import InputWithLabel from "../universal/form/InputWithLabel";
import { useStudentsStore } from "@/src/state/students/useStudentsStore";
import DropDownMenu, { Option } from "../universal/form/DropDownMenu";
import { View } from "react-native";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { constants } from "@/src/utils/constants";

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
    </View>
  );
}
export default function StartObservationModal() {
  const { open, setOpen, name, studentUuid, clearForm, preset } =
    useStartObservationModalStore();
  const { start: startInterval } = useIntervalObservationStore();

  function submitForm() {
    if (!name || !studentUuid || !preset) {
      return;
    }

    setOpen(false);

    setTimeout(() => {
      if (preset.type === "interval") startInterval(preset.totalIntervals);
      if (preset.type === "counter") return;
    }, constants.modalDelay);
  }

  return (
    <SlideUpModal
      modalOpen={open}
      saveText="Start"
      title="Start Observation"
      form={<StartObservationForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}
