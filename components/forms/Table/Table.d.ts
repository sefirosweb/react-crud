import React from "react";
import { CellContext, ColumnFiltersState, Row, RowData, Table as TableReactTable } from "@tanstack/react-table";
import { ColumnDefinition, MultiSelectOptionsColumns } from "../../../types";
import { FieldTypes } from "../../../types";
declare module "@tanstack/table-core" {
    interface ColumnMeta<TData, TValue> {
        fieldType?: FieldTypes;
        multiSelectOptions?: MultiSelectOptionsColumns<unknown, unknown>;
        selectOptionsUrl?: string;
        dropdown?: boolean;
        getCellStyle?: (cell: CellContext<TData, TValue>) => React.CSSProperties;
        getCellClass?: (cell: CellContext<TData, TValue>) => string;
    }
    interface TableMeta<TData extends RowData> {
        getRowStyles?: (row: Row<TData>) => React.CSSProperties;
        getRowClass?: (row: Row<TData>) => string;
    }
}
export interface Props {
    columns: Array<ColumnDefinition<any>>;
    data: Array<any>;
    className?: string;
    isLoading?: boolean;
    globalFilterText?: string;
    enableColumnFilters?: boolean;
    columnFiltersFields?: ColumnFiltersState;
    setColumnFiltersFields?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    getRowStyles?: (row: Row<any>) => React.CSSProperties;
    getRowClass?: (row: Row<any>) => string;
}
export type PropsRef = {
    columnFilters: ColumnFiltersState;
    globalFilter: string;
    table: TableReactTable<any>;
};
export declare const Table: React.ForwardRefExoticComponent<Props & React.RefAttributes<PropsRef>>;
