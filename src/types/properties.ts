import { IPropertyDetails } from "./propertyDetails";
import { IPropertyFeatures } from "./features";
import { ILocation } from "./location";
import { IUser } from "./user";
import { ICustomer } from "./customer";
import { INote } from "./note";
import { IVideo } from "./video";
import { IFileModel } from "./fileModel";

export interface IPropertyFilter {
  code?: number | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  minArea?: number | undefined;
  maxArea?: number | undefined;
  state?: string | undefined;
  category?: string | undefined;
  minBedrooms?: number | undefined;
  maxBedrooms?: number | undefined;
  minFloor?: number | undefined;
  maxFloor?: number | undefined;
  minConstructionYear?: number | undefined;
  maxConstructionYear?: number | undefined;
  heatingType?: string | undefined;
  frameType?: string | undefined;
  furnished?: string | undefined;
  city?: string | undefined;
  managerId?: number | undefined;
}

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
  video: IVideo;
  propertyImage: string;
  images: IFileModel[];
  documents: IFileModel[];
  blueprints: IFileModel[];
}
