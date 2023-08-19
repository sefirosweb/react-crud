import React from "react";
import { SelectOption, DataField } from "../../../types";
export type PropsRef = {
    clear: () => void;
};
export type Props = {
    data?: SelectOption[];
    url?: string;
    label?: string;
    className?: string;
    limit?: number;
    lazyLoad?: boolean;
    onAcceptButton: (value: DataField) => void;
    handleChangeFilter?: (filter: string) => void;
    isLoading?: boolean;
};
export declare const InputDataField: React.ForwardRefExoticComponent<Props & React.RefAttributes<PropsRef>>;
