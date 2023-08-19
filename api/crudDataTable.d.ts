import { CrudType, InputFilter, ModalDataToSend } from '../types';
export declare const getRequestData: (url?: string, params?: InputFilter) => Promise<unknown>;
type MutateData = {
    crud: CrudType;
    url: string;
    modalDataToSend: ModalDataToSend;
};
export declare const mutateData: (options: MutateData) => Promise<any>;
export {};
