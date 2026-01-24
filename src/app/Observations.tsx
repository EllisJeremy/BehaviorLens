import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Pressable, Text } from "react-native";
import ObservationTile from "../components/observationPresets/ObservationTile";
import AddObservationPresetModal from "../components/observationPresets/AddObservationPresetModal";
import { colors } from "../utils/objects/styles";
import { useObservationPresetsModalStore } from "../state/observationPresets/useObservationPresetsModalStore";
import { useObservationPresetsStore } from "../state/observationPresets/useObservationPresetsStore";
import PlusButton from "../components/universal/PlusButton";
import StartObservationModal from "../components/observations/StartObservationModal";
import IntervalObservationModal from "../components/observations/interval/IntervalObservationModal";
import { useStartObservationModalStore } from "../state/observations/useStartObservationModalStore";
import CounterObservationModal from "../components/observations/counter/CounterObservationModal";

export default function Observations() {
  const { observationPresets } = useObservationPresetsStore();
  const { setOpen } = useObservationPresetsModalStore();
  const { preset } = useStartObservationModalStore();

  return (
    <View style={styles.container}>
      {Object.keys(observationPresets).length > 0 ? (
        <FlatList
          data={Object.values(observationPresets)}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <ObservationTile observationPreset={item} />
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
      <StartObservationModal />
      {preset && <IntervalObservationModal preset={preset as any} />}
      {preset && <CounterObservationModal preset={preset as any} />}
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
  hint: {
    margin: "auto",
    paddingBottom: 20,
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
