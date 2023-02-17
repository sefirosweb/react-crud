import { FilterFn } from "@tanstack/react-table";
import { matchString } from "../../../lib";
// import { rankItem } from "@tanstack/match-sorter-utils";

export const fuzzyFilter: FilterFn<any> = (
  row,
  columnId,
  value
  /*, addMeta*/
) => {
  // const itemRank = rankItem(row.getValue(columnId), value);
  // addMeta({
  //   itemRank,
  // });
  // return itemRank.passed;
  const text = row.getValue(columnId) as string | number | null;
  return matchString(text, value)
};
