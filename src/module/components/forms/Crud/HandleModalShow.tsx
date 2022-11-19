import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { ColumnDefinition, CrudType } from "../../../types";
import { ModalCrud } from "../ModalCrud";

export type PropsRef = {
  handleModalShow: (type: CrudType, key?: number) => void;
};

export type Props = {
  columns: ColumnDefinition<any, unknown>[];
  refreshTable: () => void;
  url: string;
  primaryKey: string;
  titleOnDelete?: string;
  handleSuccess?: (request: AxiosResponse<any, any>, crud: CrudType) => void;
  dataTable: any[];
};

export const HandleModalShow = forwardRef(
  (props: Props, ref: Ref<PropsRef>) => {
    const {
      columns,
      url,
      refreshTable,
      primaryKey,
      titleOnDelete,
      dataTable,
      handleSuccess,
    } = props;
    const [crud, setCrud] = useState<CrudType>("CREATE");
    const [modalTitle, setModalTitle] = useState("");
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState(columns);

    const handleSuccessModalCrud = (
      request: AxiosResponse<any, any>,
      crud: CrudType
    ) => {
      refreshTable();

      if (
        handleSuccess &&
        {}.toString.call(handleSuccess) === "[object Function]"
      ) {
        handleSuccess(request, crud);
      }
    };

    const handleModalShow = (type: CrudType, key?: number) => {
      const fieldsCanBeEdit = columns
        .filter((column) => (column.editable && column.accessorKey) || column.accessorKey === primaryKey)
        .map((column) => {
          if (!column.accessorKey) return column;
          if (type === "CREATE" || key === undefined) {
            column.data = "";
          } else {
            column.data = dataTable[key][column.accessorKey];
          }
          return column;
        });

      setCrud(type);
      setModalData(fieldsCanBeEdit);
      setModalTitle(type); // TODO change title

      setShow(true);
    };

    useImperativeHandle(ref, () => ({
      handleModalShow,
    }));

    return (
      <ModalCrud
        show={show}
        setShow={setShow}
        fields={modalData}
        title={modalTitle}
        crud={crud}
        url={url}
        handleSuccess={handleSuccessModalCrud}
        primaryKey={primaryKey}
        titleOnDelete={titleOnDelete}
      />
    );
  }
);
