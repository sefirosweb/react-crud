import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import toastr from 'toastr';
import { Form } from 'react-bootstrap';
import { Modal } from './../Modal';
import { FormTypes } from './../FormTypes';
import { ColumnDefinition, Variant } from '../../../types';
import { FieldTypes } from '../../../types/FieldTypes';

export type ModalData = {
  [key: string]: string | number | undefined;
};

export type CrudType = 'CREATE' | 'UPDATE' | 'DELETE';

export type Props = {
  accept?: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  url: string;
  handleSuccess?: Function;
  crud: CrudType;
  titleOnDelete?: string; // TODO: This must be relationshop pf "<Array<Fields"
  primaryKey: string; // TODO: This must be relationshop pf "<Array<Fields"
  fields: Array<ColumnDefinition<any>>;
  data: ModalData;
};

export const ModalCrud = (props: Props) => {
  const {
    show,
    setShow,
    title,
    accept = 'Accept',
    fields,
    url,
    handleSuccess,
    data,
    crud,
    primaryKey,
    titleOnDelete,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [variantButton, setVariantButton] = useState<Variant>('info');
  const [modalData, setModalData] = useState<ModalData>(data);
  const onExited = () => setModalData({});

  useEffect(() => {
    setModalData(data);
  }, [data]);

  useEffect(() => {
    switch (crud) {
      case 'CREATE':
        setVariantButton('success');
        break;
      case 'UPDATE':
        setVariantButton('warning');
        break;
      case 'DELETE':
        setVariantButton('danger');
        break;
    }
  }, [crud]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormData = {
      ...modalData,
    };

    newFormData[fieldName] = fieldValue;

    setModalData(newFormData);
  };

  const sendRequest = () => {
    setIsLoading(true);
    const response = (request: AxiosResponse<any, any>) => {
      setShow(false);

      if (
        handleSuccess &&
        {}.toString.call(handleSuccess) === '[object Function]'
      ) {
        handleSuccess(request, crud);
      }
    };

    const completed = () => {
      setIsLoading(false);
    };

    const modalDataToSend: ModalData = {};
    fields
      .filter((f) => f.editable)
      .forEach((f) => {
        if (f.accessorKey) {
          modalDataToSend[f.accessorKey] = modalData[f.accessorKey] ?? '';
        }
      });

    switch (crud) {
      case 'CREATE':
        axios.post(url, modalDataToSend).then(response).finally(completed);
        break;
      case 'DELETE':
        axios
          .delete(url, { data: modalData })
          .then(response)
          .finally(completed);
        break;
      case 'UPDATE':
        axios.put(url, modalData).then(response).finally(completed);
        break;
      default:
        toastr.warning('Error on crud', 'No selected correct CRUD petitin');
        setIsLoading(false);
    }
  };

  const titleOnCRUD = () => {
    if (crud === 'DELETE') {
      return (
        <span>
          <p>Seguro que quieres el registro: {modalData[primaryKey]}</p>
          {titleOnDelete && <p>{modalData[titleOnDelete]}</p>}
        </span>
      );
    }
    return null;
  };

  const bodyFields = () => {
    return (
      <Form>
        {fields.map((field) => {
          if (!field.accessorKey) return null;
          if (!field.editable) return null;

          if (field.accessorKey === primaryKey)
            return (
              <Form.Control
                key={field.accessorKey}
                type="hidden"
                name="primaryKey"
                value={modalData[field.accessorKey] ?? ''}
              />
            );

          if (crud === 'DELETE') return null;

          if (field.fieldType === FieldTypes.MULTISELECT) return null;

          return (
            <FormTypes
              className="mb-2"
              type={field.fieldType ?? FieldTypes.TEXT}
              key={field.accessorKey}
              inputFieldName={field.accessorKey}
              label={field.titleOnCRUD ?? field.accessorKey}
              isLoading={isLoading}
              handleChange={handleChange}
              value={modalData[field.accessorKey] ?? ''}
              selectOptionsUrl={field.selectOptionsUrl ?? ''}
            />
          );
        })}
        {titleOnCRUD()}
      </Form>
    );
  };
  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        handleAccept={sendRequest}
        body={bodyFields()}
        title={title}
        onExited={onExited}
        isLoading={isLoading}
        accept={accept ? accept : 'Accept'}
        acceptVariant={variantButton}
      />
    </>
  );
};
