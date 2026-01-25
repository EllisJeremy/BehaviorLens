import { useStudentsStore } from "../../state/students/useStudentsStore";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";
import SlideUpModal from "../universal/SlideUpModal";
import * as Crypto from "expo-crypto";
import StudentForm from "./StudentForm";
import { useMemo } from "react";

export default function AddStudentModal() {
  const { addStudent } = useStudentsStore();
  const { open, firstName, lastName, grade, uuid, clearForm } =
    useStudentsModalStore();

  function submitForm() {
    if (!firstName) return;
    const submitUuid = uuid === "" ? Crypto.randomUUID() : uuid;
    addStudent({ firstName, lastName, grade, uuid: submitUuid });
    clearForm();
  }

  const canSubmit = useMemo(
    () => Boolean(firstName !== "" && lastName !== "" && grade !== ""),
    [firstName, lastName, grade],
  );

  return (
    <SlideUpModal
      modalOpen={open}
      title={uuid === "" ? "Add Student" : "Edit Student"}
      form={<StudentForm />}
      submitForm={submitForm}
      canSubmit={canSubmit}
      clearForm={clearForm}
    />
  );
}
