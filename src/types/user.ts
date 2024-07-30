import { KeyValue } from "./KeyValue";
import { PreferredLanguageType } from "./enums";
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
    isActive: boolean;
    joinedIn: string;
    registrationDate: string;

    preferredLanguage: KeyValue<PreferredLanguageType>;
    notificationsEnabled: boolean;
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
    preferredLanguage?: string; // TODO: yup validator doesn't accept custom string type but should be PreferredLanguageType
}
