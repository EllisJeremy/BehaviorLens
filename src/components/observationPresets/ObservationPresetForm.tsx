import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownMenu from "../universal/DropDownMenu/DropDownMenu";

import { useObservationModalStore } from "@/src/state/observations/useObservationsModalStore";
import {
  IntervalObservationPreset,
  BaseObservationPreset,
  ABCObservationPreset,
  ObservationPreset,
} from "@/src/types/observationTypes";

type FieldRenderer<T> = {
  key: string;
  render: (preset: T) => React.ReactNode;
};

export default function ObservationPresetForm({
  editPreset,
}: {
  editPreset: ObservationPreset;
}) {
  const {
    setName,
    type,
    setType,
    setNumberOfObservations,
    setObservationIntervalSeconds,
  } = useObservationModalStore();

  const baseFields: FieldRenderer<BaseObservationPreset>[] = [
    {
      key: "name",
      render: (p) => (
        <TextInput value={p.name} placeholder="Name" onChangeText={setName} />
      ),
    },
    {
      key: "type",
      render: (p) => (
        <DropDownMenu
          title="Observation Type"
          options={["interval", "abc"]}
          prevOption="interval"
          value={type}
          setValue={setType}
        />
      ),
    },
  ];

  const intervalFields: FieldRenderer<IntervalObservationPreset>[] = [
    {
      key: "numberOfObservations",
      render: (p) => (
        <TextInput
          style={styles.inputSeparator}
          value={String(p.numberOfObservations)}
          placeholder="Number of observations"
          keyboardType="numeric"
          onChangeText={(v) => setNumberOfObservations(Number(v))}
        />
      ),
    },
    {
      key: "intervalSeconds",
      render: (p) => (
        <Picker
          selectedValue={p.observationIntervalSeconds}
          onValueChange={setObservationIntervalSeconds}
        >
          <Picker.Item label="15 seconds" value={15} />
          <Picker.Item label="30 seconds" value={30} />
          <Picker.Item label="60 seconds" value={60} />
        </Picker>
      ),
    },
  ];

  const abcFields: FieldRenderer<ABCObservationPreset>[] = [];

  const presetFieldMap = {
    interval: [...baseFields, ...intervalFields],
    abc: [...baseFields, ...abcFields],
  };

  const fields = presetFieldMap[editPreset.type];

  return (
    <View style={styles.inputContainer}>
      {fields.map((field) => (
        <React.Fragment key={field.key}>
          {field.render(editPreset as any)}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "rgba(240,240,240,1)",
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  input: {
    paddingVertical: 10,
  },
  inputSeparator: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(197,197,197,1)",
  },
});
