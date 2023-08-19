import { ColumnDefinition } from "../../../types";
declare const getVisibleColumns: (columnsToFilter: Array<ColumnDefinition<any>>) => Record<string, boolean>;
export default getVisibleColumns;
