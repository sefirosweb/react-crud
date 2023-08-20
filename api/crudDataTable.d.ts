import { CrudType, GlobalFilters, ModalDataToSend } from '../types';
export declare const getRequestData: (url?: string, params?: Array<GlobalFilters>) => Promise<unknown>;
type MutateData = {
    crud: CrudType;
    url: string;
    modalDataToSend: ModalDataToSend;
};
export declare const mutateData: (options: MutateData) => Promise<any>;
export {};
