import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";
import { useStudentsStore } from "../../state/useStudentsStore";

export default function AddStudentModal() {
  const open = useStudentsStore((s) => s.open);
  const setOpen = useStudentsStore((s) => s.setOpen);
  const addStudentToStore = useStudentsStore((s) => s.addStudent);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState("");

  const addStudent = () => {
    if (!firstName || !lastName || !grade) return;

    addStudentToStore({ firstName, lastName, grade });

    setFirstName("");
    setLastName("");
    setGrade("");
    setOpen(false);
  };

  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => setOpen(false)}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: "92%",
        }}
      >
        <Text style={{ fontSize: 18 }}>Add Student</Text>

        {/* inputs will go here */}

        <Pressable onPress={addStudent}>
          <Text style={{ marginTop: 20 }}>Save</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
