import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import { fontSizes, colors, styleConsts } from "@/src/utils/objects/styles";
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

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <Modal
      isVisible={modalOpen}
      style={[
        styles.modal,
        useTabletLayout
          ? isLandscape
            ? { marginVertical: 100, marginHorizontal: 200 }
            : { marginVertical: 200, marginHorizontal: 100 }
          : { margin: 0 },
      ]}
      avoidKeyboard={false}
      backdropOpacity={0.5}
      backdropTransitionOutTiming={0}
      onBackdropPress={() => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        } else if (useTabletLayout) {
          clearForm();
        }
      }}
    >
      <KeyboardAvoidingView
        style={[
          styles.container,
          { height: isTablet ? (useTabletLayout ? "100%" : "97%") : "93%" },
        ]}
        behavior="padding"
        keyboardVerticalOffset={
          useTabletLayout ? (isLandscape ? 110 : 210) : 10
        }
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              clearForm();
              Keyboard.dismiss();
            }}
            style={({ pressed }) => [
              { opacity: pressed ? styleConsts.opacity : 1 },
            ]}
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
              style={({ pressed }) => [
                { opacity: pressed && canSubmit ? styleConsts.opacity : 1 },
              ]}
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
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "93%",
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
