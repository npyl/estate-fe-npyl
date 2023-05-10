import { IPropertyDetails } from "./details";
import { ILocation } from "./location";
import { IUser } from "./user";
import { ICustomer } from "./customer";
import { INote } from "./note";
import { IPropertyFeatures } from "./features";
import { ILabel } from "./label";
import { IFileModel } from "./fileModel";

export interface IPropertyFilter {
  filterName: string | undefined;
  code: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minArea: number | undefined;
  maxArea: number | undefined;
  state: string | undefined;
  category: string | undefined;
  parentCategory: string | undefined;
  minBedrooms: number | undefined;
  maxBedrooms: number | undefined;
  minFloor: number | undefined;
  maxFloor: number | undefined;
  minConstructionYear: number | undefined;
  maxConstructionYear: number | undefined;
  heatingType: string | undefined;
  frameType: string | undefined;
  furnished: string | undefined;
  city: string | undefined;
  managerId: number | undefined;
}

export interface IPropertySuitableFor {
  student: boolean;
  cottage: boolean;
  touristRental: boolean;
  investment: boolean;
  doctorsOffice: boolean;
  professionalUse: boolean;
  renovation: boolean;
}

export interface IPropertyHeatingAndEnergy {
  energyClass: string;
  heatingType: string;
  heatingSystem: string;
  electricityType: string;
  floorHeating: boolean;
  airConditioning: boolean;
  solarBoiler: boolean;
  offPeakElectricity: boolean;
}

export interface IPropertyDistances {
  schools: number;
  supermarket: number;
  cafeRestaurant: number;
  hospital: number;
  airport: number;
  sea: number;
  publicTransport: number;
  entertainment: number;
}

export interface IPropertyAreas {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
  plot: number;
  covered: number;
  basement: number;
  attic: number;
  garden: number;
  balconies: number;
  storeroom: number;
  groundFloor: number;
}

export interface IPropertyConstruction {
  yearOfConstruction: number;
  underConstruction: boolean;
  newlyBuilt: boolean;
  incomplete: boolean;
  totalFloorNumber: number;
  internalStairs: boolean;
  neoclassical: boolean;
  yearOfRenovation: number;
  renovated: boolean;
  needsRenovation: boolean;
  preserved: boolean;
}

export interface IPropertyTechnicalFeatures {
  entrances: number;
  displayWindowsLength: number;
  safetyDoor: boolean;
  alarmSystem: boolean;
  painted: boolean;
  furnished: string;
  frameType: string;
  paneGlassType: string;
  windowScreens: boolean;
  fireplace: boolean;
  bright: boolean;
  luxurious: boolean;
  electricCarChargingFacilities: boolean;
  reception: boolean;
  petsAllowed: boolean;
  floorType: string;
  satelliteTV: boolean;
  wiring: boolean;
  loadingUnloadingElevator: boolean;
  falseCeiling: boolean;
  withEquipment: boolean;
  doubleFrontage: boolean;
  consideration: boolean;
  floorToAreaRatio: number;
  coverageFactor: number;
  facadeLength: number;
  inclination: string;
}

interface IPropertySuitableFor {
  student: boolean;
  cottage: boolean;
  tourist_rental: boolean;
  investment: boolean;
  doctorsOffice: boolean;
  professionalUse: boolean;
  renovation: boolean;
}

interface IPropertyHeatingAndEnergy {
  id: number;
  energyClass: string;
  heatingType: string;
  heatingSystem: string;
  electricityType: string;
  floorHeating: boolean;
  airConditioning: boolean;
  solarBoiler: boolean;
  offPeakElectricity: boolean;
}

export interface IPropertyDistances {
  schools: number;
  supermarket: number;
  cafeRestaurant: number;
  hospital: number;
  airport: number;
  sea: number;
  publicTransport: number;
  entertainment: number;
}

export interface IPropertyAreas {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
  plot: number;
  covered: number;
  basement: number;
  attic: number;
  garden: number;
  balconies: number;
  storeroom: number;
  groundFloor: number;
}

interface IPropertyConstruction {
  yearOfConstruction: number;
  underConstruction: boolean;
  newlyBuilt: boolean;
  incomplete: boolean;
  totalFloorNumber: number;
  internalStairs: boolean;
  neoclassical: boolean;
  yearOfRenovation: number;
  renovated: boolean;
  needsRenovation: boolean;
  preserved: boolean;
}

interface IPropertyTechnicalFeatures {
  id: number;
  entrances: number;
  displayWindowsLength: number;
  safetyDoor: boolean;
  alarmSystem: boolean;
  painted: boolean;
  furnished: string;
  frameType: string;
  paneGlassType: string;
  windowScreens: boolean;
  fireplace: boolean;
  bright: boolean;
  luxurious: boolean;
  electricCarChargingFacilities: boolean;
  reception: boolean;
  petsAllowed: boolean;
  floorType: string;
  satelliteTV: boolean;
  wiring: boolean;
  loadingUnloadingElevator: boolean;
  falseCeiling: boolean;
  withEquipment: boolean;
  doubleFrontage: boolean;
  consideration: boolean;
  floorToAreaRatio: number;
  coverageFactor: number;
  facadeLength: number;
  inclination: string;
}

interface IPropertySuitableFor {
  student: boolean;
  cottage: boolean;
  tourist_rental: boolean;
  investment: boolean;
  doctorsOffice: boolean;
  professionalUse: boolean;
  renovation: boolean;
}

interface IPropertyHeatingAndEnergy {
  id: number;
  energyClass: string;
  heatingType: string;
  heatingSystem: string;
  electricityType: string;
  floorHeating: boolean;
  airConditioning: boolean;
  solarBoiler: boolean;
  offPeakElectricity: boolean;
}

export interface IPropertyDistances {
  schools: number;
  supermarket: number;
  cafeRestaurant: number;
  hospital: number;
  airport: number;
  sea: number;
  publicTransport: number;
  entertainment: number;
}

export interface IPropertyAreas {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
  plot: number;
  covered: number;
  basement: number;
  attic: number;
  garden: number;
  balconies: number;
  storeroom: number;
  groundFloor: number;
}

interface IPropertyConstruction {
  yearOfConstruction: number;
  underConstruction: boolean;
  newlyBuilt: boolean;
  incomplete: boolean;
  totalFloorNumber: number;
  internalStairs: boolean;
  neoclassical: boolean;
  yearOfRenovation: number;
  renovated: boolean;
  needsRenovation: boolean;
  preserved: boolean;
}

interface IPropertyTechnicalFeatures {
  id: number;
  entrances: number;
  displayWindowsLength: number;
  safetyDoor: boolean;
  alarmSystem: boolean;
  painted: boolean;
  furnished: string;
  frameType: string;
  paneGlassType: string;
  windowScreens: boolean;
  fireplace: boolean;
  bright: boolean;
  luxurious: boolean;
  electricCarChargingFacilities: boolean;
  reception: boolean;
  petsAllowed: boolean;
  floorType: string;
  satelliteTV: boolean;
  wiring: boolean;
  loadingUnloadingElevator: boolean;
  falseCeiling: boolean;
  withEquipment: boolean;
  doubleFrontage: boolean;
  consideration: boolean;
  floorToAreaRatio: number;
  coverageFactor: number;
  facadeLength: number;
  inclination: string;
}

export interface IProperties {
  id: number;
  code: number;
  title: string;
  manager: IUser;
  owner: ICustomer;
  state: string;
  parentCategory: string;
  category: string;
  area: number;
  plotArea: number;
  price: number;
  averageUtils: number;
  rented: boolean;
  currentRentPrice: number;
  estimatedRentPrice: number;
  rentalStart: string;
  rentalEnd: string;
  availableAfter: string;
  keyCode: string;
  auction: boolean;
  debatablePrice: boolean;
  buildable: boolean;
  video: string;
  description: string;
  propertyImage: string;
  suitableFor: IPropertySuitableFor;
  heatingAndEnergy: IPropertyHeatingAndEnergy;
  distances: IPropertyDistances;
  areas: IPropertyAreas;
  construction: IPropertyConstruction;
  technicalFeatures: IPropertyTechnicalFeatures;
  details: IPropertyDetails;
  location: ILocation;
  features: IPropertyFeatures;
  notes: INote[];
  images: IFileModel[];
  documents: IFileModel[];
  blueprints: IFileModel[];
  labels: ILabel[];
}
