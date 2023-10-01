export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
}

export interface IAssemblyFilterVariables {
    actinobacteria?: string;
}

export interface IProcessedDataFilterVariables {
    actinobacteria?: string;
}