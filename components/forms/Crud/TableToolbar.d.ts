import React from "react";
type Props = {
    isLoading: boolean;
    enableGlobalFilter?: boolean;
    createButtonTitle?: string;
    canRefresh?: boolean;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
    refreshTable: () => void;
    generateExcel: (fileName: string) => Promise<void>;
    handleModalShow: () => void;
    customButtons?: JSX.Element;
    canExport: boolean;
    exportName: string;
};
export declare const TableToolbar: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
