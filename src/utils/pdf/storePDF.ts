import { Button, View, StyleSheet } from "react-native";
import * as Print from "expo-print";
import { File, Paths } from "expo-file-system";

export async function savePDF(content: string, filename: string) {
  const { uri } = await Print.printToFileAsync({ html: content });

  const pdf = new File(uri);
  const saved = new File(Paths.document, filename);
  pdf.move(saved);

  return saved.uri;
}

export function deletePDF(filename: string) {
  const pdf = new File(Paths.document, filename);
  pdf.delete();
}

export function getPDF(filename: string) {
  const pdf = new File(Paths.document, filename);

  if (!pdf.exists) {
    throw new Error(`PDF not found: ${filename}`);
  }

  return pdf.uri;
}
