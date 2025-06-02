import { KeyValue } from "./KeyValue";
import { IDemand, IDemandPOST } from "./demand";
import { Enum } from "./enums";
import { ILabel } from "./label";
import { ILocation, ILocationPOST } from "./location";
import { INote } from "./note";
import { IOrganizationShortRes } from "./organization";
import { IProperties } from "./properties";
import { IUser } from "./user";

interface ICustomerLocationPOST
    extends Omit<ILocationPOST, "locationDisplay"> {}

interface IOwnedProperties {
    id: number;
    code: number;
}

export interface ICustomerResultResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
    city: string;
    leaser: boolean;
    lessor: boolean;
    seller: boolean;
    buyer: boolean;
    labels: ILabel[];
    ownedProperties: IOwnedProperties[];
    createdAt: string;
    budget: number;
    areas: {
        nameEN: string;
        nameGR: string;
    }[];
}

export interface ICustomerFilter {
    labels?: number[]; // ids
    status?: number;
    leaser?: boolean;
    lessor?: boolean;
    seller?: boolean;
    buyer?: boolean;
    parentCategories?: string[];
    categories?: string[];
    minPrice?: number;
    maxPrice?: number;
    minCovered?: number;
    maxCovered?: number;
    managerId?: number;
    organizationId?: number;
}

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
    homePhone: string;
    afm: string;
    managedBy: IUser;
    firm: number;
    status: number;
    leaser: boolean;
    lessor: boolean;
    seller: boolean;
    buyer: boolean;
    fax: string;
    nationality: KeyValue;
    idNumber: string;
    passportNumber: string;
    dateOfBirth: string;
    leadSource: KeyValue;
    preferredLanguage: KeyValue;
    suggestedBy: string;
    location: ILocation;
    notes: INote[];
    ownedProperties: IProperties[];
    labels: ILabel[];
    demands: IDemand[];
    enableEmails: boolean;
    organization: IOrganizationShortRes;

    createdAt: string;
    updatedAt: string;
}

interface ICustomerMini {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
}

export interface ICustomerPOST {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    afm: string;
    mobilePhone: string;
    homePhone: string;
    managedBy?: number;
    status: number;
    leaser: boolean;
    lessor: boolean;
    seller: boolean;
    buyer: boolean;
    fax: string;
    idNumber: string;
    passportNumber: string;
    dateOfBirth: string;
    suggestedBy: string;
    location: ICustomerLocationPOST;
    ownedProperties: IProperties[];
    labelIDs: number[];
    demands: IDemandPOST[];
    notes: string[];

    enableEmails: boolean;

    nationality: Enum<string>;
    leadSource: Enum<string>;
    preferredLanguage: Enum<string>;

    organization: number;
}

interface ICustomerTabCounts {
    agreements: number;
    matchingProperties: number;
    ownedProperties: number;
    demands: number;
    tasks: number;
}

export type { IDemand, ICustomerMini, ICustomerTabCounts };
