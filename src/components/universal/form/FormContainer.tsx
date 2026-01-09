import { colors, fontSizes } from "@/src/utils/styles";
import { StyleSheet, View, Text } from "react-native";

export default function FormContainer({
  title,
  children,
  backgroundColor = colors.offWhite,
}: {
  title?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.full}>
      {title && <Text style={styles.title}>{title.toUpperCase()}</Text>}
      <View style={[styles.outer, { backgroundColor }]}>
        <View style={styles.inner}>{children}</View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  full: {
    marginTop: 20,
  },
  title: {
    color: colors.gray,
    marginLeft: 15,
    fontSize: fontSizes.smallTitle,
  },
  outer: {
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
