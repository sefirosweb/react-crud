import React from "react";
import { Button, Modal as BootstrapModal, ModalProps } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Variant } from "../../../types";
import { LoadingButton } from "./../../buttons/LoadingButton";

export type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
  body?: JSX.Element;
  title?: string;
  accept?: string;
  acceptVariant?: Variant;
  onExited?: () => void;
  onShow?: () => void;
  isLoading?: boolean;
  size?: ModalProps['size']
};

export const Modal = (props: Props) => {
  const {
    show,
    setShow,
    handleAccept,
    body,
    title,
    accept,
    acceptVariant = "primary",
    onExited,
    onShow,
    isLoading,
    size
  } = props;

  const handleClose = () => setShow(false);
  const { t } = useTranslation()

  return (
    <>
      <BootstrapModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={!isLoading}
        onExited={onExited}
        onShow={onShow}
        size={size}
      >
        <BootstrapModal.Header>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{body}</BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            {t('Close')}
          </Button>

          {accept &&
            (isLoading ? (
              <LoadingButton />
            ) : (
              <Button variant={acceptVariant} onClick={handleAccept}>
                {accept}
              </Button>
            ))}
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
