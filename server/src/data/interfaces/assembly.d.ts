import { PaginationQueryInterface } from "./global";

export interface AssemblyParamsInterface {
    id: string;
}

export interface AssemblyBodyInterface {
    actinobacteria: string;
    date: string;
    bgcs: string;
    softwareTrimming: string;
    softwareAssembly: string;
    parametersAssembly: string;
    qualityFinal: string;
    comments: string;
    link: string;
}

export interface AssemblyPaginationQueryInterface extends PaginationQueryInterface {
    name_like: string;
}