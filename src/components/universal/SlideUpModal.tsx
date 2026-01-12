import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { fontSizes } from "@/src/utils/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import Settings from "@/src/app/Settings";

export default function SlideUpModal({
  modalOpen,
  setModalOpen,
  title,
  form,
  submitForm,
  clearForm,
  saveText = "Save",
}: {
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;
  title: string;
  form: React.ReactNode;
  submitForm: () => void;
  clearForm: () => void;
  saveText?: string;
}) {
  const { settings } = useSettingsStore();

  return (
    <Modal isVisible={modalOpen} style={styles.modal} avoidKeyboard={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <Pressable onPress={clearForm}>
            <Text style={[styles.button, { color: settings.themeColor }]}>
              Cancel
            </Text>
          </Pressable>

          <Text style={styles.title}>{title}</Text>

          <Pressable onPress={submitForm}>
            <Text style={[styles.button, { color: settings.themeColor }]}>
              {saveText}
            </Text>
          </Pressable>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {form}
        </ScrollView>
      </KeyboardAvoidingView>
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
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    pointerEvents: "none",
    textAlign: "center",
    fontSize: fontSizes.text,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  button: {
    fontSize: 16,
  },
});
