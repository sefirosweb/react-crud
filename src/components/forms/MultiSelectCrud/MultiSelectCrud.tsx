import React, { useState } from "react";
import { Modal } from "./../Modal";

import { ColumnDefinition } from "../../../types";
import { MultiSelectCrudTable } from "../MultiSelectCrudTable";

export type Props = {
  sentKeyAs?: string;
  primaryKey: string;
  primaryKeyId: string;
  sentPrimaryKeyIdAs?: string;
  crudUrl: string;
  getDataUrl: string;
  lazyLoad?: boolean;
  columns: Array<ColumnDefinition<any>>;
  onExitModal?: () => void;
  title?: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MultiSelectCrud: React.FC<Props> = (props) => {
  const {
    sentKeyAs,
    primaryKey,
    primaryKeyId,
    sentPrimaryKeyIdAs,
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
        sentKeyAs={sentKeyAs}
        primaryKeyId={primaryKeyId}
        sentPrimaryKeyIdAs={sentPrimaryKeyIdAs}
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
