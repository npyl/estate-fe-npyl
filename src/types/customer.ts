import { ILocation } from "./location";
import { INote } from "./note";
import { IProperties } from "./properties";
import { IUser } from "./user";

export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;
    homePhone: string;
    managedBy: IUser;
    status: number;
    location: ILocation;
    notes: INote[];
    properties: IProperties[];
}