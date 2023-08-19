import React from "react";
import { SelectOption } from "../../../types";
export type Props = {
    name: string;
    controlId: string;
    className?: string;
    label?: string;
    isLoading?: boolean;
    isInvalid?: boolean;
    readonly?: boolean;
    handleChange: React.ChangeEventHandler<HTMLSelectElement>;
    value?: string | number | SelectOption;
    selectOptionsUrl?: string;
    options?: SelectOption[] | string[];
};
export declare const FormTypeSelect: (props: Props) => import("react/jsx-runtime").JSX.Element;
