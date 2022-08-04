import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { ColumnDefinition } from "../../../types";
import { CrudType, ModalCrud, ModalData } from "../ModalCrud";

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
    const [modalData, setModalData] = useState<ModalData>({});
    const [modalTitle, setModalTitle] = useState("");
    const [show, setShow] = useState(false);

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
        .filter((column) => column.editable)
        .map((column) => column.accessorKey);

      let findDataCanBeEdit: ModalData = {};

      if (type !== "CREATE" && key !== undefined) {
        findDataCanBeEdit = Object.keys(dataTable[key]).reduce(
          (returnData, column) => {
            if (fieldsCanBeEdit.includes(column) || column === primaryKey) {
              returnData[column] = dataTable[key][column];
            }
            return returnData;
          },
          findDataCanBeEdit
        );
      }

      setCrud(type);
      setModalData(findDataCanBeEdit);
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
        fields={columns}
        title={modalTitle}
        data={modalData}
        crud={crud}
        url={url}
        handleSuccess={handleSuccessModalCrud}
        primaryKey={primaryKey}
        titleOnDelete={titleOnDelete}
      />
    );
  }
);
