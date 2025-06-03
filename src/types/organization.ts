import { ICustomer, IDemand } from "./customer";
import { KeyValue } from "./KeyValue";
import { ILabel } from "./label";
import { ILocation } from "./location";
import { INote } from "./note";
import { IProperties } from "./properties";
import { IKanbanCardShort } from "./tasks";
import { IUser } from "./user";

interface IOrganization {
    id: number;
    name: string;
    email: string;
    // -- phone --
    gemh: string;
    avatar: string;
    customers: ICustomer[];

    createdAt: string;
    updatedAt: string;

    mobilePhone: string;
    homePhone: string;

    afm: string;
    managedBy: IUser;
    nationality: KeyValue;
    status: number;
    fax: string;
    leadSource: KeyValue;
    preferredLanguage: KeyValue;
    suggestedBy: string;
    location: ILocation;
    notes: INote[];
    ownedProperties: IProperties[];
    labels: ILabel[];
    demands: IDemand[];

    tasks: IKanbanCardShort[];
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
