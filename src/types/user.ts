import { IProperties } from "./properties";

export interface IUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobilePhone: string;
    homePhone: string;
    businessPhone: string;
    officePhone: string;
    callCenterNumber: string;
    address: string;
    zipCode: string;
    city: string;
    region: string;
    afm: string;
    doy: string;
    gemh: string;
    profilePhoto: string;
    properties: IProperties[];
    // propertyFilters: IPropertyFilter[];
    isAdmin: boolean;
    joinedIn: string;
    registrationDate: string;
}

export interface IUserPOST {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobilePhone: string;
    homePhone?: string;
    businessPhone?: string;
    officePhone?: string;
    callCenterNumber?: string;
    address: string;
    zipCode: string;
    city: string;
    region: string;
    afm?: string;
    doy?: string;
    gemh?: string;
    status?: string;
}
