import React, { forwardRef, useEffect, useRef, useState, Ref, useImperativeHandle } from "react";
import axios, { AxiosResponse } from "axios";
import { Table } from "./../Table";
import { InputDataField, PropsRef as InputDataFieldPropsRef } from "./../InputDataField";
import { DeleteButton } from "./../../buttons/DeleteButton";
import { ColumnDefinition, DataField } from "../../../types";
import { getInputDataField } from "../../../api/formTypeSelectData";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type Props = {
  label?: string;
  primaryKey: string;
  primaryKeyId: string;
  crudUrl?: string;
  getDataUrl: string;
  lazyLoad?: boolean;
  autoSave?: boolean;
  columns: Array<ColumnDefinition<any>>;
  handleIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange?: (dataModal: Array<DataField>) => void;
};

export type PropsRef = {
  getIds: () => Array<string>;
  getTableData: () => Array<DataField>;
};

export const MultiSelectCrudTable = forwardRef(
  (props: Props, ref: Ref<PropsRef>) => {
    const {
      autoSave = true,
      label,
      primaryKey,
      primaryKeyId,
      crudUrl,
      columns,
      getDataUrl,
      lazyLoad,
      handleIsLoading,
      handleChange,
    } = props;

    const newLazyLoad = autoSave ? lazyLoad : false;

    const [isLoading, setIsLoading] = useState(false);
    const [dataModal, setDataModal] = useState<Array<DataField>>([]);
    const InputDataFieldRef = useRef<InputDataFieldPropsRef>(null);
    const newColumns = [...columns];

    const queryClient = useQueryClient()

    const { data: dataQuery, isRefetching: isRefetchingQuery } = useQuery<any>({
      queryKey: [crudUrl, primaryKeyId],
      queryFn: () => getInputDataField(crudUrl, primaryKeyId),
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    })

    useEffect(() => {
      if (!dataQuery) return
      const responseData = dataQuery.data;
      const success = dataQuery.success;
      if (success) {
        setDataModal(responseData);
      }
    }, [dataQuery, setDataModal])

    useEffect(() => {
      setIsLoading(isRefetchingQuery)
    }, [isRefetchingQuery])

    useImperativeHandle(ref, () => ({
      getIds() {
        return dataModal.map((d) => d[primaryKey]);
      },
      getTableData() {
        return dataModal;
      },
    }));

    useEffect(() => {
      if (handleChange) {
        handleChange(dataModal);
      }
    }, [dataModal, handleChange]);

    useEffect(() => {
      if (handleIsLoading) {
        handleIsLoading(isLoading);
      }
    }, [isLoading, handleIsLoading]);

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
      queryClient.invalidateQueries({ queryKey: [crudUrl, primaryKeyId] })
    };

    const handleDelete = (idDataField: string) => {
      if (autoSave) {
        if (!crudUrl) return;
        setIsLoading(true);
        axios
          .delete(`${crudUrl}`, { data: { primaryKeyId, idDataField } })
          .then(refreshModalTable)
          .catch(() => setIsLoading(false));
      } else {
        const newDataModal = dataModal.filter((d) => {
          return d[primaryKey] !== idDataField;
        });
        setDataModal(newDataModal);
      }
    };

    const onAcceptButton = (dataField: DataField) => {
      if (autoSave) {
        if (!crudUrl) return;
        setIsLoading(true);
        axios
          .post(`${crudUrl}`, {
            name: dataField,
            primaryKeyId,
          })
          .then(refreshModalTable)
          .catch(() => setIsLoading(false));
      } else {
        const newDataModal = [...dataModal];

        const indexOf = newDataModal.findIndex(
          (f) => f[primaryKey] === dataField[primaryKey]
        );

        InputDataFieldRef.current?.clear();

        if (indexOf >= 0) return;
        newDataModal.push(dataField);
        setDataModal(newDataModal);
      }
    };

    return (
      <>
        <InputDataField
          label={label}
          ref={InputDataFieldRef}
          url={getDataUrl}
          lazyLoad={newLazyLoad}
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
  }
);
