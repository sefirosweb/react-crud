import React from "react";
import { ColumnFiltersState, Table } from "@tanstack/react-table";
type Props = {
    table: Table<any>;
    enableColumnFilters: boolean;
    columnFiltersFields?: ColumnFiltersState;
    setColumnFiltersFields?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
};
export declare const TableHeader: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
