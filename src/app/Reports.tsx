import { FlatList, StyleSheet, View, Text } from "react-native";
import { colors } from "../utils/objects/styles";
import { useReportsStore } from "../state/reports/useReportsStore";
import ReportTile from "../components/reports/ReportTile";
import ReportModal from "../components/reports/ReportModal";

export default function Reports() {
  const { reports } = useReportsStore();

  return (
    <View style={styles.container}>
      {Object.keys(reports).length > 0 ? (
        <FlatList
          data={Object.values(reports)}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <ReportTile report={item} />}
          ListHeaderComponent={() => <View style={styles.line} />}
          ItemSeparatorComponent={() => <View style={styles.line} />}
          ListFooterComponent={() => <View style={styles.line} />}
        />
      ) : (
        <View style={styles.placeHolder}>
          <Text>Complete an observation to create a report</Text>
        </View>
      )}
      <ReportModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  placeHolder: {
    margin: "auto",
  },
  line: { height: 1, backgroundColor: colors.lighterGray },
});
