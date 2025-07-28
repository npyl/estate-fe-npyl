import { KeyValue } from "./KeyValue";
import { IDemand, IDemandPOST } from "./demand";
import { Enum } from "./enums";
import { ILabel } from "./label";
import { ILocation, ILocationPOST } from "./location";
import { INote } from "./note";
import { IProperties } from "./properties";
import { IUser } from "./user";

// ----------------------------------------------------------------------

type WithB2B<T> = T & { b2b: boolean };

// ----------------------------------------------------------------------

interface B2BMemberReq {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    mobilePhone: string;
    homePhone: string;
    fax: string;

    nationality: string;
    preferredLanguage: string;

    suggestedBy: string;
}

interface B2BMember {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    mobilePhone: string;
    homePhone: string;
    fax: string;

    nationality: KeyValue;
    preferredLanguage: KeyValue;

    suggestedBy: string;
}

const B2BMember2Req = (m: B2BMember): B2BMemberReq => ({
    ...m,
    nationality: m.nationality.key,
    preferredLanguage: m.preferredLanguage.key,
});

interface IOwnedProperties {
    id: number;
    code: number;
}

// ----------------------------------------------------------------------

interface FilterBase {
    labels: number[]; // ids
    parentCategories: string[];
    categories: string[];
    status?: number;
    leaser?: boolean;
    lessor?: boolean;
    seller?: boolean;
    buyer?: boolean;
    minPrice?: number;
    maxPrice?: number;
    minCovered?: number;
    maxCovered?: number;
    managerId?: number;

    [key: string]: any;
}

interface ResponseShortBase {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    customerAvatar: string;
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

interface ResponseBase {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    customerAvatar: string;
    mobilePhone: string;
    homePhone: string;
    afm: string;
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
    enableEmails: boolean;

    createdAt: string;
    updatedAt: string;
}

interface RequestBase {
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
}

// ----------------------------------------------------------

interface ICustomerLocationPOST
    extends Omit<ILocationPOST, "locationDisplay"> {}

type ICustomerFilter = WithB2B<FilterBase>;

type ICustomer = WithB2B<ResponseBase> & { members: B2BMember[] };
type ICustomerResultResponse = WithB2B<ResponseShortBase>;
type ICustomerPOST = WithB2B<RequestBase> & { b2bMembers: B2BMemberReq[] };

interface ICustomerMini {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
}

interface ICustomerTabCounts {
    agreements: number;
    matchingProperties: number;
    ownedProperties: number;
    demands: number;
    tasks: number;
}

export type {
    ICustomer,
    ICustomerPOST,
    ICustomerResultResponse,
    ICustomerFilter,
    IDemand,
    ICustomerMini,
    ICustomerTabCounts,
    B2BMember,
    B2BMemberReq,
};

export { B2BMember2Req };
