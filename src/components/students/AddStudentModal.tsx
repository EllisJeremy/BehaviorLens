import { useStudentsStore } from "../../state/students/useStudentsStore";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";
import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import AddStudentForm from "./AddStudentForm";

export default function AddStudentModal() {
  const { addStudent } = useStudentsStore();
  const { open, setOpen, firstName, lastName, grade, clearForm } =
    useStudentsModalStore();

  function submitForm() {
    if (!firstName) return;
    const uuid = Crypto.randomUUID();
    addStudent({ firstName, lastName, grade, uuid });
    clearForm();
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={setOpen}
      //title={editStudent.uuid === "" ? "Add Student" : "Edit Student"}
      title={"Add Student"}
      form={<AddStudentForm />}
      submitForm={submitForm}
      clearForm={clearForm}
    />
  );
}
