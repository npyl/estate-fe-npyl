import { ICustomer } from "./customer";

interface IOrganization {
    id: number;
    name: string;
    customers: ICustomer[];
}

interface IOrganizationReq extends Omit<IOrganization, "id" | "customers"> {
    id?: number;
    customers: number[];
}

interface IOrganizationFilter {
    search: string;
    firms: number[];
    customers: number[];
}

export type { IOrganization, IOrganizationReq, IOrganizationFilter };
