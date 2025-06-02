import { KeyValue } from "./KeyValue";
import { IUserMini } from "./user";

type TLogAction =
    | "ADD"
    | "CREATE"
    | "DELETE"
    | "DOWNLOAD"
    | "EDIT"
    | "LOGIN"
    | "LOGOUT"
    | "RESTORE";

// TODO: what is this? Is it correct? Where should I use it?
type TLogResource = "ENGLISH" | "GREEK" | "SYSTEM";

interface ILog {
    action: KeyValue<TLogAction>;
    message: string;
    resourceType: KeyValue<TLogResource>;
    user: IUserMini;
    createdAt: string;

    agreementCode?: string;
    agreementId?: number;
    agreementTitle?: string;

    customer?: string;
    customerId?: number;

    propertyCode?: string;
    propertyId?: number;
}

interface ILogFilter {
    fromDate?: string;
    toDate?: string;
    users?: number[]; //id
    actions?: KeyValue[];
    resources?: KeyValue[];
    propertiesIds?: number[];
    customersIds?: number[];
}

interface ILogFilterPOST {
    fromDate?: string;
    toDate?: string;
    users?: number[]; //id
    actions?: string[];
    resources?: string[];
    propertiesIds?: number[];
    customersIds?: number[];

    search?: string;

    organizations: number[];
}

export type { TLogAction, ILog, ILogFilter, ILogFilterPOST };
