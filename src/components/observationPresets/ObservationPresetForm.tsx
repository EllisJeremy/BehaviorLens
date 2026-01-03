import React from "react";
import { View, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
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
        <Picker selectedValue={p.type} onValueChange={setType}>
          <Picker.Item label="Interval" value="interval" />
          <Picker.Item label="ABC" value="abc" />
        </Picker>
      ),
    },
  ];

  const intervalFields: FieldRenderer<IntervalObservationPreset>[] = [
    {
      key: "numberOfObservations",
      render: (p) => (
        <TextInput
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
  } as const;

  const fields = presetFieldMap[editPreset.type];

  return (
    <View>
      {fields.map((field) => (
        <React.Fragment key={field.key}>
          {field.render(editPreset as any)}
        </React.Fragment>
      ))}
    </View>
  );
}
