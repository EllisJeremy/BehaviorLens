import { useStudentsStore } from "@/src/state/students/useStudentsStore";
import { useStudentsModalStore } from "@/src/state/students/useStudentsModalStore";

import { StudentType } from "@/src/types/studentType";
import Tile from "../universal/Tile";
export default function StudentTile({ student }: { student: StudentType }) {
  const { removeStudent } = useStudentsStore();
  const { setFirstName, setLastName, setGrade, setOpen, setUuid } =
    useStudentsModalStore();

  function onEdit() {
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setGrade(student.grade);
    setUuid(student.uuid);
    setOpen(true);
  }
  function onRemove() {
    removeStudent(student.uuid);
  }

  return (
    <Tile
      title={student.firstName + " " + student.lastName}
      subTitle={student.grade !== "" ? "grade" + student.grade : ""}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
}
