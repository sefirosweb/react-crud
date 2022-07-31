import React from 'react';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';
import { Variant } from '../../../types';
import { LoadingButton } from './../../buttons/LoadingButton';

export type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
  body?: JSX.Element;
  title?: string;
  accept?: string;
  acceptVariant?: Variant;
  onExited?: Function;
  onShow?: Function;
  isLoading?: boolean;
};

export const Modal = (props: Props) => {
  const {
    show,
    setShow,
    handleAccept,
    body,
    title,
    accept,
    acceptVariant = 'primary',
    onExited,
    onShow,
    isLoading,
  } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <BootstrapModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={!isLoading}
        // @ts-ignore: Unreachable code error bug from react boostrap
        onExited={onExited}
        // @ts-ignore: Unreachable code error bug from react boostrap
        onShow={onShow}
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
            Cerrar
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
