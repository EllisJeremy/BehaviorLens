import React from "react";
import FormContainer from "../universal/form/FormContainer";
import { View } from "react-native";
import DropDownMenu from "../universal/form/DropDownMenu";
import { useObservationModalStore } from "@/src/state/observationPresets/useObservationsModalStore";
import Input from "../universal/form/Input";
import InputWithLabel from "../universal/form/InputWithLabel";
import {
  IntervalObservationPreset,
  BaseObservationPreset,
  ABCObservationPreset,
} from "@/src/types/observationTypes";

type FieldRenderer<T> = {
  key: string;
  render: React.ReactNode;
};

export default function ObservationPresetForm() {
  const {
    name,
    setName,
    type,
    setType,
    numberOfObservations,
    setNumberOfObservations,
    observationIntervalSeconds,
    setObservationIntervalSeconds,
  } = useObservationModalStore();

  const baseFields: FieldRenderer<BaseObservationPreset>[] = [
    {
      key: "type",
      render: (
        <FormContainer>
          <Input
            defaultValue={name}
            placeholder="Name"
            onChangeText={setName}
          />
          <DropDownMenu
            title="Observation Type"
            options={["interval", "abc"]}
            value={type}
            setValue={setType}
          />
        </FormContainer>
      ),
    },
  ];

  const intervalFields: FieldRenderer<IntervalObservationPreset>[] = [
    {
      key: "interval",
      render: (
        <FormContainer title={"interval settings"}>
          <DropDownMenu
            title="Observation Interval"
            options={["15 seconds", "30 seconds", "60 seconds"]}
            value={observationIntervalSeconds}
            setValue={setObservationIntervalSeconds}
          />
          <InputWithLabel
            defaultValue={String(numberOfObservations)}
            placeholder="Number"
            keyboardType="numeric"
            onChangeText={(v: string) => setNumberOfObservations(Number(v))}
            label="Number of Observations"
          />
        </FormContainer>
      ),
    },
  ];

  const abcFields: FieldRenderer<ABCObservationPreset>[] = [];

  const presetFieldMap = {
    interval: [...baseFields, ...intervalFields],
    abc: [...baseFields, ...abcFields],
  };

  const fields = presetFieldMap[type];

  return (
    <View>
      {fields.map((field) => (
        <React.Fragment key={field.key}>{field.render}</React.Fragment>
      ))}
    </View>
  );
}
