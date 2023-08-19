import React from "react";
import { Column } from "@tanstack/react-table";
type Props = {
    column: Column<any, unknown>;
    setColumnFilter: React.Dispatch<React.SetStateAction<any>>;
};
export declare function Filter(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
