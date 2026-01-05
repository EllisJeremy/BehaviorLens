import React from "react";
import { TextInput, StyleSheet } from "react-native";
import FormContainer from "../universal/form/FormContainer";
import DropDownMenu from "../universal/form/DropDownMenu";
import { colors } from "@/src/utils/colors";
import { useObservationModalStore } from "@/src/state/observations/useObservationsModalStore";
import Input from "../universal/form/Input";
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
    observationIntervalSeconds,
    setNumberOfObservations,
    setObservationIntervalSeconds,
  } = useObservationModalStore();

  const baseFields: FieldRenderer<BaseObservationPreset>[] = [
    {
      key: "name",
      render: (p) => (
        <Input value={p.name} placeholder="Name" onChangeText={setName} />
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
        <Input
          value={String(p.numberOfObservations)}
          placeholder="Number of observations"
          keyboardType="numeric"
          onChangeText={(v: string) => setNumberOfObservations(Number(v))}
        />
      ),
    },
    {
      key: "intervalSeconds",
      render: (p) => (
        <DropDownMenu
          title="Observation Interval"
          options={["15 seconds", "30 seconds", "60 seconds"]}
          prevOption="15 seconds"
          value={observationIntervalSeconds}
          setValue={setObservationIntervalSeconds}
        />
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
    <FormContainer title={"none"}>
      {fields.map((field) => (
        <React.Fragment key={field.key}>
          {field.render(editPreset as any)}
        </React.Fragment>
      ))}
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
  },
  inputSeparator: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
});
