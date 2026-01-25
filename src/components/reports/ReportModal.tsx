import { WebView } from "react-native-webview";
import { View, Text, StyleSheet } from "react-native";
import { getPDF } from "@/src/utils/pdf/storePDF";
import SlideUpModal from "../universal/SlideUpModal";
import { useReportModalStore } from "@/src/state/reports/useReportModalStore";
import * as Sharing from "expo-sharing";

export default function ReportModal() {
  const { open, filename, clear } = useReportModalStore();

  const uri = filename ? getPDF(filename) : null;

  async function exportPDF(uri: string) {
    if (uri === "") return;
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Share PDF report",
    });
  }
  function PDF({ uri }: { uri: string | null }) {
    if (!uri) {
      return (
        <View style={styles.placeHolder}>
          <Text>PDF not found</Text>
        </View>
      );
    }

    return (
      <WebView source={{ uri }} style={{ flex: 1 }} originWhitelist={["*"]} />
    );
  }

  return (
    <SlideUpModal
      title="Report"
      modalOpen={open}
      form={<PDF uri={uri ?? ""} />}
      clearForm={clear}
      submitForm={
        uri
          ? () => {
              exportPDF(uri);
            }
          : undefined
      }
      canSubmit={true}
      saveText="Export"
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
