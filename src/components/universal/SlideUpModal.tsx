import { View, Text, Pressable, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default function SlideUpModal({
  modalOpen,
  setModalOpen,
  title,
  form,
  submitForm,
  clearForm,
}: {
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;
  title: string;
  form: React.ReactNode;
  submitForm: () => void;
  clearForm: () => void;
}) {
  return (
    <Modal
      isVisible={modalOpen}
      onBackdropPress={() => setModalOpen(false)}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={clearForm}>
            <Text style={styles.save}>Cancel</Text>
          </Pressable>
          <Text style={{ fontSize: 18 }}>{title}</Text>
          <Pressable onPress={submitForm}>
            <Text style={styles.cancel}> {"  Save"}</Text>
          </Pressable>
        </View>
        {form}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "92%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  save: {
    color: "rgba(45, 164, 255, 1)",
    fontSize: 16,
  },
  cancel: {
    color: "rgba(45, 164, 255, 1)",
    fontSize: 16,
  },
});
