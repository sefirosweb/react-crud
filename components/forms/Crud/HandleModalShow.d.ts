/// <reference types="react" />
import { ColumnDefinition, CrudType } from "../../../types";
export type PropsRef = {
    handleModalShow: (type: CrudType, key?: number) => void;
};
export type Props = {
    columns: ColumnDefinition<any, unknown>[];
    refreshTable: () => void;
    url: string;
    primaryKey: string;
    sentKeyAs?: string;
    titleOnDelete?: string;
    handleSuccess?: (response: any, crud: CrudType) => void;
    dataTable: any[];
};
export declare const HandleModalShow: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<PropsRef>>;
