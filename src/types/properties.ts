import { IPropertyDetails } from "./propertyDetails";
import { IPropertyFeatures } from "./features";
import { ILocation } from "./location";
import { IUser } from "./user";
import { ICustomer } from "./customer";

export interface IProperties {
  id: number;
  code: number;
  state: string;
  category: string;
  price: number;
  totalArea: number;
  availableAfter: string;
  keyId: string;
  manager: IUser;
  description: string;
  owner: ICustomer;
  location: ILocation;
  propertyDetail: IPropertyDetails;
  features: IPropertyFeatures;
  propertyImage: string;
}