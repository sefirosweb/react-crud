import { FilterFn } from "@tanstack/react-table";
import { DateTime } from "luxon";

export const inRangeDateFilter: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as number || null;

  let min = values[0][0] as number | null;
  let max = values[0][1] as number | null;

  if (!min && !max) return true;
  if (rowValue === null) return false;

  const rowValueDate = DateTime.fromMillis(rowValue);
  if (!rowValueDate) return false;

  const newMin = min ? DateTime.fromMillis(min) : null;
  const newMax = max ? DateTime.fromMillis(max) : null;

  if (newMin && !newMax) {
    return rowValueDate >= newMin.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  }

  if (!newMin && newMax) {
    return rowValueDate <= newMax.set({ hour: 23, minute: 59, second: 59, millisecond: 59 });
  }

  if (newMin && newMax) {

    if (newMin > newMax) {
      return rowValueDate >= newMax.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) && rowValueDate <= newMin.set({ hour: 23, minute: 59, second: 59, millisecond: 59 });
    }

    return rowValueDate >= newMin.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) && rowValueDate <= newMax.set({ hour: 23, minute: 59, second: 59, millisecond: 59 });
  }

  return false;
};
