import { useStudentsStore } from "../../state/students/useStudentsStore";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";
import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import StudentForm from "./StudentForm";

export default function AddStudentModal() {
  const { addStudent } = useStudentsStore();
  const { open, setOpen, firstName, lastName, grade, uuid, clearForm } =
    useStudentsModalStore();

  function submitForm() {
    if (!firstName) return;
    const submitUuid = uuid === "" ? Crypto.randomUUID() : uuid;
    addStudent({ firstName, lastName, grade, uuid: submitUuid });
    clearForm();
  }

  return (
    <SlideUpModal
      modalOpen={open}
      title={uuid === "" ? "Add Student" : "Edit Student"}
      form={<StudentForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}
