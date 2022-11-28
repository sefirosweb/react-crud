import {
  ColumnFiltersState,
  flexRender,
  Header,
  Table,
} from "@tanstack/react-table";
import React from "react";
import { Filter } from "./Filter";

type Props = {
  table: Table<any>;
  enableColumnFilters: boolean;
  columnFiltersFields?: ColumnFiltersState;
  setColumnFiltersFields?: React.Dispatch<
    React.SetStateAction<ColumnFiltersState>
  >;
};

export const TableHeader = (props: Props) => {
  const {
    table,
    enableColumnFilters = true,
    columnFiltersFields,
    setColumnFiltersFields,
  } = props;

  const filterField = (filter: any, header: Header<any, unknown>) => {
    if (enableColumnFilters) {
      header.column.setFilterValue(filter);
    } else {
      if (header.column.id && columnFiltersFields && setColumnFiltersFields) {
        const newColumnFiltersFields = [...columnFiltersFields];
        const fIndex = newColumnFiltersFields.findIndex(
          (f) => f.id === header.column.id
        );

        let validValude;

        if (
          (typeof filter === "string" && filter === "") ||
          (Array.isArray(filter) && filter[0] === "" && filter[1] === "")
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
      }
    }
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
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {header.column.getCanSort()
                        ? {
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? " -"
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
                            setColumnFilter={(filter) =>
                              filterField(filter, header)
                            }
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
