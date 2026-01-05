import { colors } from "@/src/utils/styles";
import { StyleSheet, View } from "react-native";

export default function FormContainer({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.outer}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  outer: {
    backgroundColor: colors.offWhite,
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  inner: {
    backgroundColor: colors.darkGray,
    gap: StyleSheet.hairlineWidth,
  },
});
