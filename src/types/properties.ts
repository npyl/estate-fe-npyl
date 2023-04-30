import { IPropertyDetails } from "./propertyDetails";
import { IPropertyFeatures } from "./features";
import { ILocation } from "./location";
import { IUser } from "./user";
import { ICustomer } from "./customer";
import { INote } from "./note";
import { IFileModel } from "./fileModel";

export interface IProperties {
  id: number;
  code: number;
  state: string;
  parentCategory: string;
  category: string;
  price: number;
  totalArea: number;
  availableAfter: string;
  keyId: string;
  description: string;
  manager: IUser;
  owner: ICustomer;
  location: ILocation;
  propertyDetail: IPropertyDetails;
  features: IPropertyFeatures;
  notes: INote[];
  propertyImage: string;
  images: IFileModel[];
  documents: IFileModel[];
  blueprints: IFileModel[];
}
