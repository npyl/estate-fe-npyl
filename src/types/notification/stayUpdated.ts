import { IDemand } from "@/types/demand";

interface IStayUpdatedDetails {
    email: string;
    firstName: string;
    lastName: string;
    mobilePhone: string;
    clientRegistered: boolean;
    customerDemand: IDemand;
}

export type { IStayUpdatedDetails };
