import React, { useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Modal } from "./../Modal";
import { Table } from "./../Table";
import {
  InputDataField,
  PropsRef as InputDataFieldPropsRef,
} from "./../InputDataField";
import { DeleteButton } from "./../../buttons/DeleteButton";
import { ColumnDefinition } from "../../../types";
import { MultiSelectCrudTable } from "../MultiSelectCrudTable";

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

  const body = (
    <>
      <MultiSelectCrudTable
        columns={columns}
        crudUrl={crudUrl}
        getDataUrl={getDataUrl}
        primaryKey={primaryKey}
        primaryKeyId={primaryKeyId}
        lazyLoad={lazyLoad}
        handleIsLoading={setIsLoading}
      />
    </>
  );

  const onExited = () => {
    if (onExitModal && {}.toString.call(onExitModal) === "[object Function]") {
      onExitModal();
    }
  };

  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        title={title}
        body={body}
        isLoading={isLoading}
        onExited={onExited}
      />
    </>
  );
};
