import { InputHTMLAttributes } from 'react';
interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    debounce?: number;
}
export declare function DebouncedInput(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
