import { ICustomer } from "./customer";
import { IPropertyDetails, IPropertyDetailsPOST } from "./details";
import { IPropertyFeatures } from "./features";
import { IFileModel, IPropertyImage } from "./file";
import { ILabel } from "./label";
import { ILocation, ILocationPOST } from "./location";
import { INote } from "./note";
import { IUser } from "./user";

export interface IPropertyFilterResponse {
	id: number;
	code: string;
	category: string;
	state: string;
	area: number;
	plotArea: number;
	description: string;
	details: IPropertyDetailsPOST;
	price: number;
	parentCategory: string;
	propertyImage: IPropertyImage;
	images: string[]; // urls only
	location: ILocationPOST;
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
	heatingType?: string;
	frameType?: string;
	furnished?: string;
	managerId?: number;

	cities: string[];
	states: string[];
	categories: string[];
	parentCategories: string[];
	labels: number[];
	points: [number, number][];
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
	floorToAreaRatio?: number;
	coverageFactor?: number;
	facadeLength?: number;
	inclination: string;
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

export interface IPropertiesPostRequest {
	id?: number;
	code: string;
	title: string;
	managerId?: number;
	ownerId?: number;
	state: string;
	parentCategory: string;
	category: string;
	area?: number;
	plotArea?: number;
	price?: number;
	averageUtils?: number;
	rented: boolean;
	currentRentPrice?: number;
	estimatedRentPrice?: number;
	rentalStart: string;
	rentalEnd: string;
	availableAfter: string;
	keyCode: string;
	auction: boolean;
	debatablePrice: boolean;
	buildable: boolean;
	video: string;
	description: string;
	suitableFor: IPropertySuitableFor;
	heatingAndEnergy: IPropertyHeatingAndEnergy;
	distances: IPropertyDistancesPOST;
	areas: IPropertyAreasPOST;
	construction: IPropertyConstructionPOST;
	technicalFeatures: IPropertyTechnicalFeaturesPOST;
	details: IPropertyDetailsPOST;
	location: ILocationPOST;
	features: IPropertyFeatures;
	labelIDs: number[];
}

export interface IProperties {
	id: number;
	code: string;
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
	documents: IFileModel[];
	blueprints: IFileModel[];
	labels: ILabel[];
}
