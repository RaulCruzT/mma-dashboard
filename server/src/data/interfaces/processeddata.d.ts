import { PaginationQueryInterface } from "./global";

export interface ProcessedDataParamsInterface {
    id: string;
}

export interface ProcessedDataBodyInterface {
    actinobacteria: string;
    massDetection: string;
    chromatogramBuilder: string;
    deconvolution: string;
    isotope: string;
    filtered: string;
    identification: string;
    alignment: string;
    gapFilling: string;
    comments: string;
}

export interface ProcessedDataPaginationQueryInterface extends PaginationQueryInterface {
    massDetection_like: string;
    chromatogramBuilder_like: string;
    deconvolution_like: string;
    isotope_like: string;
    actinobacteria: string;
}