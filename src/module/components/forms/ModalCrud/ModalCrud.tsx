import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Modal } from "./../Modal";
import { FormTypes } from "./../FormTypes";
import { ColumnDefinition, ModalDataToSend, Variant } from "../../../types";
import { FieldTypes, CrudType, DataField } from "../../../types";
import { MultiSelectCrudTable } from "../MultiSelectCrudTable";
import { QueryClientProvider, useMutation } from "@tanstack/react-query";
import { mutateData } from "../../../api/crudDataTable";
import { useGetQueryClient } from "../../../api/useGetQueryClient";

export type Props = {
  accept?: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  url: string;
  handleSuccess?: (response: any, crud: CrudType) => void;
  crud: CrudType;
  titleOnDelete?: string; // TODO: This must be relationshop pf "<Array<Fields"
  primaryKey: string; // TODO: This must be relationshop pf "<Array<Fields"
  fields: Array<ColumnDefinition<any>>;
};

const FilterModalData = (fields: Array<ColumnDefinition<any, unknown>>) => {
  const newModalData: Record<string, ColumnDefinition<any>> = {};
  fields.forEach((field) => {
    if (!field.accessorKey) return;
    newModalData[field.accessorKey] = field;
  });
  return newModalData;
};

const ModalCrudAction = (props: Props) => {
  const {
    show,
    setShow,
    title,
    accept = "Accept",
    fields,
    url,
    handleSuccess,
    crud,
    primaryKey,
    titleOnDelete,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [variantButton, setVariantButton] = useState<Variant>("info");
  const [modalData, setModalData] = useState(FilterModalData(fields));

  const { mutate } = useMutation({
    mutationFn: mutateData
  })

  useEffect(() => {
    const newModalData = FilterModalData(fields)
    setModalData(newModalData)
  }, [fields])

  useEffect(() => {
    switch (crud) {
      case "CREATE":
        setVariantButton("success");
        break;
      case "UPDATE":
        setVariantButton("warning");
        break;
      case "DELETE":
        setVariantButton("danger");
        break;
    }
  }, [crud]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newFormData = { ...modalData };

    const fieldWithData = newFormData[fieldName];
    if (!fieldWithData) return;
    if (fieldWithData.fieldType !== FieldTypes.MULTISELECT) {
      fieldWithData.data = fieldValue;
    }

    setModalData(newFormData);
  };

  const handleChangeMultiSelect = (
    data: Array<DataField>,
    fieldName: string
  ) => {
    const newFormData = {
      ...modalData,
    };

    const fieldWithData = newFormData[fieldName];
    if (!fieldWithData) return;

    if (fieldWithData.fieldType === FieldTypes.MULTISELECT) {
      const dataList = data.map((d) => d.value);
      fieldWithData.data = dataList;
    }

    setModalData(newFormData);
  };

  const sendRequest = () => {
    setIsLoading(true);
    const modalDataToSend: ModalDataToSend = {};

    fields
      .filter((f) => f.editable || f.accessorKey === primaryKey)
      .forEach((f) => {
        if (f.accessorKey) {
          modalDataToSend[f.accessorKey] = modalData[f.accessorKey].data ?? "";
        }
      });

    mutate({
      crud,
      modalDataToSend,
      url
    },
      {
        onSuccess: (response) => {
          setShow(false);
          setIsLoading(false)

          if (
            handleSuccess &&
            {}.toString.call(handleSuccess) === "[object Function]"
          ) {
            handleSuccess(response, crud);
          }
        },
        onError: () => {
          setIsLoading(false)
        }
      }
    )
  };

  const titleOnCRUD = () => {
    if (crud === "DELETE") {
      return (
        <span>
          <p>Seguro que quieres el registro: {modalData[primaryKey].data}</p>
          {titleOnDelete && <p>{modalData[titleOnDelete].data}</p>}
        </span>
      );
    }
    return null;
  };

  const bodyFields = () => {
    return (
      <>
        <Form>
          {fields.map((field) => {
            if (!field.accessorKey) return null;
            if (!field.editable) return null;
            const fieldWithData = modalData[field.accessorKey];
            if (!fieldWithData) return null;
            if (!fieldWithData.accessorKey) return null;

            if (fieldWithData.accessorKey === primaryKey)
              return (
                <Form.Control
                  key={fieldWithData.accessorKey}
                  type="hidden"
                  name="primaryKey"
                  value={(fieldWithData.data as string) ?? ""}
                />
              );

            if (crud === "DELETE") return null;

            if (fieldWithData.fieldType === FieldTypes.MULTISELECT) return null;

            if (fieldWithData.fieldType === FieldTypes.SELECT) {
              return (
                <FormTypes
                  type={fieldWithData.fieldType}
                  key={fieldWithData.accessorKey}
                  name={fieldWithData.accessorKey}
                  controlId={fieldWithData.accessorKey}
                  label={fieldWithData.titleOnCRUD ?? fieldWithData.accessorKey}
                  isLoading={isLoading}
                  handleChange={handleChange}
                  value={fieldWithData.data}
                  selectOptionsUrl={fieldWithData.selectOptionsUrl ?? ""}
                  className="mb-2"
                />
              );
            }

            return (
              <FormTypes
                type={fieldWithData.fieldType ?? FieldTypes.TEXT}
                key={fieldWithData.accessorKey}
                name={fieldWithData.accessorKey}
                controlId={fieldWithData.accessorKey}
                label={fieldWithData.titleOnCRUD ?? fieldWithData.accessorKey}
                isLoading={isLoading}
                handleChange={handleChange}
                value={fieldWithData.data as string}
                className="mb-2"
              />
            );
          })}
          {titleOnCRUD()}
        </Form>

        {fields.map((field) => {
          if (crud === "DELETE") return null;
          if (!field.multiSelectOptions) return null;
          if (!field.accessorKey) return null;
          const fieldWithData = modalData[field.accessorKey];
          if (!fieldWithData?.accessorKey) return null;
          if (fieldWithData.fieldType !== FieldTypes.MULTISELECT) return null;

          let crudUrl = "";
          if (crud === "UPDATE") {
            crudUrl = fieldWithData.multiSelectOptions?.url ?? "";
          }

          return (
            <MultiSelectCrudTable
              label={fieldWithData.titleOnCRUD ?? fieldWithData.accessorKey}
              key={fieldWithData.accessorKey}
              columns={field.multiSelectOptions.columns}
              crudUrl={crudUrl}
              getDataUrl={fieldWithData.multiSelectOptions.getDataUrl}
              sentKeyAs={fieldWithData.multiSelectOptions.sentKeyAs}
              primaryKey={fieldWithData.multiSelectOptions.primaryKey as string}
              primaryKeyId=""
              lazyLoad={fieldWithData.multiSelectOptions.lazyLoad}
              autoSave={false}
              handleChange={(data) =>
                handleChangeMultiSelect(
                  data,
                  fieldWithData.accessorKey as string
                )
              }
            />
          );
        })}
      </>
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
        // onExited={onExited}
        isLoading={isLoading}
        accept={accept ? accept : "Accept"}
        acceptVariant={variantButton}
      />
    </>
  );
};


export const ModalCrud = (props: Props) => {
  const client = useGetQueryClient()
  return (
    <QueryClientProvider client={client}>
      <ModalCrudAction {...props} />
    </QueryClientProvider >
  )
}