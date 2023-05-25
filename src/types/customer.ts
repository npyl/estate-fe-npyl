import { IDemand, IDemandPOST } from "./demand";
import { ILabel } from "./label";
import { ILocation, ILocationPOST } from "./location";
import { INote, INotePOST } from "./note";
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
  fax: string;
  nationality: string;
  idNumber: string;
  passportNumber: string;
  dateOfBirth: string;
  leadSource: string;
  preferredLanguage: string;
  suggestedBy: string;
  location: ILocation;
  notes: INote[];
  ownedProperties: IProperties[];
  labels: ILabel[];
  demand: IDemand;
  demandPost: IDemandPOST[];
}

export interface ICustomerPOST {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  homePhone: string;
  managedBy: number;
  status: number;
  fax: string;
  nationality: string;
  idNumber: string;
  passportNumber: string;
  dateOfBirth: string;
  leadSource: string;
  preferredLanguage: string;
  suggestedBy: string;
  location: ILocationPOST;
  notes: INotePOST[];
  ownedProperties: IProperties[];
  labelIDs: number[];
  demand: IDemandPOST;
}

export type { IDemand };
