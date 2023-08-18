import React, { forwardRef, useEffect, useRef, useState, Ref, useImperativeHandle } from "react";
import { Table } from "./../Table";
import { InputDataField, PropsRef as InputDataFieldPropsRef } from "./../InputDataField";
import { DeleteButton } from "./../../buttons/DeleteButton";
import { ColumnDefinition, DataField } from "../../../types";
import { getInputDataField } from "../../../api/crudMultiSelectTable";
import { QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mutateData } from "../../../api/crudMultiSelectTable";
import { useGetQueryClient } from "../../../api/useGetQueryClient";
import { useTranslation } from "react-i18next";

export type Props = {
  label?: string;
  sentKeyAs?: string;
  primaryKey: string;
  primaryKeyId: string;
  sentPrimaryKeyIdAs?: string;
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

const MultiSelectCrudTableAction = forwardRef(
  (props: Props, ref: Ref<PropsRef>) => {
    const {
      autoSave = true,
      label,
      sentKeyAs,
      primaryKey,
      primaryKeyId,
      sentPrimaryKeyIdAs = 'primaryKeyId',
      crudUrl = '',
      columns,
      getDataUrl,
      lazyLoad,
      handleIsLoading,
      handleChange,
    } = props;

    const sentKeyAsValue = sentKeyAs ?? primaryKey

    const newLazyLoad = autoSave ? lazyLoad : false;

    const [isLoading, setIsLoading] = useState(false);
    const [dataModal, setDataModal] = useState<Array<DataField>>([]);
    const InputDataFieldRef = useRef<InputDataFieldPropsRef>(null);
    const newColumns = [...columns];

    const queryClient = useQueryClient()

    const { t } = useTranslation()

    const { data: dataQuery, isRefetching: isRefetchingQuery, isLoading: isLoadingQuery } = useQuery<any>({
      queryKey: [crudUrl, primaryKeyId],
      queryFn: () => getInputDataField(crudUrl, {
        [sentPrimaryKeyIdAs]: primaryKeyId
      }),
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    })

    const { mutate, isLoading: isLoadingMutation } = useMutation({
      mutationFn: mutateData,
      onSettled: (response: any) => {
        if (response.success) {
          queryClient.invalidateQueries({ queryKey: [crudUrl, primaryKeyId] })
          InputDataFieldRef.current?.clear();
        }
      }
    })

    useEffect(() => {
      setIsLoading(isRefetchingQuery || isLoadingMutation || isLoadingQuery)

      if (handleIsLoading) {
        handleIsLoading(isRefetchingQuery || isLoadingMutation || isLoadingQuery);
      }

    }, [isRefetchingQuery, isLoadingMutation, isLoadingQuery, handleIsLoading])

    useEffect(() => {
      if (!dataQuery) return
      const responseData = dataQuery.data;
      const success = dataQuery.success;
      if (success) {
        setDataModal(responseData);
      }
    }, [dataQuery, setDataModal])

    useEffect(() => {
      if (handleChange) {
        handleChange(dataModal);
      }
    }, [dataModal]);

    newColumns.push({
      header: t('Delete') as string,
      id: "delete_crud",
      cell: (props) => {
        return (
          <DeleteButton
            disabled={isLoading}
            onClick={() => handleDelete(props.row.original)}
          />
        );
      },
    });

    const handleDelete = (dataField: DataField) => {
      if (autoSave) {
        if (!crudUrl) return;

        const dataToSend = {
          ...dataField,
          [sentKeyAsValue]: dataField[primaryKey],
          [sentPrimaryKeyIdAs]: primaryKeyId,
        }

        mutate({
          crud: "DELETE",
          url: crudUrl,
          dataToSend
        })

      } else {
        const newDataModal = dataModal.filter((d) => {
          return d[primaryKey] !== dataField[primaryKey];
        });
        setDataModal(newDataModal);
      }
    };

    const onAcceptButton = (dataField: DataField) => {
      if (autoSave) {
        if (!crudUrl) return;

        const dataToSend: any = {
          ...dataField,
          [sentKeyAsValue]: dataField[primaryKey],
          [sentPrimaryKeyIdAs]: primaryKeyId,
        }

        mutate({
          crud: "CREATE",
          url: crudUrl,
          dataToSend
        })

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

    useImperativeHandle(ref, () => ({
      getIds() {
        return dataModal.map((d) => d[primaryKey]);
      },
      getTableData() {
        return dataModal;
      },
    }));

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

export const MultiSelectCrudTable = forwardRef((props: Props, ref: Ref<PropsRef>) => {
  const client = useGetQueryClient()
  return (
    <>
      <QueryClientProvider client={client}>
        <MultiSelectCrudTableAction  {...props} ref={ref} />
      </QueryClientProvider>
    </>
  )
})