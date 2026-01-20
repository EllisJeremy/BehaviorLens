import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActionSheetIOS,
  Image,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useReportsStore } from "@/src/state/reports/useReportsStore";
import { colors, fontSizes } from "@/src/utils/styles";
import { ReportType } from "@/src/types/reportsTypes";
import { typeToIcon } from "@/src/utils/observationPresets/typeToIcon";

export default function ReportTile({ report }: { report: ReportType }) {
  const { removeReport } = useReportsStore();

  return (
    <View style={styles.tile}>
      <View style={styles.iconAndInfo}>
        <Image source={typeToIcon[report.type]} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {report.name}
          </Text>
          <Text style={styles.subText}>{report.type}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={[styles.deleteButton, styles.deleteButton]}
          onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ["Cancel", "Delete"],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
              },
              (index: number) => {
                if (index === 1) removeReport(report.uuid);
              },
            );
          }}
        >
          <Octicons name="trash" size={20} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderColor: "#d6d6d6ff",
    width: "100%",
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  iconAndInfo: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    flex: 1,
  },
  info: {
    flexShrink: 1,
    flex: 1,
  },
  text: {
    fontSize: fontSizes.text,
    fontWeight: "600",
  },
  subText: {
    fontSize: fontSizes.subText,
    color: colors.darkGray,
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    gap: 10,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
  },
  icon: {
    height: 30,
    width: 30,
  },
});
