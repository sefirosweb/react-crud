import { Filters } from '@sefirosweb/react-multiple-search';
import { CrudType, ModalDataToSend } from '../types';
export declare const getRequestData: (url?: string, params?: Array<Filters>) => Promise<unknown>;
type MutateData = {
    crud: CrudType;
    url: string;
    modalDataToSend: ModalDataToSend;
};
export declare const mutateData: (options: MutateData) => Promise<any>;
export {};
