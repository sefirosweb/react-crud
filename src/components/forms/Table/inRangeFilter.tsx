import { FilterFn } from "@tanstack/react-table";

export const inRangeFilter: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as number || null;

  let min = values[0][0] as number || null;
  let max = values[0][1] as number || null;

  if (!min && !max) return true;
  if (rowValue === null) return false;

  if (min && !max) {
    return rowValue >= min;
  }

  if (!min && max) {
    return rowValue <= max;
  }

  if (min && max) {

    if (min > max) {
      return rowValue >= max && rowValue <= min;
    }

    return rowValue >= min && rowValue <= max;
  }

  return false;
};
