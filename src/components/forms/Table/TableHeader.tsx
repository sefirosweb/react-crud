import React from "react";
import { ColumnFiltersState, flexRender, Header, Table } from "@tanstack/react-table";
import { FieldTypes, FilterType } from "../../../types";
import { Filter } from "./Filter";

type Props = {
  table: Table<any>;
  enableColumnFilters: boolean;
  columnFiltersFields?: ColumnFiltersState;
  setColumnFiltersFields?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
};

export const TableHeader = (props: Props) => {
  const {
    table,
    enableColumnFilters = true,
    columnFiltersFields,
    setColumnFiltersFields,
  } = props;

  const filterField = (filter: FilterType, header: Header<any, unknown>) => {
    const fieldType = header.column.columnDef.meta?.fieldType ?? FieldTypes.TEXT


    if (!fieldType) {
      return
    }

    if (enableColumnFilters) {

      if (filter.type === 'text') {
        header.column.setFilterValue(filter.value);
      }

      if (filter.type === 'number') {
        header.column.setFilterValue([filter.min, filter.max]);
      }

      if (filter.type === 'date') {
        header.column.setFilterValue([filter.min, filter.max]);
      }

      return
    }

    if (!header.column.id || !columnFiltersFields || !setColumnFiltersFields) {
      return
    }

    const newColumnFiltersFields = [...columnFiltersFields];
    const fIndex = newColumnFiltersFields.findIndex((f) => f.id === header.column.id);

    let validValude: false | FilterType = false;

    if (
      (typeof filter === "string" && filter === "") ||
      (Array.isArray(filter) && isNaN(filter[0]) && isNaN(filter[1]))
    ) {
      validValude = false;
    } else {
      validValude = filter;
    }

    if (fIndex < 0 && validValude) {
      newColumnFiltersFields.push({
        id: header.column.id,
        value: validValude,
      });
    }

    if (fIndex >= 0 && validValude) {
      newColumnFiltersFields[fIndex].value = validValude;
    }

    if (fIndex >= 0 && !validValude) {
      newColumnFiltersFields.splice(fIndex, 1);
    }

    setColumnFiltersFields(newColumnFiltersFields);
  };

  return (
    <>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <React.Fragment key={headerGroup.id}>
            <tr>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}

                      {header.column.getCanSort()
                        ? { asc: " 🔼", desc: " 🔽", }[header.column.getIsSorted() as string] ?? " -"
                        : null}
                    </div>
                  )}
                </th>
              ))}
            </tr>

            {headerGroup.headers.find(
              (header) => header.column.columnDef.enableColumnFilter
            ) && (
                <tr>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.column.columnDef.enableColumnFilter && (
                        <div>
                          <Filter
                            column={header.column}
                            setColumnFilter={(filter) => {
                              filterField(filter, header)
                            }}
                          />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              )}
          </React.Fragment>
        ))}
      </thead>
    </>
  );
};
