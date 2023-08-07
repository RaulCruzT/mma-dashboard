import { PaginationQueryInterface } from "./global";

export const enum UserRoles { 
    User = 'user',
    Manager = 'manager',
    Admin = 'admin',
} 

export interface UserParamsInterface {
    id: string;
}

export interface UserBodyInterface {
    name: string;
    email: string;
    avatar: string;
    role: string;
}

export interface UserPaginationQueryInterface extends PaginationQueryInterface {
    name_like: string;
    email_like: string;
}