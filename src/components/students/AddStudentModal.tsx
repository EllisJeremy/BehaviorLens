import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";

type AddStudentModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddStudentModal({
  open,
  setOpen,
}: AddStudentModalProps) {
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
        <Text style={{ fontSize: 18 }}>This is a sheet modal</Text>

        <Pressable onPress={() => setOpen(false)}>
          <Text style={{ marginTop: 20 }}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
