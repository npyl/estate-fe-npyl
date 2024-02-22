import { KeyValue } from "./KeyValue";
import { ICustomer } from "./customer";
import { DescriptionEntry, DescriptionEntryPOST } from "./description";
import { IPropertyDetails, IPropertyDetailsPOST } from "./details";
import { IPropertyFeatures } from "./features";
import { IPropertyBlueprint, IPropertyDocument, IPropertyImage } from "./file";
import IGoogleEarth from "./googleEarth";
import { ILabel } from "./label";
import { Listings } from "./listings";
import { ILocation, ILocationPOST } from "./location";
import { INote } from "./note";
import { IUser } from "./user";

export interface IPropertyResultResponse {
    id: number;
    code: string;
    keyCode: string;
    category: KeyValue;
    state: KeyValue;
    area: number;
    plotArea: number;
    description: string;
    details: IPropertyDetails;
    price: number;
    parentCategory: KeyValue;
    propertyImage: string; // url only
    images: string[]; // urls only
    labels: ILabel[];
    location: ILocationPOST;
    // lat: number;
    // lng: number;
    createdAt: string;
    updatedAt: string;
}

export interface IPropertyFilter {
    filterName?: string;
    code?: string;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    minFloor?: string;
    maxFloor?: string;
    minConstructionYear?: number;
    maxConstructionYear?: number;
    managerId?: number;

    // multiple
    cities: string[];
    states: string[];
    categories: string[];
    parentCategories: string[];
    labels: number[];
    points: [number, number][];
    heatingType: string[];
    frameType: string[];
    furnished: string[];
}

export interface IPropertySuitableFor {
    student: boolean;
    cottage: boolean;
    touristRental: boolean;
    investment: boolean;
    doctorsOffice: boolean;
    professionalUse: boolean;
    renovation: boolean;
    agriculturalUse: boolean;
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

export interface IPropertyAreasPOST {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
    fifth?: number;
    plot?: number;
    covered?: number;
    basement?: number;
    attic?: number;
    garden?: number;
    balconies?: number;
    storeroom?: number;
    groundFloor?: number;
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

export interface IPropertyConstructionPOST {
    yearOfConstruction?: number;
    underConstruction: boolean;
    newlyBuilt: boolean;
    incomplete: boolean;
    totalFloorNumber?: number;
    internalStairs: boolean;
    neoclassical: boolean;
    yearOfRenovation?: number;
    renovated: boolean;
    elevator: boolean;
    needsRenovation: boolean;
    preserved: boolean;
    poolSize?: number;
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
    elevator: boolean;
    needsRenovation: boolean;
    preserved: boolean;
    poolSize: number;
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

export interface IPropertyTechnicalFeaturesPOST {
    entrances?: number;
    displayWindowsLength?: number;
    floorToAreaRatio?: number;
    coverageFactor?: number;
    facadeLength?: number;

    furnished?: string;
    frameType?: string;
    paneGlassType?: string;
    floorType?: string;
    inclination?: string;

    windowScreens: boolean;
    fireplace: boolean;
    bright: boolean;
    luxurious: boolean;
    electricCarChargingFacilities: boolean;
    reception: boolean;
    petsAllowed: boolean;
    safetyDoor: boolean;
    alarmSystem: boolean;
    painted: boolean;
    satelliteTV: boolean;
    wiring: boolean;
    loadingUnloadingElevator: boolean;
    falseCeiling: boolean;
    withEquipment: boolean;
    doubleFrontage: boolean;
    consideration: boolean;
}

export interface IPropertyTechnicalFeatures {
    entrances: number;
    displayWindowsLength: number;
    floorToAreaRatio: number;
    coverageFactor: number;
    facadeLength: number;

    safetyDoor: boolean;
    alarmSystem: boolean;
    painted: boolean;
    windowScreens: boolean;
    fireplace: boolean;
    bright: boolean;
    luxurious: boolean;
    electricCarChargingFacilities: boolean;
    reception: boolean;
    petsAllowed: boolean;
    satelliteTV: boolean;
    wiring: boolean;
    loadingUnloadingElevator: boolean;
    falseCeiling: boolean;
    withEquipment: boolean;
    doubleFrontage: boolean;
    consideration: boolean;

    furnished: KeyValue;
    frameType: KeyValue;
    paneGlassType: KeyValue;
    floorType: KeyValue;
    inclination: KeyValue;
}

export interface IPropertyHeatingAndEnergy {
    energyClass: KeyValue;
    heatingType: KeyValue;
    heatingSystem: KeyValue;
    electricityType: KeyValue;

    floorHeating: boolean;
    airConditioning: boolean;
    solarBoiler: boolean;
    offPeakElectricity: boolean;
}

export interface IPropertyHeatingAndEnergyPOST {
    energyClass?: string;
    heatingType?: string;
    heatingSystem?: string;
    electricityType?: string;

    floorHeating: boolean;
    airConditioning: boolean;
    solarBoiler: boolean;
    offPeakElectricity: boolean;
}

export interface IPropertyDistancesPOST {
    schools?: number;
    supermarket?: number;
    cafeRestaurant?: number;
    hospital?: number;
    airport?: number;
    sea?: number;
    publicTransport?: number;
    entertainment?: number;
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

export interface IPropertiesPOST {
    code: string;
    rentalStart: string;
    rentalEnd: string;
    availableAfter: string;
    keyCode: string;
    state?: string;
    parentCategory?: string;
    category?: string;
    video: string;
    descriptions: DescriptionEntryPOST[];

    managerId?: number;
    ownerId?: number;
    id?: number;
    area?: number;
    plotArea?: number;
    price?: number;
    averageUtils?: number;
    currentRentPrice?: number;
    estimatedRentPrice?: number;
    labelIDs: number[];

    rented: boolean;
    debatablePrice: boolean;
    buildable: boolean;
    auction: boolean;
    exclusive: boolean;

    suitableFor: IPropertySuitableFor;
    heatingAndEnergy: IPropertyHeatingAndEnergyPOST;
    distances: IPropertyDistancesPOST;
    areas: IPropertyAreasPOST;
    construction: IPropertyConstructionPOST;
    technicalFeatures: IPropertyTechnicalFeaturesPOST;
    details: IPropertyDetailsPOST;
    location: ILocationPOST;
    features: IPropertyFeatures;
}

export interface IProperties {
    code: string;
    rentalStart: string;
    rentalEnd: string;
    availableAfter: string;
    keyCode: string;
    video: string;
    descriptions: Record<string, DescriptionEntry>;

    createdAt: string;
    updatedAt: string;

    id: number;
    area: number;
    plotArea: number;
    price: number;
    averageUtils: number;
    currentRentPrice: number;
    estimatedRentPrice: number;

    rented: boolean;
    debatablePrice: boolean;
    buildable: boolean;
    auction: boolean;
    exclusive: boolean;

    state: KeyValue;
    parentCategory: KeyValue;
    category: KeyValue;

    manager: IUser;
    owner: ICustomer;
    propertyImage: IPropertyImage;
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
    images: IPropertyImage[];
    documents: IPropertyDocument[];
    blueprints: IPropertyBlueprint[];
    labels: ILabel[];

    listings: Listings;

    googleEarth: IGoogleEarth;
}

export type ParentCategory = "RESIDENTIAL" | "COMMERCIAL" | "LAND" | "OTHER";
