import React from 'react';
import { QuillOptionsStatic } from 'quill';
export type Props = {
    label?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    value?: string;
    className?: string;
    options?: QuillOptionsStatic;
};
export declare const FormTypeHtml: (props: Props) => import("react/jsx-runtime").JSX.Element;
