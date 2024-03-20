import { KeyValue } from "./KeyValue";
import { IUser } from "./user";

export interface ILog {
    user?: IUser;
    action?: KeyValue;
    resourceType?: KeyValue;
    createdAt: number;
    message?: string;
    propertyId?: number;
    propertyCode?: string;
    customerId?: number;
    customer?: string;
}

export interface ILogResultResponse {}

export interface ILogFilter {
    fromDate?: string;
    toDate?: string;
    users?: number[]; //id
    actions?: KeyValue[];
    resources?: KeyValue[];
    propertiesIds?: number[];
    customersIds?: number[];
}

export interface ILogFilterPOST {
    fromDate?: string;
    toDate?: string;
    users?: number[]; //id
    actions?: string[];
    resources?: string[];
    propertiesIds?: number[];
    customersIds?: number[];
}
