import { Option } from "../components/universal/form/DropDownMenu";

export function listToOptions(values: string[]): Option<string>[] {
  return values.map((v) => ({
    label: v,
    value: v,
  }));
}
