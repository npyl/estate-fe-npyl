import { KeyValue } from "@/types/KeyValue";
import { PreferredLanguageType } from "@/types/enums";
import { TTaskVisibility } from "@/types/roles";

interface IUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    workspaceEmail: string;
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
    isAdmin: boolean;
    isActive: boolean;
    joinedIn: string;
    registrationDate: string;

    preferredLanguage: KeyValue<PreferredLanguageType>;

    notificationsEnabled: boolean;
    agreementsEnabled: boolean;
    messagingEnabled: boolean;
    tasksEnabled: TTaskVisibility;
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
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    workspaceEmail?: string; // INFO: Google Workspace email (for pairing a gw-user with a pp-user)
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

const isIUser = (u: any) => "preferredLanguage" in u;

export { isIUser };
export type { IUser, IUserMini, GUserMini, IUserPOST };

export * from "./mapper";
