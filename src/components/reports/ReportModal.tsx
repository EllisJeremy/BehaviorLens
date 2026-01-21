import { WebView } from "react-native-webview";
import { View, Text, StyleSheet } from "react-native";
import { getPDF } from "@/src/utils/pdf/storePDF";
import SlideUpModal from "../universal/SlideUpModal";
import { useReportModalStore } from "@/src/state/reports/useReportModalStore";

export default function ReportModal() {
  const { open, setOpen, filename, clear } = useReportModalStore();

  function PDF() {
    try {
      const uri = getPDF(filename);

      return (
        <WebView source={{ uri }} style={{ flex: 1 }} originWhitelist={["*"]} />
      );
    } catch (error) {
      return (
        <View style={styles.placeHolder}>
          <Text>PDF not found</Text>
        </View>
      );
    }
  }

  return (
    <SlideUpModal
      title="Report"
      modalOpen={open}
      form={<PDF />}
      clearForm={clear}
      cancelText="Close"
      scrollable={false}
    />
  );
}

const styles = StyleSheet.create({
  placeHolder: {
    margin: "auto",
  },
});
