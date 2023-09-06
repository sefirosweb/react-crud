import { FilterType } from "../../../../types";
import { Column } from "@tanstack/react-table";
type Props = {
    column: Column<any, unknown>;
    setColumnFilter: (filter: FilterType) => void;
};
export declare const TextFilter: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
