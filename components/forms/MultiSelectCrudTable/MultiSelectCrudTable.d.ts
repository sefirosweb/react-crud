import React from "react";
import { ColumnDefinition, DataField } from "../../../types";
export type Props = {
    label?: string;
    sentKeyAs?: string;
    primaryKey: string;
    primaryKeyId: string;
    sentPrimaryKeyIdAs?: string;
    crudUrl?: string;
    getDataUrl: string;
    lazyLoad?: boolean;
    autoSave?: boolean;
    columns: Array<ColumnDefinition<any>>;
    handleIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    handleChange?: (dataModal: Array<DataField>) => void;
};
export type PropsRef = {
    getIds: () => Array<string>;
    getTableData: () => Array<DataField>;
};
export declare const MultiSelectCrudTable: React.ForwardRefExoticComponent<Props & React.RefAttributes<PropsRef>>;
