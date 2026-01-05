import Input from "../universal/form/Input";
import FormContainer from "../universal/form/FormContainer";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";

export default function StudentForm() {
  const { firstName, setFirstName, lastName, setLastName, grade, setGrade } =
    useStudentsModalStore();

  return (
    <FormContainer>
      <Input
        key={"firstName"}
        defaultValue={firstName}
        onChangeText={setFirstName}
        placeholder={"First Name"}
      />
      <Input
        key={"lastName"}
        defaultValue={lastName}
        onChangeText={setLastName}
        placeholder={"Last Name"}
      />
      <Input
        key={"grade"}
        defaultValue={grade}
        onChangeText={setGrade}
        placeholder={"grade"}
      />
    </FormContainer>
  );
}
