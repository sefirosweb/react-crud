import React from "react";
import { ColumnDefinition } from "../../../types";
export type Props = {
    sentKeyAs?: string;
    primaryKey: string;
    primaryKeyId: string;
    sentPrimaryKeyIdAs?: string;
    crudUrl: string;
    getDataUrl: string;
    lazyLoad?: boolean;
    columns: Array<ColumnDefinition<any>>;
    onExitModal?: () => void;
    title?: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const MultiSelectCrud: React.FC<Props>;
