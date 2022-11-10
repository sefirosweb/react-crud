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
  Row,
  RowData,
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
    getCellStyle?: () => React.CSSProperties;
    getCellClass?: () => string;
  }

  interface TableMeta<TData extends RowData> {
    getRowStyles?: (row: Row<TData>) => React.CSSProperties;
    getRowClass?: (row: Row<TData>) => string;
  }
}

const parseColumns = (
  columns: Array<ColumnDefinition<any>>
): Array<ColumnDef<any>> => {
  return columns
    .map((c) => {
      return {
        ...c,
        meta: {
          fieldType: c.fieldType,
          multiSelectOptions: c.multiSelectOptions,
          selectOptionsUrl: c.selectOptionsUrl,
          dropdown: c.dropdown,
          getCellStyle: c.getCellStyle,
          getCellClass: c.getCellClass,
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
  enableColumnFilters?: boolean;
  columnFiltersFields?: ColumnFiltersState;
  setColumnFiltersFields?: React.Dispatch<
    React.SetStateAction<ColumnFiltersState>
  >;
  getRowStyles?: (row: Row<any>) => React.CSSProperties;
  getRowClass?: (row: Row<any>) => string;
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
    enableColumnFilters = true,
    columnFiltersFields,
    setColumnFiltersFields,
    getRowStyles,
    getRowClass
  } = props;

  const visibleColumns = () => {
    const hidenColumns: Record<string, boolean> = {}
    columns
      .filter((c) => c.visible === false && c.accessorKey)
      .forEach(c => {
        if (c.accessorKey) {
          hidenColumns[c.accessorKey] = false
        }
      })
    return hidenColumns
  }

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState(visibleColumns());


  useEffect(() => {
    setGlobalFilter(globalFilterText ?? "");
  }, [globalFilterText]);

  const columnsParsed = parseColumns(columns);

  const storage = window.location.href + "_getSizeTable";
  const pageSize = parseInt(localStorage.getItem(storage) ?? "15");

  const table = useReactTable({
    data: data,
    columns: columnsParsed,
    enableColumnFilters: true,
    state: {
      columnVisibility,
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

    meta: {
      getRowStyles,
      getRowClass
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
    onColumnVisibilityChange: setColumnVisibility,
  });

  useImperativeHandle(ref, () => ({
    columnFilters,
    globalFilter,
    table,
  }));

  return (
    <>
      <TableBootstrap.Table
        striped
        hover
        bordered
        responsive
        className={`${className}`}
      >
        <TableHeader
          table={table}
          enableColumnFilters={enableColumnFilters}
          columnFiltersFields={columnFiltersFields}
          setColumnFiltersFields={setColumnFiltersFields}
        />

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
              <tr
                key={row.id}
                style={table.options.meta?.getRowStyles ? table.options.meta.getRowStyles(row) : {}}
                className={table.options.meta?.getRowClass ? table.options.meta.getRowClass(row) : ''}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    style={cell.column.columnDef.meta?.getCellStyle ? cell.column.columnDef.meta?.getCellStyle() : undefined}
                    className={cell.column.columnDef.meta?.getCellClass ? cell.column.columnDef.meta?.getCellClass() : undefined}
                    key={cell.id}>
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
