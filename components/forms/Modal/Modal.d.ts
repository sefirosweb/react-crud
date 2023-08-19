import React from "react";
import { Modal as BModal, ButtonProps } from "react-bootstrap";
type CustomProps = {
    body: JSX.Element | string;
    title?: JSX.Element | string;
    accept?: JSX.Element | string;
    handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
    acceptVariant?: ButtonProps['variant'];
    isLoading?: boolean;
};
export type Props = CustomProps & React.ComponentProps<typeof BModal>;
export declare const Modal: React.FC<Props>;
export {};
