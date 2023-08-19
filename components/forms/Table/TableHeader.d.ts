import { ColumnFiltersState, Table } from "@tanstack/react-table";
import React from "react";
type Props = {
    table: Table<any>;
    enableColumnFilters: boolean;
    columnFiltersFields?: ColumnFiltersState;
    setColumnFiltersFields?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
};
export declare const TableHeader: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
