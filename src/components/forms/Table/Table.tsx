import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import * as TableBootstrap from "react-bootstrap";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as TableReactTable,
  useReactTable,
} from "@tanstack/react-table";

import { LoadingSpinner } from "../../icons/LoadingSpinner";
import { fuzzyFilter } from "./fuzzyFilter";
import { ColumnDefinition, MultiSelectOptionsColumns } from "../../../types";
import { FieldTypes } from "../../../types";
import { TableHeader } from "./TableHeader";
import { TableFooter } from "./TableFooter";
declare module "@tanstack/table-core" {
  interface ColumnMeta<TData, TValue> {
    fieldType?: FieldTypes;
    multiSelectOptions?: MultiSelectOptionsColumns<unknown, unknown>;
    selectOptionsUrl?: string;
    dropdown?: boolean;
  }
}

const parseColumns = (
  columns: Array<ColumnDefinition<any>>
): Array<ColumnDef<any>> => {
  return columns
    .filter((c) => c.visible !== false)
    .map((c) => {
      return {
        ...c,
        meta: {
          fieldType: c.fieldType,
          multiSelectOptions: c.multiSelectOptions,
          selectOptionsUrl: c.selectOptionsUrl,
          dropdown: c.dropdown,
        },
      };
    });
};
export interface Props {
  columns: Array<ColumnDefinition<any>>;
  data: Array<any>;
  className?: string;
  isLoading?: boolean;
  globalFilterText?: string;
  setColumnFiltersFields?: React.Dispatch<
    React.SetStateAction<ColumnFiltersState>
  >;
}

export type PropsRef = {
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  table: TableReactTable<any>;
};

export const Table = forwardRef((props: Props, ref: Ref<PropsRef>) => {
  const {
    columns,
    data,
    className,
    isLoading,
    globalFilterText,
    setColumnFiltersFields,
  } = props;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    setGlobalFilter(globalFilterText ?? "");
  }, [globalFilterText]);

  useEffect(() => {
    if (setColumnFiltersFields) {
      setColumnFiltersFields(columnFilters);
    }
  }, [columnFilters, setColumnFiltersFields]);

  const columnsParsed = parseColumns(columns);

  const storage = window.location.href + "_getSizeTable";
  const pageSize = parseInt(localStorage.getItem(storage) ?? "15");

  const table = useReactTable({
    data: data,
    columns: columnsParsed,
    enableColumnFilters: true,
    state: {
      columnFilters,
      globalFilter,
      sorting,
    },

    defaultColumn: {
      enableColumnFilter: false,
      enableSorting: false,
    },

    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },

    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useImperativeHandle(ref, () => ({
    columnFilters,
    globalFilter,
    table,
  }));

  return (
    <>
      <TableBootstrap.Table striped hover bordered className={`${className}`}>
        <TableHeader table={table} />

        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={100} className="text-center">
                <LoadingSpinner />
              </td>
            </tr>
          </tbody>
        ) : table.getPrePaginationRowModel().rows.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={100} className="text-center">
                No Data
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </TableBootstrap.Table>
      <TableFooter table={table} />
    </>
  );
});
