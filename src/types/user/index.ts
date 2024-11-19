import { KeyValue } from "../KeyValue";
import { PreferredLanguageType } from "../enums";
import { IProperties } from "../properties";

interface IUser {
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
    avatar: string;
    properties: IProperties[];
    isAdmin: boolean;
    isActive: boolean;
    joinedIn: string;
    registrationDate: string;

    preferredLanguage: KeyValue<PreferredLanguageType>;
    notificationsEnabled: boolean;
}

interface IUserMini {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
}

// INFO: google returns users with ids as string
type GUserMini = Omit<IUserMini, "id"> & { id: string };

interface IUserPOST {
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

export type { IUser, IUserMini, GUserMini, IUserPOST };
