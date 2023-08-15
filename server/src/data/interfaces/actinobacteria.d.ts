import { PaginationQueryInterface } from "./global";

export interface ActinobacteriaParamsInterface {
    id: string;
}

export interface ActinobacteriaPaginationQueryInterface extends PaginationQueryInterface {
    name_like: string;
}