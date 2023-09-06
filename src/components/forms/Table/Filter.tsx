import { Column } from "@tanstack/react-table";
import { FieldTypes, FilterType } from "../../../types";
import { NumbersFilter } from "./Filters/NumbersFilter";
import { DatesFilter } from "./Filters/DatesFilter";
import { SelectFilter } from "./Filters/SelectFilter";
import { TextFilter } from "./Filters/TextFilter";

type Props = {
  column: Column<any, unknown>;
  setColumnFilter: (filter: FilterType) => void;
};

export function Filter(props: Props) {
  const { column, setColumnFilter } = props;
  const filterType = column.columnDef.meta?.fieldType ?? FieldTypes.TEXT;

  if (filterType === FieldTypes.NUMBER) {
    return (
      <NumbersFilter setColumnFilter={setColumnFilter} />
    );
  }

  if (filterType === FieldTypes.SELECT)
    return (
      <SelectFilter column={column} setColumnFilter={setColumnFilter} />
    );

  if (filterType === FieldTypes.DATE) {

    return (
      <DatesFilter setColumnFilter={setColumnFilter} />
    );
  }

  return (
    <TextFilter column={column} setColumnFilter={setColumnFilter} />
  );
}
