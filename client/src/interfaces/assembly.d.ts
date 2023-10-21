import { IMyActinobacteria } from "./myactinobacteria";
import { IUser } from "./user";

export interface IAssembly {
    _id: string;
    creator: IUser
    actinobacteria: IMyActinobacteria;
    date: string;
    bgcs: string;
    softwareTrimming: string;
    softwareAssembly: string;
    parametersAssembly: string;
    qualityFinal: string;
    comments: string;
    link: string;
    sequencingTechnology: string;
    accessionNumber: string;
    paper: string;
}