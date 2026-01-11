import React from "react";
import FormContainer from "../universal/form/FormContainer";
import { View } from "react-native";
import DropDownMenu, { Option } from "../universal/form/DropDownMenu";
import { useObservationPresetsModalStore } from "@/src/state/observationPresets/useObservationPresetsModalStore";
import Input from "../universal/form/Input";
import InputWithLabel from "../universal/form/InputWithLabel";
import {
  IntervalObservationPreset,
  BaseObservationPreset,
  ABCObservationPreset,
  ObservationPresetEnum,
} from "@/src/types/observationTypes";

type FieldRenderer<T> = {
  key: string;
  render: React.ReactNode;
};

const intervalOptions: Option<number>[] = [
  { label: "15 seconds", value: 15 },
  { label: "30 seconds", value: 30 },
  { label: "60 seconds", value: 60 },
];

const observationOptions: Option<ObservationPresetEnum>[] = [
  { label: "interval", value: "interval" },
  { label: "abc", value: "abc" },
];

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
  } = useObservationPresetsModalStore();

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
          <DropDownMenu<ObservationPresetEnum>
            title="Observation Type"
            options={observationOptions}
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
            options={intervalOptions}
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
