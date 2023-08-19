import React from "react";
import { Props as TableProps } from "../Table";
import { PropsRef as HandleModalShowPropsRef } from "./HandleModalShow";
export interface Props extends Omit<TableProps, "globalFilterText" | "isLoading" | "setColumnFiltersFields" | "data"> {
    primaryKey: string;
    sentKeyAs?: string;
    canEdit?: boolean;
    canDelete?: boolean;
    canSelectRow?: boolean;
    handleModalShowRef: React.RefObject<HandleModalShowPropsRef>;
    refreshTable: () => void;
}
declare const NewColumns: (props: Props) => import("../../../types").ColumnDefinition<any>[];
export default NewColumns;
