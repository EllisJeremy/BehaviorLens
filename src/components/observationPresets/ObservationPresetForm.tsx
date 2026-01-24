import React from "react";
import FormContainer from "../universal/form/FormContainer";
import { View } from "react-native";
import DropDownMenu, { Option } from "../universal/form/DropDownMenu";
import { useObservationPresetsModalStore } from "@/src/state/observationPresets/useObservationPresetsModalStore";
import InputWithLabel from "../universal/form/InputWithLabel";
import {
  IntervalObservationPreset,
  BaseObservationPreset,
  CounterObservationPreset,
  ObservationPresetEnum,
  EducationalSettingEnum,
} from "@/src/types/observations/observationTypes";
import EditableStringList from "../universal/form/EditableStringList";

type FieldRenderer<T> = {
  key: string;
  render: React.ReactNode;
};

const intervalOptions: Option<number>[] = [
  { label: "5 seconds", value: 5 },
  { label: "15 seconds", value: 15 },
  { label: "30 seconds", value: 30 },
  { label: "60 seconds", value: 60 },
];

const observationOptions: Option<ObservationPresetEnum>[] = [
  { label: "Interval", value: "interval" },
  { label: "Counter", value: "counter" },
];

const educationalSettingOptions: Option<EducationalSettingEnum>[] = [
  { label: "General Education", value: "General Education" },
  { label: "Special Education", value: "Special Education" },
];

const subjectOptions: Option<string>[] = [
  { label: "Math", value: "Math" },
  { label: "English", value: "English" },
  { label: "Science", value: "Science" },
  { label: "Social Studies", value: "Social Studies" },
  { label: "Art", value: "Art" },
  { label: "Physical Education", value: "Physical Education" },
  { label: "Other", value: "Other" },
];

const instructionalSettingOptions: Option<string>[] = [
  { label: "Whole Group", value: "Whole Group" },
  { label: "Small Group", value: "Small Group" },
  { label: "Partner Work", value: "Partner Work" },
  { label: "Independent Seat Work", value: "Independent Seat Work" },
];

export default function ObservationPresetForm() {
  const {
    name,
    setName,
    type,
    setType,
    subject,
    setSubject,
    educationalSetting,
    setEducationalSetting,
    instructionalSetting,
    setInstructionalSetting,
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
    totalMins,
    setTotalMins,
    behaviorsList,
    addBehavior,
    removeBehavior,
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
          <DropDownMenu
            title="Subject"
            options={subjectOptions}
            value={subject}
            setValue={setSubject}
          />
          <DropDownMenu<EducationalSettingEnum>
            title="Educational Setting"
            options={educationalSettingOptions}
            value={educationalSetting}
            setValue={setEducationalSetting}
          />
          <DropDownMenu
            title="Instructional Setting"
            options={instructionalSettingOptions}
            value={instructionalSetting}
            setValue={setInstructionalSetting}
          />
        </FormContainer>
      ),
    },
  ];

  const intervalFields: FieldRenderer<IntervalObservationPreset>[] = [
    {
      key: "interval",
      render: (
        <FormContainer title={"Interval settings"}>
          <DropDownMenu
            title="Observation interval"
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

  const counterFields: FieldRenderer<CounterObservationPreset>[] = [
    {
      key: "totalMins",
      render: (
        <FormContainer title={"Observation length"}>
          <InputWithLabel
            defaultValue={String(totalMins)}
            placeholder="Number"
            keyboardType="numeric"
            onChangeText={(v: string) => setTotalMins(Number(v))}
            label="Observation Length in Minuets"
          />
        </FormContainer>
      ),
    },
    {
      key: "behaviorsList",
      render: (
        <FormContainer title={"behaviors to count"}>
          <EditableStringList
            values={behaviorsList}
            onAdd={addBehavior}
            onRemove={removeBehavior}
            placeholder="Add behavior"
          />
        </FormContainer>
      ),
    },
  ];

  const presetFieldMap = {
    interval: [...baseFields, ...intervalFields],
    counter: [...baseFields, ...counterFields],
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
