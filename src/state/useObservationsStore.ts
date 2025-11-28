import { create } from "zustand";
import { loadObject, saveObject } from "../utils/storage";

export type StudentType = {
  uuid: string;
  firstName: string;
  lastName: string;
  grade: string;
};

type StudentsState = {
  students: Record<string, StudentType>;
  open: boolean;

  loadStudents: () => Promise<void>;
  addStudent: (student: StudentType) => void;
  removeStudent: (uuid: string) => void;

  setOpen: (val: boolean) => void;
};

export const useStudentsStore = create<StudentsState>((set, get) => ({
  students: {},
  open: false,

  setOpen: (val) => set({ open: val }),

  loadStudents: async () => {
    const data = await loadObject("students");
    if (data) set({ students: data });
  },

  addStudent: (student: StudentType) => {
    set((state) => {
      const newStudents = {
        ...state.students,
        [student.uuid]: student,
      };

      saveObject("students", newStudents);

      return { students: newStudents };
    });
  },

  removeStudent: (uuid: string) => {
    set((state) => {
      const newStudents = { ...state.students };
      if (uuid in newStudents) {
        delete newStudents[uuid];
      } else {
        console.error("ERROR: there is no student with uuid", uuid);
      }

      saveObject("students", newStudents);

      return { students: newStudents };
    });
  },
}));
