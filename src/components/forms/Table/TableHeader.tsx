import { ColumnFiltersState, flexRender, Table } from "@tanstack/react-table";
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

  return (
    <>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <React.Fragment key={headerGroup.id}>
            <tr>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
                          setColumnFilter={(filter) => {
                            if (enableColumnFilters) {
                              header.column.setFilterValue(filter);
                            } else {
                              if (
                                header.column.id &&
                                columnFiltersFields &&
                                setColumnFiltersFields
                              ) {
                                const newColumnFiltersFields = [
                                  ...columnFiltersFields,
                                ];
                                const filteredValue =
                                  newColumnFiltersFields.find(
                                    (f) => f.id === header.column.id
                                  );
                                if (filteredValue) {
                                  filteredValue.value = filter;
                                } else {
                                  newColumnFiltersFields.push({
                                    id: header.column.id,
                                    value: filter,
                                  });
                                }

                                setColumnFiltersFields(newColumnFiltersFields);
                              }
                            }
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
