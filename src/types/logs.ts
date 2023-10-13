import { KeyValue } from "./KeyValue";
import { IDemand, IDemandPOST } from "./demand";
import { ILabel } from "./label";
import { ILocation, ILocationPOST } from "./location";
import { INote } from "./note";
import { IProperties } from "./properties";
import { IUser } from "./user";

export interface ILogs {
    propertyCode: string;
    customerFirstName: string;
    customerLastName: string;
    createdAt: string;
    user: IUser;
    action: string;
    affectedTable: string;
}
