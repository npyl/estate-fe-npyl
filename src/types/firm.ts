import { ICustomer } from "./customer";

interface IFirm {
    id: number;
    name: string;
    customers: ICustomer[];
}

interface IFirmReq extends Omit<IFirm, "id" | "customers"> {
    id?: number;
    customers: number[];
}

interface IFirmFilter {
    search: string;
    firms: number[];
    customers: number[];
}

export type { IFirm, IFirmReq, IFirmFilter };
