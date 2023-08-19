import React from 'react';
export type Props = {
    name: string;
    controlId: string;
    className?: string;
    label?: string;
    isLoading?: boolean;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
    rows?: number;
};
export declare const FormTypeTextArea: (props: Props) => import("react/jsx-runtime").JSX.Element;
