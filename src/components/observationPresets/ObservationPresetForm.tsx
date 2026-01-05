import React from "react";
import FormContainer from "../universal/form/FormContainer";
import DropDownMenu from "../universal/form/DropDownMenu";
import { useObservationModalStore } from "@/src/state/observations/useObservationsModalStore";
import Input from "../universal/form/Input";
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
      key: "name",
      render: (
        <Input defaultValue={name} placeholder="Name" onChangeText={setName} />
      ),
    },
    {
      key: "type",
      render: (
        <DropDownMenu
          title="Observation Type"
          options={["interval", "abc"]}
          value={type}
          setValue={setType}
        />
      ),
    },
  ];

  const intervalFields: FieldRenderer<IntervalObservationPreset>[] = [
    {
      key: "numberOfObservations",
      render: (
        <Input
          defaultValue={String(numberOfObservations)}
          placeholder="Number of observations"
          keyboardType="numeric"
          onChangeText={(v: string) => setNumberOfObservations(Number(v))}
        />
      ),
    },
    {
      key: "intervalSeconds",
      render: (
        <DropDownMenu
          title="Observation Interval"
          options={["15 seconds", "30 seconds", "60 seconds"]}
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

  const fields = presetFieldMap[type];

  return (
    <FormContainer title={"none"}>
      {fields.map((field) => (
        <React.Fragment key={field.key}>{field.render}</React.Fragment>
      ))}
    </FormContainer>
  );
}
