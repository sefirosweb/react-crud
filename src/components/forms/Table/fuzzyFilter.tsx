import { FilterFn } from "@tanstack/react-table";
import { matchString } from "../../../lib";

export const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  const text = row.getValue(columnId) as string | number | null;
  return matchString(text, value)
};
