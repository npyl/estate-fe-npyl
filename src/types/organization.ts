import { ICustomer } from "./customer";

interface IOrganization {
    id: number;
    name: string;
    email: string;
    phone: string;
    gemh: string;
    avatar: string;
    customers: ICustomer[];

    createdAt: string;
    updatedAt: string;
}

interface IOrganizationReq {
    id?: number;
    name: string;
    email: string;
    phone: string;
    gemh: string;
}

interface IOrganizationShortRes {
    id: number;
    name: string;
    avatar: string;

    createdAt: string;
    updatedAt: string;
}

interface IOrganizationFilter {
    search: string;
    // firms: number[];
    // customers: number[];
}

export type {
    IOrganization,
    IOrganizationReq,
    IOrganizationShortRes,
    IOrganizationFilter,
};
