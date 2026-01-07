import { colors } from "@/src/utils/styles";
import { StyleSheet, View, Text } from "react-native";

export default function FormContainer({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.full}>
      {title && <Text style={styles.text}>{title.toUpperCase()}</Text>}
      <View style={styles.outer}>
        <View style={styles.inner}>{children}</View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  full: {
    marginTop: 20,
  },
  text: {
    color: colors.gray,
    marginLeft: 15,
  },
  outer: {
    backgroundColor: colors.offWhite,
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 5,
  },
  inner: {
    backgroundColor: colors.darkGray,
    gap: StyleSheet.hairlineWidth,
  },
});
