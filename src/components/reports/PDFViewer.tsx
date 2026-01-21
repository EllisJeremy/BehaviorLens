import { Modal, View, StyleSheet, Button } from "react-native";
import { WebView } from "react-native-webview";
import { useState } from "react";
import { getPDF } from "@/src/utils/pdf/storePDF";

export function PDFViewer({
  filename,
  visible,
  onClose,
}: {
  filename: string;
  visible: boolean;
  onClose: () => void;
}) {
  if (filename === "" || !visible) {
    return null;
  }
  const uri = getPDF(filename);
  console.log(uri);
  console.log();

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <WebView
          source={{ uri }}
          style={styles.pdf}
          originWhitelist={["*"]} // Allow all origins including file://
        />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  pdf: {
    flex: 1,
  },
});
