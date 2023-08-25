import { PaginationQueryInterface } from "./global";

export interface ActinobacteriaParamsInterface {
    id: string;
}

export interface ActinobacteriaBodyInterface {
    identifierStrain: string;
    identifierSpecies: string;
    identifierMainPhoto: string;
    identifierPhotos: string;
    identifierLocalStorage: string;
    identifierInternationalStorage: string;
    identifierComments: string;
    geographyIsolationSite: string;
    geographyCoordinates: string;
    geographyIsolationSource: string;
    geographyAltitude: number;
    geographyComments: string;
    isolationMedium: string;
    isolationTemperature: string;
    isolationMethod: string;
    isolationResponsible: string;
    isolationThesisPaper: string;
    isolationThesisPaperLink: string;
    isolationComments: string;
    arnr16sSize: number;
    arnr16sSequenceFile: string;
    arnr16sMacrogenFile: string;
    arnr16sComments: string;
    enzymesComments: string;
    genomeRawData: string;
    genomeComments: string;
    bioactivityFile: string;
    bioactivityComments: string;
    metabolomicsMedinaFoundationReports: string;
    metabolomicsRawData: string;
    metabolomicsComments: string;
    identifierGenera: string;
    arnr16sCompleteness: string;
    characterizationGrowingMedia: string[];
    characterizationNotGrowingMedia: string[];
    enzymesNa: string[];
    bioactivityYes: string[];
    bioactivityNo: string[];
    bioactivityNa: string[];
    enzymesYes: string[];
    enzymesNo: string[];
    characterizationMycelial: string;
    characterizationColoniesDay: number;
    characterizationSporulationDay: number;
    characterizationBiomassDay: number;
    characterizationShape: string;
    characterizationBorder: string;
    characterizationElevation: string;
    characterizationSurface: string;
    characterizationColor: string;
    characterizationTransparency: string;
    characterizationBrightness: string;
    characterizationComments: string;
}

export interface ActinobacteriaPaginationQueryInterface extends PaginationQueryInterface {
    name_like: string;
}