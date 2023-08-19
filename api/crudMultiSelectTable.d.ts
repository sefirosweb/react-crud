type MutateData = {
    crud: "CREATE" | "DELETE";
    url: string;
    dataToSend: any;
};
export declare const mutateData: (options: MutateData) => Promise<any>;
export declare const getInputDataField: (url: string, filter: Record<string, string>) => Promise<unknown>;
export {};
