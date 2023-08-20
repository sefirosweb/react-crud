import React from "react";
import { EnableGlobalFilterLabels, GlobalFilters } from "../../../types";
type Props = {
    isLoading: boolean;
    enableGlobalFilter?: boolean;
    enableGlobalFilterLabels?: Array<EnableGlobalFilterLabels>;
    createButtonTitle?: string;
    canRefresh?: boolean;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
    setDynamicFilters: React.Dispatch<React.SetStateAction<Array<GlobalFilters>>>;
    refreshTable: () => void;
    generateExcel: (fileName: string) => Promise<void>;
    handleModalShow: () => void;
    customButtons?: JSX.Element;
    canExport: boolean;
    exportName: string;
};
export declare const TableToolbar: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
