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
import { fontSizes, colors } from "@/src/utils/objects/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";

export default function SlideUpModal({
  modalOpen,
  title,
  form,
  submitForm,
  clearForm,
  saveText = "Save",
  cancelText = "Cancel",
  scrollable = true,
  padding = 20,
}: {
  modalOpen: boolean;
  title: string;
  form: React.ReactNode;
  submitForm?: () => void;
  clearForm: () => void;
  saveText?: string;
  cancelText?: string;
  scrollable?: boolean;
  padding?: number;
}) {
  const { settings } = useSettingsStore();

  return (
    <Modal
      isVisible={modalOpen}
      style={styles.modal}
      avoidKeyboard={false}
      backdropOpacity={0.5}
      backdropTransitionOutTiming={0}
    >
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={clearForm}>
            <Text style={[styles.button, { color: settings.themeColor }]}>
              {cancelText}
            </Text>
          </Pressable>

          <Text style={styles.title}>{title}</Text>
          {submitForm && (
            <Pressable onPress={submitForm}>
              <Text style={[styles.button, { color: settings.themeColor }]}>
                {saveText}
              </Text>
            </Pressable>
          )}
        </View>

        {scrollable ? (
          <ScrollView
            style={{ paddingLeft: padding, paddingRight: padding }}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {form}
          </ScrollView>
        ) : (
          form
        )}
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
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "92%",
  },
  header: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
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
