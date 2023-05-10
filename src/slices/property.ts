import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { IPropertyDetails } from "src/types/details";
import { IPropertyFeatures } from "src/types/features";
import { ILocation } from "src/types/location";
import {
  IPropertyAreas,
  IPropertyConstruction,
  IPropertyDistances,
  IPropertyHeatingAndEnergy,
  IPropertySuitableFor,
  IPropertyTechnicalFeatures,
} from "src/types/properties";

interface IPropertiesPostRequest {
  code: number;
  title: string;
  managerId: number;
  ownerId: number;
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

  // TODO:
  // notes: INote[];
  // images: IFileModel[];
  // documents: IFileModel[];
  // blueprints: IFileModel[];
  // labels: ILabel[];
}

type propertyState = IPropertiesPostRequest;

const initialState: propertyState = {
  code: 10,
  title: "Default Property",
  managerId: 1,
  ownerId: 1,
  state: "Rent",
  parentCategory: "Residential",
  category: "Apartment",
  area: 1000,
  plotArea: 2000,
  price: 1000,
  averageUtils: 10,
  rented: false,
  currentRentPrice: 1000,
  estimatedRentPrice: 1000,
  rentalStart: "2000-05-03",
  rentalEnd: "2000-05-03",
  availableAfter: "2000-05-03",
  keyCode: "100X01",
  auction: false,
  debatablePrice: false,
  buildable: false,
  video: "dummy-url",
  description: "my description",
  suitableFor: {
    student: true,
    cottage: true,
    touristRental: true,
    investment: false,
    doctorsOffice: false,
    professionalUse: true,
    renovation: true,
  },
  heatingAndEnergy: {
    id: 0,
    energyClass: "A+",
    heatingType: "Central",
    heatingSystem: "Oil",
    electricityType: "Single Phase",
    floorHeating: true,
    airConditioning: false,
    solarBoiler: false,
    offPeakElectricity: true,
  },
  distances: {
    schools: 1,
    supermarket: 1,
    cafeRestaurant: 1,
    hospital: 1,
    airport: 1,
    sea: 1,
    publicTransport: 1,
    entertainment: 1,
  },
  areas: {
    first: 1,
    second: 1,
    third: 1,
    fourth: 1,
    fifth: 1,
    plot: 1,
    covered: 1,
    basement: 1,
    attic: 1,
    garden: 1,
    balconies: 1,
    storeroom: 1,
    groundFloor: 1,
  },
  construction: {
    yearOfConstruction: 1,
    underConstruction: true,
    newlyBuilt: false,
    incomplete: true,
    totalFloorNumber: 1,
    internalStairs: true,
    neoclassical: false,
    yearOfRenovation: 1,
    renovated: true,
    needsRenovation: false,
    preserved: false,
  },
  technicalFeatures: {
    id: 0,
    entrances: 1,
    displayWindowsLength: 1,
    safetyDoor: true,
    alarmSystem: false,
    painted: true,
    furnished: "Partial",
    frameType: "Wooden",
    paneGlassType: "Single",
    windowScreens: true,
    fireplace: false,
    bright: false,
    luxurious: false,
    electricCarChargingFacilities: true,
    reception: true,
    petsAllowed: false,
    floorType: "Mosaic",
    satelliteTV: false,
    wiring: false,
    loadingUnloadingElevator: false,
    falseCeiling: true,
    withEquipment: true,
    doubleFrontage: false,
    consideration: false,
    floorToAreaRatio: 1,
    coverageFactor: 1,
    facadeLength: 1,
    inclination: "Inclined",
  },
  details: {
    id: 0,
    floor: "1",
    bedrooms: 1,
    kitchens: 1,
    wc: 1,
    layers: 1,
    livingrooms: 1,
    bathrooms: 1,
    rooms: 1,
    attic: true,
    storeroom: false,
    playroom: false,
    floorApartment: true,
    penthouse: true,
    orientation: "East",
    viewType: "Mountain",
    accessibility: "Road",
    landUse: "Residential",
    zoneType: "Within City Plan",
    balconies: [
      {
        side: "Front",
        area: 1,
      },
    ],
    parkings: [
      {
        parkingType: "Uncovered",
        spots: 1,
      },
    ],
  },
  location: {
    street: "Street 1",
    number: 10,
    complex: "complex1",
    zipCode: 26441,
    city: "Patras",
    region: "Achaia",
    country: "Greece",
    lat: 38.24741203168578,
    lng: 21.735938799204945,
  },
  features: {
    id: 0,
    panoramicView: true,
    seaView: true,
    mountainView: true,
    facade_sea: true,
    walkableDistanceToBeach: true,
    quietArea: true,
    bright: true,
    nearBusRoute: true,
    smartHome: true,
    guestroom: true,
    office: true,
    homeCinema: true,
    combinedKitchenAndDiningArea: true,
    soundInsulation: true,
    thermalInsulation: true,
    heatedPool: true,
    indoorPool: true,
    organizedGarden: true,
    jacuzzi: true,
    well: true,
    drilling: true,
    masonryFence: true,
    accessForDisabled: true,
    alarmSystem: true,
    has24HoursSecurity: true,
    cctv: true,
    internet: true,
    fireDetector: true,
    independentHeatingPerRoom: true,
    adaptingToTheGround: true,
    barbeque: true,
    pool: true,
    view: true,
    facade: true,
    corner: true,
    veranda: true,
    tents: true,
    withinResidentialZone: true,
    withinCityPlan: true,
    loadingDock: true,
  },
  propertyImage: "",
};

const slice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setCode(state: propertyState, action): void {
      state.code = action.payload;
    },
    setOwner(state: propertyState, action): void {
      state.ownerId = action.payload;
    },
    setRentalPeriodStart(state: propertyState, action): void {
      state.rentalStart = action.payload;
    },
    setAuction(state: propertyState, action): void {
      state.auction = action.payload;
    },
    setDebatablePrice(state: propertyState, action): void {
      state.debatablePrice = action.payload;
    },
    setRentalPeriodEnd(state: propertyState, action): void {
      state.rentalEnd = action.payload;
    },
    setParentCategory(state: propertyState, action): void {
      state.parentCategory = action.payload;
    },
    setManager(state: propertyState, action): void {
      state.managerId = action.payload;
    },
    setCategory(state: propertyState, action): void {
      state.category = action.payload;
    },
    setState(state: propertyState, action): void {
      state.state = action.payload;
    },
    setValueOfRenovation(state: propertyState, action): void {
      // TODO:
    },
    setPrice(state: propertyState, action): void {
      state.price = action.payload;
    },
    setRented(state: propertyState, action): void {
      state.rented = action.payload;
    },
    setCurrentRentPrice(state: propertyState, action): void {
      state.currentRentPrice = action.payload;
    },
    setEstimatedRentPrice(state: propertyState, action): void {
      state.estimatedRentPrice = action.payload;
    },

    setArea(state: propertyState, action): void {
      state.area = action.payload;
    },
    setPlotArea(state: propertyState, action): void {
      state.plotArea = action.payload;
    },
    setKeyCode(state: propertyState, action): void {
      state.keyCode = action.payload;
    },
    setDescription(state: propertyState, action): void {
      state.description = action.payload;
    },

    setStreet(state: propertyState, action): void {
      state.location.street = action.payload;
    },
    setNumber(state: propertyState, action): void {
      state.location.number = action.payload;
    },
    setCity(state: propertyState, action): void {
      state.location.city = action.payload;
    },
    setComplex(state: propertyState, action): void {
      state.location.complex = action.payload;
    },
    setZipCode(state: propertyState, action): void {
      state.location.zipCode = action.payload;
    },
    setRegion(state: propertyState, action): void {
      state.location.region = action.payload;
    },
    setCountry(state: propertyState, action): void {
      state.location.country = action.payload;
    },
    setFurnished(state: propertyState, action): void {
      // state.details.furnished = action.payload;
    },
    setOrientation(state: propertyState, action): void {
      state.details.orientation = action.payload;
    },
    setFloorType(state: propertyState, action): void {
      // state.details.floorType = action.payload;
    },
    setLandUse(state: propertyState, action): void {
      state.details.landUse = action.payload;
    },
    setViewType(state: propertyState, action): void {
      // state.details.view = action.payload;
    },
    setFrameType(state: propertyState, action): void {
      // state.details.frameType = action.payload;
    },
    setAccessibility(state: propertyState, action): void {
      state.details.accessibility = action.payload;
    },
    setRooms(state: propertyState, action): void {
      state.details.rooms = action.payload;
    },
    setEnergyClass(state: propertyState, action): void {
      state.heatingAndEnergy.energyClass = action.payload;
    },
    setOffPeakElectricity(state: propertyState, action): void {
      state.heatingAndEnergy.offPeakElectricity = action.payload;
    },
    setZoneType(state: propertyState, action): void {
      state.details.zoneType = action.payload;
    },
    setElectricityType(state: propertyState, action): void {
      state.heatingAndEnergy.electricityType = action.payload;
    },
    setFloors(state: propertyState, action): void {
      state.details.floor = action.payload;
    },
    setKitchens(state: propertyState, action): void {
      state.details.kitchens = action.payload;
    },
    setLayers(state: propertyState, action): void {
      state.details.layers = action.payload;
    },
    setBathrooms(state: propertyState, action): void {
      state.details.bathrooms = action.payload;
    },
    setNumOfWC(state: propertyState, action): void {
      state.details.wc = action.payload;
    },
    setLivingRooms(state: propertyState, action): void {
      state.details.livingrooms = action.payload;
    },
    setBedrooms(state: propertyState, action): void {
      state.details.bedrooms = action.payload;
    },
    setStorerooms(state: propertyState, action): void {
      // state.details.Storerooms = action.payload;
    },
    setAvgUtils(state: propertyState, action): void {
      state.averageUtils = action.payload;
    },

    setCovered(state: propertyState, action): void {
      state.areas.covered = action.payload;
    },
    // setArea,
    setPlot(state: propertyState, action): void {
      state.areas.plot = action.payload;
    },
    setBasement(state: propertyState, action): void {
      state.areas.basement = action.payload;
    },
    setAttic(state: propertyState, action): void {
      state.areas.attic = action.payload;
    },
    setGarden(state: propertyState, action): void {
      state.areas.garden = action.payload;
    },
    setStoreRooms(state: propertyState, action): void {
      // state.details.Storerooms = action.payload;
    },

    setHeatingType(state: propertyState, action): void {
      state.heatingAndEnergy.heatingType = action.payload;
    },
    setHeatingSystem(state: propertyState, action): void {
      state.heatingAndEnergy.heatingSystem = action.payload;
    },
    setFloorHeating(state: propertyState, action): void {
      state.heatingAndEnergy.floorHeating = action.payload;
    },
    setAirConditioning(state: propertyState, action): void {
      state.heatingAndEnergy.airConditioning = action.payload;
    },

    // TODO:
    setParkingType(state: propertyState, action): void {},
    setSpots(state: propertyState, action): void {},
    setBalconySide(state: propertyState, action): void {},
    setBalconies(state: propertyState, action): void {},
    // END TODO

    setPublicTransportation(state: propertyState, action): void {
      state.distances.publicTransport = action.payload;
    },
    setSea(state: propertyState, action): void {
      state.distances.sea = action.payload;
    },
    setSchools(state: propertyState, action): void {
      state.distances.schools = action.payload;
    },
    setSupermarket(state: propertyState, action): void {
      state.distances.supermarket = action.payload;
    },
    setCafeRestaurant(state: propertyState, action): void {
      state.distances.cafeRestaurant = action.payload;
    },
    setHospital(state: propertyState, action): void {
      state.distances.hospital = action.payload;
    },
    setAirport(state: propertyState, action): void {
      state.distances.airport = action.payload;
    },

    setFireplace(state: propertyState, action): void {
      // state.features.fireplace = action.payload;
    },

    setPool(state: propertyState, action): void {
      // TODO:
    },

    setAccessForDisable(state: propertyState, action): void {
      // TODO:
    },

    setPetAllowed(state: propertyState, action): void {
      // TODO:
    },

    setSolarBoiler(state: propertyState, action): void {
      // TODO:
    },

    setWindowScreens(state: propertyState, action): void {
      // TODO:
    },

    setModernDesign(state: propertyState, action): void {
      // state.d = action.payload;
    },

    setOffice(state: propertyState, action): void {
      state.features.office = action.payload;
    },

    setInternet(state: propertyState, action): void {
      state.features.internet = action.payload;
    },

    setPainted(state: propertyState, action): void {
      state.technicalFeatures.painted = action.payload;
    },

    setEntranceGate(state: propertyState, action): void {
      // state.entranceGate = action.payload;
    },

    setThermalInsulation(state: propertyState, action): void {
      state.features.thermalInsulation = action.payload;
    },

    setSeaView(state: propertyState, action): void {
      state.features.seaView = action.payload;
    },

    setGuestroom(state: propertyState, action): void {
      state.features.guestroom = action.payload;
    },

    setSatelliteTV(state: propertyState, action): void {
      state.technicalFeatures.satelliteTV = action.payload;
    },

    setQuietArea(state: propertyState, action): void {
      state.features.quietArea = action.payload;
    },

    setBright(state: propertyState, action): void {
      state.features.bright = action.payload;
    },

    setSoundInsulation(state: propertyState, action): void {
      state.features.soundInsulation = action.payload;
    },

    setHas24HoursSecurity(state: propertyState, action): void {
      state.features.has24HoursSecurity = action.payload;
    },

    setAlarmSystem(state: propertyState, action): void {
      state.features.alarmSystem = action.payload;
    },

    setHasAttic(state: propertyState, action): void {
      state.details.attic = action.payload;
    },

    setBar(state: propertyState, action): void {
      // state.details. = action.payload;
    },

    setBarbeque(state: propertyState, action): void {
      state.features.barbeque = action.payload;
    },

    setCctv(state: propertyState, action): void {
      state.features.cctv = action.payload;
    },

    setCeramicTiles(state: propertyState, action): void {
      // state.features.ceramicTiles = action.payload;
    },

    setCombinedKitchenAndDiningArea(state: propertyState, action): void {
      state.features.combinedKitchenAndDiningArea = action.payload;
    },

    setFireDetector(state: propertyState, action): void {
      state.features.fireDetector = action.payload;
    },

    setHomeCinema(state: propertyState, action): void {
      state.features.homeCinema = action.payload;
    },
    setJacuzzi(state: propertyState, action): void {
      state.features.jacuzzi = action.payload;
    },

    setNearBusRoute(state: propertyState, action): void {
      state.features.nearBusRoute = action.payload;
    },

    setPanoramicView(state: propertyState, action): void {
      state.features.panoramicView = action.payload;
    },

    setPlayRoom(state: propertyState, action): void {
      state.details.playroom = action.payload;
    },

    setSmartHome(state: propertyState, action): void {
      state.features.smartHome = action.payload;
    },

    setWalkableDistanceToBeach(state: propertyState, action): void {
      state.features.walkableDistanceToBeach = action.payload;
    },

    setDoubleGlazing(state: propertyState, action): void {
      // state.details.doubleGlazing = action.payload;
    },

    setElevator(state: propertyState, action): void {
      // state.features.elevator = action.payload;
    },
    setFloorApartment(state: propertyState, action): void {
      // state.features.floorApartment = action.payload;
    },
    setPenthouse(state: propertyState, action): void {
      // state.features.penthouse = action.payload;
    },

    resetState: () => {
      return initialState;
    },
  },
});

export const {
  setSea,
  setSchools,
  setSupermarket,
  setCafeRestaurant,
  setHospital,
  setAirport,
  setCode,
  setOffPeakElectricity,
  setAuction,
  setDebatablePrice,
  setFloorApartment,
  setPenthouse,
  setLandUse,
  setCurrentRentPrice,
  setEstimatedRentPrice,
  setValueOfRenovation,
  setParentCategory,
  setOwner,
  setRentalPeriodStart,
  setRentalPeriodEnd,
  setManager,
  setCategory,
  setState,
  setPrice,
  setRented,
  setArea,
  setPlotArea,
  setKeyCode,
  setStreet,
  setNumber,
  setCity,
  setComplex,
  setZipCode,
  setRegion,
  setCountry,
  setDescription,
  setFurnished,
  setOrientation,
  setFloorType,
  setViewType,
  setFrameType,
  setAccessibility,
  setEnergyClass,
  setZoneType,
  setElectricityType,
  setFloors,
  setKitchens,
  setLayers,
  setBathrooms,
  setNumOfWC,
  setLivingRooms,
  setBedrooms,
  setStorerooms,
  setCovered,
  setAvgUtils,
  setHeatingType,
  setHeatingSystem,
  setFloorHeating,
  setAirConditioning,
  setParkingType,
  setSpots,
  setBalconySide,
  setPlot,
  setBasement,
  setAttic,
  setGarden,
  setBalconies,
  setPublicTransportation,
  setRooms,
  setHasAttic,
  setFireplace,
  setPool,
  setAccessForDisable,
  setPetAllowed,
  setSolarBoiler,
  setWindowScreens,
  setModernDesign,
  setOffice,
  setInternet,
  setPainted,
  setEntranceGate,
  setThermalInsulation,
  setSeaView,
  setGuestroom,
  setSatelliteTV,
  setQuietArea,
  setBright,
  setSoundInsulation,
  setHas24HoursSecurity,
  setAlarmSystem,
  setBar,
  setBarbeque,
  setCctv,
  setCeramicTiles,
  setCombinedKitchenAndDiningArea,
  setFireDetector,
  setHomeCinema,
  setJacuzzi,
  setNearBusRoute,
  setPanoramicView,
  setPlayRoom,
  setSmartHome,
  setWalkableDistanceToBeach,
  setDoubleGlazing,
  setElevator,

  resetState,
} = slice.actions;

export const selectAll = ({ property }: RootState) => property;

export const selectCode = ({ property }: RootState) => property.code;
export const selectRentalPeriodStart = ({ property }: RootState) =>
  property.rentalStart;
export const selectRentalPeriodEnd = ({ property }: RootState) =>
  property.rentalEnd;

export const selectOwner = ({ property }: RootState) => property.ownerId;
export const selectManager = ({ property }: RootState) => property.managerId;
export const selectCategory = ({ property }: RootState) => property.category;
export const selectState = ({ property }: RootState) => property.state;
export const selectCurrentRentPrice = ({ property }: RootState) =>
  property.currentRentPrice;
export const selectEstimatedRentPrice = ({ property }: RootState) =>
  property.estimatedRentPrice;

export const selectValueOfRenovation = ({ property }: RootState) => "TODO: ...";

export const selectAuction = ({ property }: RootState) => property.auction;
export const selectDebatablePrice = ({ property }: RootState) =>
  property.debatablePrice;
export const selectPrice = ({ property }: RootState) => property.price;
export const selectArea = ({ property }: RootState) => property.area;
export const selectPlotArea = ({ property }: RootState) => property.plotArea;
export const selectParentCategory = ({ property }: RootState) =>
  property.parentCategory;

export const selectKeyCode = ({ property }: RootState) => property.keyCode;
export const selectDescription = ({ property }: RootState) =>
  property.description;

export const selectStreet = ({ property }: RootState) =>
  property.location.street;
export const selectNumber = ({ property }: RootState) =>
  property.location.number;
export const selectCity = ({ property }: RootState) => property.location.city;
export const selectComplex = ({ property }: RootState) =>
  property.location.complex;
export const selectZipCode = ({ property }: RootState) =>
  property.location.zipCode;
export const selectRegion = ({ property }: RootState) =>
  property.location.region;
export const selectCountry = ({ property }: RootState) =>
  property.location.country;
export const selectFurnished = ({ property }: RootState) => -1;
// property.details.furnished;
export const selectOrientation = ({ property }: RootState) =>
  property.details.orientation;
export const selectFloorType = ({ property }: RootState) => -1;
// property.details.floorType;
export const selectLandUse = ({ property }: RootState) =>
  property.details.landUse;
export const selectViewType = ({ property }: RootState) => -1;
// property.details.view; // TODO: is this correct? Why is it named view and not viewType?
export const selectFrameType = ({ property }: RootState) => -1;
// property.details.frameType;
export const selectAccessibility = ({ property }: RootState) =>
  property.details.accessibility;
export const selectEnergyClass = ({ property }: RootState) =>
  property.heatingAndEnergy.energyClass;
export const selectOffPeakElectricity = ({ property }: RootState) =>
  property.heatingAndEnergy.offPeakElectricity;
export const selectZoneType = ({ property }: RootState) =>
  property.details.zoneType;
export const selectElectricityType = ({ property }: RootState) =>
  property.heatingAndEnergy.electricityType;
export const selectFloors = ({ property }: RootState) => property.details.floor;
export const selectKitchens = ({ property }: RootState) =>
  property.details.kitchens;
export const selectLayers = ({ property }: RootState) =>
  property.details.layers;
export const selectBathrooms = ({ property }: RootState) =>
  property.details.bathrooms;
export const selectNumOfWC = ({ property }: RootState) => -1;
// property.;
export const selectLivingRooms = ({ property }: RootState) => -1;
// property.details.livingRooms;
export const selectBedrooms = ({ property }: RootState) =>
  property.details.bedrooms;
export const selectStorerooms = ({ property }: RootState) => -1;
// property.details.Storerooms;
export const selectAvgUtils = ({ property }: RootState) =>
  property.averageUtils;
export const selectRooms = ({ property }: RootState) => property.details.rooms;

export const selectRented = ({ property }: RootState) => property.rented;

export const selectHeatingSystem = ({ property }: RootState) =>
  property.heatingAndEnergy.heatingSystem;
export const selectHeatingType = ({ property }: RootState) =>
  property.heatingAndEnergy.heatingType;
export const selectFloorHeating = ({ property }: RootState) =>
  property.heatingAndEnergy.floorHeating;
export const selectAirConditioning = ({ property }: RootState) =>
  property.heatingAndEnergy.airConditioning;

export const selectPlot = ({ property }: RootState) => property.areas.plot;
export const selectCovered = ({ property }: RootState) =>
  property.areas.covered;
export const selectBasement = ({ property }: RootState) =>
  property.areas.basement;
export const selectHasAttic = ({ property }: RootState) =>
  property.details.attic;
export const selectGarden = ({ property }: RootState) => property.areas.garden;
export const selectStoreroom = ({ property }: RootState) =>
  property.details.storeroom;

// TODO: these are needed foreach parking & each balcony; How should we do it?
export const selectParkingType = ({ property }: RootState) => "Garage";
export const selectSpots = ({ property }: RootState) => 0;
export const selectBalconySide = ({ property }: RootState) => "Front";
export const selectBalconies = ({ property }: RootState) => 0;
// END TODO

export const selectPublicTransportation = ({ property }: RootState) =>
  property.distances.publicTransport;
export const selectSea = ({ property }: RootState) => property.distances.sea;
export const selectSchools = ({ property }: RootState) =>
  property.distances.schools;

export const selectSupermarket = ({ property }: RootState) =>
  property.distances.supermarket;

export const selectCafeRestaurant = ({ property }: RootState) =>
  property.distances.cafeRestaurant;

export const selectHospital = ({ property }: RootState) =>
  property.distances.hospital;

export const selectAirport = ({ property }: RootState) =>
  property.distances.airport;

export const selectFireplace = ({ property }: RootState) =>
  property.technicalFeatures.fireplace;

export const selectElevator = ({ property }: RootState) => -1;
// property.details.elevator;

export const selectPool = ({ property }: RootState) => property.features.pool;
export const selectWindowScreens = ({ property }: RootState) =>
  property.technicalFeatures.windowScreens;

export const selectModernDesign = ({ property }: RootState) => -1;
// property.features.modernDesign;

export const selectOffice = ({ property }: RootState) =>
  property.features.office;

export const selectInternet = ({ property }: RootState) =>
  property.features.internet;

export const selectPainted = ({ property }: RootState) =>
  property.technicalFeatures.painted;

export const selectEntranceGate = ({ property }: RootState) => -1;
// property.features.entranceGate;

export const selectThermalInsulation = ({ property }: RootState) =>
  property.features.thermalInsulation;

export const selectSeaView = ({ property }: RootState) =>
  property.features.seaView;

export const selectGuestroom = ({ property }: RootState) =>
  property.features.guestroom;

export const selectSatelliteTV = ({ property }: RootState) =>
  property.technicalFeatures.satelliteTV;

export const selectQuietArea = ({ property }: RootState) =>
  property.features.quietArea;

export const selectBright = ({ property }: RootState) =>
  property.features.bright;

export const selectSoundInsulation = ({ property }: RootState) =>
  property.features.soundInsulation;

export const selectHas24HoursSecurity = ({ property }: RootState) =>
  property.features.has24HoursSecurity;

export const selectAlarmSystem = ({ property }: RootState) =>
  property.features.alarmSystem;

export const selectAttic = ({ property }: RootState) => property.areas.attic;

export const selectBarbeque = ({ property }: RootState) =>
  property.features.barbeque;

export const selectCctv = ({ property }: RootState) => property.features.cctv;

export const selectCeramicTiles = ({ property }: RootState) => -1;
// property.features.ceramicTiles;

export const selectCombinedKitchenAndDiningArea = ({ property }: RootState) =>
  property.features.combinedKitchenAndDiningArea;

export const selectFireDetector = ({ property }: RootState) =>
  property.features.fireDetector;

export const selectHomeCinema = ({ property }: RootState) =>
  property.features.homeCinema;

export const selectJacuzzi = ({ property }: RootState) =>
  property.features.jacuzzi;

export const selectNearBusRoute = ({ property }: RootState) =>
  property.features.nearBusRoute;

export const selectPanoramicView = ({ property }: RootState) =>
  property.features.panoramicView;

export const selectPlayRoom = ({ property }: RootState) =>
  property.details.playroom;

//Property Description
export const selectFloorApartment = ({ property }: RootState) =>
  property.details.floorApartment;
export const selectPenthouse = ({ property }: RootState) =>
  property.details.penthouse;

// TODO:
export const selectPetAllowed = ({ property }: RootState) => false;
// TODO:
export const selectSolarBoiler = ({ property }: RootState) => false;

// TODO:
export const selectAccessForDisable = ({ property }: RootState) =>
  property.features.accessForDisabled;

export const selectSmartHome = ({ property }: RootState) =>
  property.features.smartHome;

export const selectWalkableDistanceToBeach = ({ property }: RootState) =>
  property.features.walkableDistanceToBeach;

export const selectDoubleGlazing = ({ property }: RootState) => -1;
// property.;

export const { reducer } = slice;
