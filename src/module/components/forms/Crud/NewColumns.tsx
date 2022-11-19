import React from "react";
import { Props as TableProps } from "../Table";
import { IndeterminateCheckbox } from "../Table/IndeterminateCheckbox";
import { EditButton } from "../../buttons/EditButton";
import { DeleteButton } from "../../buttons/DeleteButton";
import { ShowMultiSelectCrud } from "./ShowMultiSelectCrud";
import { FieldTypes } from "../../../types";
import { PropsRef as HandleModalShowPropsRef } from "./HandleModalShow";
export interface Props
  extends Omit<
    TableProps,
    "globalFilterText" | "isLoading" | "setColumnFiltersFields" | "data"
  > {
  primaryKey: string;
  canEdit?: boolean;
  canDelete?: boolean;
  canSelectRow?: boolean;
  handleModalShowRef: React.RefObject<HandleModalShowPropsRef>;
  refreshTable: () => void;
}

export default (props: Props) => {
  const {
    primaryKey,
    columns,
    canEdit,
    canDelete,
    canSelectRow,
    handleModalShowRef,
    refreshTable,
  } = props;

  const newColumns = [...columns];
  if (canSelectRow === true) {
    newColumns.unshift({
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    });
  }

  if (canEdit) {
    newColumns.push({
      header: "Edit",
      id: "edit_crud",
      cell: (row) => {
        return (
          <EditButton
            onClick={() => {
              handleModalShowRef.current?.handleModalShow(
                "UPDATE",
                parseInt(row.cell.row.id)
              );
            }}
          />
        );
      },
    });
  }

  if (canDelete) {
    newColumns.push({
      header: "Delete",
      id: "edit_crid",
      editable: false,
      cell: (row) => {
        return (
          <DeleteButton
            onClick={() =>
              handleModalShowRef.current?.handleModalShow(
                "DELETE",
                parseInt(row.cell.row.id)
              )
            }
          />
        );
      },
    });
  }

  if (canEdit) {
    newColumns.forEach((c) => {
      if (c.fieldType === FieldTypes.MULTISELECT && c.editable) {
        c.cell = (props) => {
          const onExitModal = () => {
            if (props.column.columnDef.meta?.multiSelectOptions?.onExitModal) {
              props.column.columnDef.meta.multiSelectOptions.onExitModal();
            }

            if (
              props.column.columnDef.meta?.multiSelectOptions
                ?.onExitModalRefresh
            ) {
              refreshTable();
            }
          };

          return (
            <ShowMultiSelectCrud
              crudUrl={
                props.column.columnDef.meta?.multiSelectOptions?.url ?? ""
              }
              getDataUrl={
                props.column.columnDef.meta?.multiSelectOptions?.getDataUrl ??
                ""
              }
              primaryKey={
                props.column.columnDef.meta?.multiSelectOptions?.primaryKey ??
                ""
              }
              primaryKeyId={props.cell.row.original[primaryKey]}
              columns={
                props.column.columnDef.meta?.multiSelectOptions?.columns ?? []
              }
              title={props.column.columnDef.meta?.multiSelectOptions?.title}
              onExitModal={onExitModal}
              lazyLoad={
                props.column.columnDef.meta?.multiSelectOptions?.lazyLoad
              }
            />
          );
        };
      }
    });
  }

  return newColumns;
};
