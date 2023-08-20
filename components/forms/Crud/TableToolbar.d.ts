import React from "react";
import { FilterLabel, Filters } from '@sefirosweb/react-multiple-search';
type Props = {
    isLoading: boolean;
    enableGlobalFilter?: boolean;
    enableGlobalFilterLabels?: Array<FilterLabel>;
    createButtonTitle?: string;
    canRefresh?: boolean;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
    setDynamicFilters: React.Dispatch<React.SetStateAction<Array<Filters>>>;
    refreshTable: () => void;
    generateExcel: (fileName: string) => Promise<void>;
    handleModalShow: () => void;
    customButtons?: JSX.Element;
    canExport: boolean;
    exportName: string;
};
export declare const TableToolbar: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
