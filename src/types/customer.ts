import { KeyValue } from "./KeyValue";
import { IDemand, IDemandPOST } from "./demand";
import { ILabel } from "./label";
import { ILocation, ILocationPOST } from "./location";
import { INote } from "./note";
import { IProperties } from "./properties";
import { IUser } from "./user";

interface ICustomerLocationPOST
    extends Omit<ILocationPOST, "locationDisplay"> {}

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
    managerId?: number; //id
}

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
    homePhone: string;
    managedBy: IUser;
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

    createdAt: string;
    updatedAt: string;
}

export interface ICustomerPOST {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
    homePhone: string;
    managedBy?: number;
    status: number;
    leaser: boolean;
    lessor: boolean;
    seller: boolean;
    buyer: boolean;
    fax: string;
    nationality?: string;
    idNumber: string;
    passportNumber: string;
    dateOfBirth: string;
    leadSource?: string;
    preferredLanguage?: string;
    suggestedBy: string;
    location: ICustomerLocationPOST;
    ownedProperties: IProperties[];
    labelIDs: number[];
    demands: IDemandPOST[];
}

export type { IDemand };
