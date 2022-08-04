import React, { useRef, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Modal } from './../Modal';
import { Table } from './../Table';
import {
  InputDataField,
  PropsRef as InputDataFieldPropsRef,
} from './../InputDataField';
import { DeleteButton } from './../../buttons/DeleteButton';
import { ColumnDefinition } from '../../../types';

export type Props = {
  primaryKey: string;
  primaryKeyId: string;
  crudUrl: string;
  getDataUrl: string;
  lazyLoad?: boolean;
  columns: Array<ColumnDefinition<any>>;
  onExitModal?: () => void;
  title?: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MultiSelectCrud = (props: Props) => {
  const {
    primaryKey,
    primaryKeyId,
    crudUrl,
    columns,
    onExitModal,
    getDataUrl,
    lazyLoad,
    title,
    show,
    setShow,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const InputDataFieldRef = useRef<InputDataFieldPropsRef>(null);
  const newColumns = [...columns];

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
    header: 'Borrar',
    id: 'delete_crud',
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

  const body = (
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

  const onExited = () => {
    if (onExitModal && {}.toString.call(onExitModal) === '[object Function]') {
      onExitModal();
    }
  };

  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        onShow={loadTableModal}
        title={title}
        body={body}
        isLoading={isLoading}
        onExited={onExited}
      />
    </>
  );
};
