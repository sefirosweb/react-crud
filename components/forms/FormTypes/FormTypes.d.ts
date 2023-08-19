import { FieldTypes, SelectOption } from "../../../types";
type ValidFieldTypes = Exclude<FieldTypes, FieldTypes.MULTISELECT>;
type PropsParams = {
    text: {
        value?: string;
        options?: never;
        selectOptionsUrl?: never;
    };
    html: {
        value?: string;
        options?: never;
        selectOptionsUrl?: never;
    };
    number: {
        value?: string | number;
        options?: never;
        selectOptionsUrl?: never;
    };
    date: {
        value?: string;
        options?: never;
        selectOptionsUrl?: never;
    };
    textarea: {
        value?: string;
        options?: never;
        selectOptionsUrl?: never;
    };
    password: {
        value?: string;
        options?: never;
        selectOptionsUrl?: never;
    };
    checkbox: {
        value?: string | boolean | number;
        options?: never;
        selectOptionsUrl?: never;
    };
    multiselect: {
        value?: string;
        options?: never;
        selectOptionsUrl?: never;
    };
    select: {
        value?: string | number | SelectOption;
        options?: SelectOption[] | string[];
        selectOptionsUrl?: string;
    };
};
export type Props<Field extends ValidFieldTypes = ValidFieldTypes> = {
    [field in Field]: {
        type: field;
        name: string;
        controlId: string;
        className?: string;
        label?: string;
        isLoading?: boolean;
        handleChange?: any;
    } & PropsParams[field];
}[Field];
export declare const FormTypes: (props: Props) => JSX.Element;
export {};
