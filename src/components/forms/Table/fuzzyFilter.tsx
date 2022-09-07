import { FilterFn } from "@tanstack/react-table";
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
  const text = row.getValue(columnId) as string;

  const result = text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .match(
      value
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );

  if (result) return true;
  return false;
};
