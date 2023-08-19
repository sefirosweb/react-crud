type HandleChange = {
    target: {
        name: string;
        value: "0" | "1";
    };
};
export type Props = {
    name: string;
    controlId: string;
    className?: string;
    label?: string;
    isLoading?: boolean;
    handleChange: (handle: HandleChange) => void;
    value?: string | number | boolean;
};
export declare const FormTypeCheckbox: (props: Props) => import("react/jsx-runtime").JSX.Element;
export {};
