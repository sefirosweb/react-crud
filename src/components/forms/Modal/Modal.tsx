import React from "react";
import { Button, Modal as BModal, ButtonProps } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "./../../buttons/LoadingButton";

type CustomProps = {
  body: JSX.Element | string;
  title?: JSX.Element | string;
  accept?: JSX.Element | string;
  handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
  acceptVariant?: ButtonProps['variant'];
  isLoading?: boolean;
};

export type Props = CustomProps & React.ComponentProps<typeof BModal>;

export const Modal: React.FC<Props> = (props) => {
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
    size,
  } = props;

  const handleClose = () => setShow(false);
  const { t } = useTranslation()

  return (
    <>
      <BModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={!isLoading}
        onExited={onExited}
        onShow={onShow}
        size={size}
      >

        {title &&
          <BModal.Header>
            <BModal.Title>{title}</BModal.Title>
          </BModal.Header>}

        <BModal.Body>{body}</BModal.Body>
        <BModal.Footer>
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
        </BModal.Footer>
      </BModal>
    </>
  );
};
