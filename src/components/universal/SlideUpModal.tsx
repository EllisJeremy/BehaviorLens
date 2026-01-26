import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import { fontSizes, colors } from "@/src/utils/objects/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { useDeviceClass } from "@/src/hooks/useDeviceClass";

export default function SlideUpModal({
  modalOpen,
  title,
  form,
  submitForm,
  canSubmit,
  clearForm,
  saveText = "Save",
  cancelText = "Cancel",
  scrollable = true,
  padding = 20,
  forceFullScreen = false,
}: {
  modalOpen: boolean;
  title: string;
  form: React.ReactNode;
  submitForm?: () => void;
  canSubmit: boolean;
  clearForm: () => void;
  saveText?: string;
  cancelText?: string;
  scrollable?: boolean;
  padding?: number;
  forceFullScreen?: boolean;
}) {
  const { settings } = useSettingsStore();
  const { isTablet } = useDeviceClass();

  const useTabletLayout = isTablet && !forceFullScreen;

  return (
    <Modal
      isVisible={modalOpen}
      style={styles.modal}
      avoidKeyboard={false}
      backdropOpacity={0.5}
      backdropTransitionOutTiming={0}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              clearForm();
              Keyboard.dismiss();
            }}
          >
            <Text style={[styles.button, { color: settings.themeColor }]}>
              {cancelText}
            </Text>
          </Pressable>

          <Text style={styles.title}>{title}</Text>
          {submitForm && (
            <Pressable
              onPress={() => {
                submitForm();
                Keyboard.dismiss();
              }}
              disabled={!canSubmit}
            >
              <Text
                style={[
                  styles.button,
                  { color: canSubmit ? settings.themeColor : colors.gray },
                ]}
              >
                {saveText}
              </Text>
            </Pressable>
          )}
        </View>

        {scrollable ? (
          <ScrollView
            style={{ paddingLeft: padding, paddingRight: padding }}
            keyboardShouldPersistTaps="handled"
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
    margin: 100,
    marginBottom: 300,
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "92%",
    borderRadius: 20,
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
  button: {
    fontSize: 16,
  },
});
