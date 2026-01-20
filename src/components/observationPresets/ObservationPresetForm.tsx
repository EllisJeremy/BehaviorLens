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
} from "@/src/types/observations/observationTypes";
import EditableStringList from "../universal/form/EditableStringList";

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
    totalIntervals,
    setTotalIntervals,
    intervalSeconds,
    setIntervalSeconds,
    onTaskList,
    addOnTask,
    removeOnTask,
    offTaskList,
    addOffTask,
    removeOffTask,
  } = useObservationPresetsModalStore();

  const baseFields: FieldRenderer<BaseObservationPreset>[] = [
    {
      key: "type",
      render: (
        <FormContainer>
          <InputWithLabel
            label="Name"
            defaultValue={name}
            placeholder="Enter name"
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
            value={intervalSeconds}
            setValue={setIntervalSeconds}
          />
          <InputWithLabel
            defaultValue={String(totalIntervals)}
            placeholder="Number"
            keyboardType="numeric"
            onChangeText={(v: string) => setTotalIntervals(Number(v))}
            label="Number of Observations"
          />
        </FormContainer>
      ),
    },
    {
      key: "onTaskList",
      render: (
        <FormContainer title={"on task options"}>
          <EditableStringList
            values={onTaskList}
            onAdd={addOnTask}
            onRemove={removeOnTask}
            placeholder="Add behavior"
          />
        </FormContainer>
      ),
    },
    {
      key: "offTaskList",
      render: (
        <FormContainer title={"off task options"}>
          <EditableStringList
            values={offTaskList}
            onAdd={addOffTask}
            onRemove={removeOffTask}
            placeholder="Add behavior"
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
