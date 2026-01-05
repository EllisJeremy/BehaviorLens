import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Pressable, Text } from "react-native";
import StudentTile from "../components/students/StudentTile";
import AddObservationPresetModal from "../components/observationPresets/AddObservationPresetModal";
import { colors } from "../utils/styles";
import { useObservationModalStore } from "../state/observations/useObservationsModalStore";
import { useObservationPresetStore } from "../state/observations/useObservationsStore";
import PlusButton from "../components/universal/PlusButton";

export default function Observations() {
  const { loadObservationPresets, observationPresets } =
    useObservationPresetStore();
  const { setOpen } = useObservationModalStore();

  useEffect(() => {
    loadObservationPresets();
  }, []);

  return (
    <View style={styles.container}>
      {Object.keys(observationPresets).length > 0 ? (
        <FlatList
          data={Object.values(observationPresets)}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <StudentTile
              uuid={item.uuid}
              firstName={item.name}
              lastName={item.type}
              grade={""}
            />
          )}
          ListHeaderComponent={() => <View style={styles.line} />}
          ItemSeparatorComponent={() => <View style={styles.line} />}
          ListFooterComponent={() => <View style={styles.line} />}
        />
      ) : (
        <View style={styles.placeHolder}>
          <Text>Press + to add an Observation Preset</Text>
        </View>
      )}

      <PlusButton onPress={() => setOpen(true)} />

      <AddObservationPresetModal />
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
  add: {
    backgroundColor: colors.green,
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    margin: 20,
  },
});
