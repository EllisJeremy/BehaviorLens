import FormContainer from "../universal/form/FormContainer";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";
import InputWithLabel from "../universal/form/InputWithLabel";
import DropDownMenu, { Option } from "../universal/form/DropDownMenu";
import { listToOptions } from "@/src/utils/format/listToOptions";

const gradeOptions: Option<string>[] = listToOptions([
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "Freshmen",
  "Sophomore",
  "Junior",
  "Senior",
  "Other",
]);

export default function StudentForm() {
  const { firstName, setFirstName, lastName, setLastName, grade, setGrade } =
    useStudentsModalStore();

  return (
    <FormContainer>
      <InputWithLabel
        key={"firstName"}
        defaultValue={firstName}
        onChangeText={setFirstName}
        placeholder={"Enter First Name"}
        label={"First Name"}
      />
      <InputWithLabel
        key={"lastName"}
        defaultValue={lastName}
        onChangeText={setLastName}
        placeholder={"Enter Last Name"}
        label={"Last Name"}
      />
      <DropDownMenu
        key={"grade"}
        title={"Grade"}
        value={grade}
        setValue={setGrade}
        options={gradeOptions}
      />
    </FormContainer>
  );
}
