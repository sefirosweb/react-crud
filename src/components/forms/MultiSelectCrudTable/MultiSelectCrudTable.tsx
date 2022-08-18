import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Table } from "./../Table";
import {
  InputDataField,
  PropsRef as InputDataFieldPropsRef,
} from "./../InputDataField";
import { DeleteButton } from "./../../buttons/DeleteButton";
import { ColumnDefinition } from "../../../types";

export type Props = {
  primaryKey: string;
  primaryKeyId: string;
  crudUrl: string;
  getDataUrl: string;
  lazyLoad?: boolean;
  columns: Array<ColumnDefinition<any>>;
  handleIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MultiSelectCrudTable = (props: Props) => {
  const {
    primaryKey,
    primaryKeyId,
    crudUrl,
    columns,
    getDataUrl,
    lazyLoad,
    handleIsLoading,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const InputDataFieldRef = useRef<InputDataFieldPropsRef>(null);
  const newColumns = [...columns];

  useEffect(() => {
    loadTableModal();
    console.log('rendering')
  }, []);

  useEffect(() => {
    if (handleIsLoading) {
      handleIsLoading(isLoading);
    }
  }, [isLoading]);

  const refreshModalTable = (request: AxiosResponse) => {
    const { success } = request.data;
    if (success) {
      InputDataFieldRef.current?.clear();
      loadTableModal();
    } else {
      setIsLoading(false);
    }
  };

  newColumns.push({
    header: "Borrar",
    id: "delete_crud",
    cell: (props) => {
      return (
        <DeleteButton
          disabled={isLoading}
          onClick={() => handleDelete(props.row.original[primaryKey])}
        />
      );
    },
  });

  const loadTableModal = () => {
    setDataModal([]);
    setIsLoading(true);
    axios
      .get(`${crudUrl}`, { params: { primaryKeyId } })
      .then((request) => {
        const responseData = request.data.data;
        const success = request.data.success;
        if (success) {
          setDataModal(responseData);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id: string) => {
    setIsLoading(true);
    axios
      .delete(`${crudUrl}`, { data: { primaryKeyId, id } })
      .then(refreshModalTable)
      .catch(() => setIsLoading(false));
  };

  const onAcceptButton = (dataField: string) => {
    setIsLoading(true);
    axios
      .post(`${crudUrl}`, {
        name: dataField,
        primaryKeyId,
      })
      .then(refreshModalTable)
      .catch(() => setIsLoading(false));
  };

  return (
    <>
      <InputDataField
        ref={InputDataFieldRef}
        url={`${getDataUrl}`}
        lazyLoad={lazyLoad}
        onAcceptButton={onAcceptButton}
        isLoading={isLoading}
      />
      <Table
        className="mt-2"
        columns={newColumns}
        data={dataModal}
        isLoading={isLoading}
      />
    </>
  );
};
