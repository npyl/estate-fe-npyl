import { number } from "prop-types";
import { KeyValue } from "./KeyValue";
import { ICustomer } from "./customer";
import { IDemand, IDemandPOST } from "./demand";
import { ILabel } from "./label";
import { ILocation, ILocationPOST } from "./location";
import { INote } from "./note";
import { IProperties } from "./properties";
import { IUser } from "./user";

export interface ILog {
    user: IUser;
    action: KeyValue;
    resourceType: KeyValue;
    createdAt: number;

    propertyId: number;
    propertyCode: string;
    customerId: number;
    customer: string;
}

export interface ILogResultResponse {}

export interface ILogFilter {
    fromDate?: string;
    toDate?: string;
    user?: IUser[];
    actions?: KeyValue[];
    resources?: KeyValue[];
    propertiesIds?: number[];
    customersIds?: number[];
}
