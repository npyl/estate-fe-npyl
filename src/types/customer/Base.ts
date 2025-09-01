import { KeyValue } from "@/types/KeyValue";
import { IDemand, IDemandPOST } from "@/types/demand";
import { Enum } from "@/types/enums";
import { ILabel } from "@/types/label";
import { ILocation, ILocationPOST } from "@/types/location";
import { INote } from "@/types/note";
import { IProperties } from "@/types/properties";
import { IUser } from "@/types/user";

interface IOwnedProperties {
    id: number;
    code: number;
}

interface ICustomerLocationPOST
    extends Omit<ILocationPOST, "locationDisplay"> {}

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

export type { FilterBase, RequestBase, ResponseBase, ResponseShortBase };
