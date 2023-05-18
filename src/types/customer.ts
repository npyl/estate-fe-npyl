import { ILocation } from "./location";
import { INote } from "./note";
import { ILabel } from "./label";
import { IProperties } from "./properties";
import { IUser } from "./user";
import { IPropertyFeatures } from "./features";

export interface IDemandFilters {
  minBedrooms: number;
  maxBedrooms: number;
  minBathrooms: number;
  maxBathrooms: number;
  furnished: string;
  maxCovered: number;
  minCovered: number;
  minPlot: number;
  maxPlot: number;
  minYearOfConstruction: number;
  maxYearOfConstruction: number;
  minFloor: string;
  maxFloor: string;
  parentCategory: string;
  category: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  labels: ILabel[];
}

export interface IDemand {
  filters: IDemandFilters;
  priorityFeatures: IPropertyFeatures;
  nonPriorityFeatures: IPropertyFeatures;
  timeframe: string;
}

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
}
