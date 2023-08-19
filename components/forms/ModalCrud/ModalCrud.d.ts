import React from "react";
import { ColumnDefinition } from "../../../types";
import { CrudType } from "../../../types";
export type Props = {
    accept?: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    url: string;
    handleSuccess?: (response: any, crud: CrudType) => void;
    crud: CrudType;
    titleOnDelete?: string;
    primaryKey: string;
    sentKeyAs?: string;
    fields: Array<ColumnDefinition<any>>;
};
export declare const ModalCrud: React.FC<Props>;
