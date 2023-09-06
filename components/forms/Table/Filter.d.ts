import { Column } from "@tanstack/react-table";
import { FilterType } from "../../../types";
type Props = {
    column: Column<any, unknown>;
    setColumnFilter: (filter: FilterType) => void;
};
export declare function Filter(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
