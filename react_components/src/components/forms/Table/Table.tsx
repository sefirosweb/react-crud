import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import * as TableBootstrap from "react-bootstrap";

import {
  CellContext,
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
import getVisibleColumns from "./getVisibleColumns";

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

const filterFnType = (fieldType?: FieldTypes): string => {
  if (fieldType === FieldTypes.NUMBER) return "inNumberRange";
  if (fieldType === FieldTypes.DATE) return "inNumberRange";

  return "textFilter";
}

const parseColumns = (
  columns: Array<ColumnDefinition<any>>
): Array<ColumnDef<any>> => {
  // @ts-ignore
  return columns
    .map((c) => {
      return {
        ...c,
        filterFn: filterFnType(c.fieldType),
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

const tableIsLoading: React.CSSProperties = {
  width: "100%",
  height: "100%",
  paddingTop: "30px",
  position: "absolute",
  textAlign: "center",
  top: 0,
  color: "rgb(240, 248, 255)",
  backgroundColor: "rgba(0, 0, 0, 0.575)",
  zIndex: 4
}

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

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState(getVisibleColumns(columns));

  useEffect(() => {
    setColumnVisibility(getVisibleColumns(columns))
  }, [columns])

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

    filterFns: {
      textFilter: fuzzyFilter
    },

    getColumnCanGlobalFilter: () => true,
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
      <div
        style={{
          position: "relative"
        }}>
        <div style={isLoading ? tableIsLoading : { display: "none" }}><LoadingSpinner /></div>
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

          {table.getPrePaginationRowModel().rows.length === 0 ? (
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
                      style={cell.column.columnDef.meta?.getCellStyle ? cell.column.columnDef.meta?.getCellStyle(cell.getContext()) : undefined}
                      className={cell.column.columnDef.meta?.getCellClass ? cell.column.columnDef.meta?.getCellClass(cell.getContext()) : undefined}
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
      </div>
    </>
  );
});
