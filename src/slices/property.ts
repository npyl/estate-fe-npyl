import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { ILocation } from "src/types/location";
import { IPropertyDetails } from "src/types/propertyDetails";
import { IPropertyFeatures } from "src/types/features";

interface IPropertiesPostRequest {
  code: number;
  managerId: number;
  ownerId: number;
  state: string;
  category: string;
  price: number;
  totalArea: number;
  availableAfter: string;
  keyId: string;
  description: string;
  location: ILocation;
  propertyDetail: IPropertyDetails;
  features: IPropertyFeatures;
  propertyImage: string;
  parentCategory: string;
}

type propertyState = IPropertiesPostRequest;

const initialState: propertyState = {
  code: 104,
  state: "Sale",
  category: "Villa",
  price: 20000,
  totalArea: 155,
  availableAfter: "2023-04-23T18:25:43.511Z",
  keyId: "10",
  managerId: 1,
  ownerId: 1,
  description: "Apartment A",
  location: {
    street: "skataStreet",
    number: 203,
    complex: "skataComplex",
    zipCode: 27134,
    city: "Patra",
    region: "Center",
    country: "Greece",
  },
  features: {
    elevator: false,
    modernDesign: false,
    fireplace: false,
    office: false,
    internet: false,
    painted: false,
    entranceGate: false,
    thermalInsulation: false,
    seaView: false,
    guestroom: false,
    satelliteTV: false,
    quietArea: false,
    bright: false,
    soundInsulation: false,
    has24HoursSecurity: false,
    alarmSystem: false,
    attic: false,
    bar: false,
    barbeque: false,
    cctv: false,
    ceramicTiles: false,
    combinedKitchenAndDiningArea: false,
    fireDetector: false,
    homeCinema: false,
    jacuzzi: false,
    nearBusRoute: false,
    panoramicView: false,
    playRoom: false,
    smartHome: false,
    walkableDistanceToBeach: false,
    doubleGlazing: false,
    // solarBoiler: false
  },
  propertyDetail: {
    floor: 1,
    layers: 2,
    bedrooms: 4,
    kitchens: 1,
    bathrooms: 3,
    storerooms: 0,
    livingRooms: 2,
    numOfWC: 2,
    floorType: "Mosaic",
    frameType: "Wooden",
    energyClass: "B+",
    furnished: "Partial",
    parkings: [
      {
        parkingType: "Garage",
        spots: 1,
      },
    ],
    balconies: [
      {
        side: "Front",
        area: 19,
      },
    ],
    constructionYear: 1961,
    renovationYear: 2020,
    avgUtils: 33,
    heating: {
      heatingType: "Central",
      heatingSystem: "Oil",
      floorHeating: true,
      airConditioning: false,
    },
    distance: {
      toPublicTransport: 150,
      toSea: 300,
    },
    areas: {
      plot: 1,
      covered: 1,
      basement: 1,
      attic: 1,
      garden: 1,
      balconies: 1,
    },
    orientation: "East",
    view: "Forest",
    accessibility: "Sidewalk",
    zoneType: "Rural",
    propertyArea: 153,
    electricityType: "Unknown",
  },
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
    setPrice(state: propertyState, action): void {
      state.price = action.payload;
    },
    setArea(state: propertyState, action): void {
      state.totalArea = action.payload;
    },
    setKeyId(state: propertyState, action): void {
      state.keyId = action.payload;
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
      state.propertyDetail.furnished = action.payload;
    },
    setOrientation(state: propertyState, action): void {
      state.propertyDetail.orientation = action.payload;
    },
    setFloorType(state: propertyState, action): void {
      state.propertyDetail.floorType = action.payload;
    },
    setViewType(state: propertyState, action): void {
      state.propertyDetail.view = action.payload;
    },
    setFrameType(state: propertyState, action): void {
      state.propertyDetail.frameType = action.payload;
    },
    setAccessibility(state: propertyState, action): void {
      state.propertyDetail.accessibility = action.payload;
    },
    setEnergyClass(state: propertyState, action): void {
      state.propertyDetail.energyClass = action.payload;
    },
    setZoneType(state: propertyState, action): void {
      state.propertyDetail.zoneType = action.payload;
    },
    setElectricityType(state: propertyState, action): void {
      state.propertyDetail.electricityType = action.payload;
    },
    setFloors(state: propertyState, action): void {
      state.propertyDetail.floor = action.payload;
    },
    setKitchens(state: propertyState, action): void {
      state.propertyDetail.kitchens = action.payload;
    },
    setLayers(state: propertyState, action): void {
      state.propertyDetail.layers = action.payload;
    },
    setBathrooms(state: propertyState, action): void {
      state.propertyDetail.bathrooms = action.payload;
    },
    setNumOfWC(state: propertyState, action): void {
      state.propertyDetail.numOfWC = action.payload;
    },
    setLivingRooms(state: propertyState, action): void {
      state.propertyDetail.livingRooms = action.payload;
    },
    setBedrooms(state: propertyState, action): void {
      state.propertyDetail.bedrooms = action.payload;
    },
    setStorerooms(state: propertyState, action): void {
      state.propertyDetail.storerooms = action.payload;
    },
    setAvgUtils(state: propertyState, action): void {
      state.propertyDetail.avgUtils = action.payload;
    },

    setCovered(state: propertyState, action): void {
      state.propertyDetail.areas.covered = action.payload;
    },
    // setArea,
    setPlot(state: propertyState, action): void {
      state.propertyDetail.areas.plot = action.payload;
    },
    setBasement(state: propertyState, action): void {
      state.propertyDetail.areas.basement = action.payload;
    },
    setAttic(state: propertyState, action): void {
      state.propertyDetail.areas.attic = action.payload;
    },
    setGarden(state: propertyState, action): void {
      state.propertyDetail.areas.garden = action.payload;
    },
    setStoreRooms(state: propertyState, action): void {
      state.propertyDetail.storerooms = action.payload;
    },

    setHeatingType(state: propertyState, action): void {
      state.propertyDetail.heating.heatingType = action.payload;
    },
    setHeatingSystem(state: propertyState, action): void {
      state.propertyDetail.heating.heatingSystem = action.payload;
    },
    setFloorHeating(state: propertyState, action): void {
      state.propertyDetail.heating.floorHeating = action.payload;
    },
    setAirConditioning(state: propertyState, action): void {
      state.propertyDetail.heating.airConditioning = action.payload;
    },

    // TODO:
    setParkingType(state: propertyState, action): void {},
    setSpots(state: propertyState, action): void {},
    setBalconySide(state: propertyState, action): void {},
    setBalconies(state: propertyState, action): void {},
    // END TODO

    setToPublicTransport(state: propertyState, action): void {
      state.propertyDetail.distance.toPublicTransport = action.payload;
    },
    setToSea(state: propertyState, action): void {
      state.propertyDetail.distance.toSea = action.payload;
    },
    setFireplace(state: propertyState, action): void {
      state.features.fireplace = action.payload;
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
      state.features.modernDesign = action.payload;
    },

    setOffice(state: propertyState, action): void {
      state.features.office = action.payload;
    },

    setInternet(state: propertyState, action): void {
      state.features.internet = action.payload;
    },

    setPainted(state: propertyState, action): void {
      state.features.painted = action.payload;
    },

    setEntranceGate(state: propertyState, action): void {
      state.features.entranceGate = action.payload;
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
      state.features.satelliteTV = action.payload;
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
      state.features.attic = action.payload;
    },

    setBar(state: propertyState, action): void {
      state.features.bar = action.payload;
    },

    setBarbeque(state: propertyState, action): void {
      state.features.barbeque = action.payload;
    },

    setCctv(state: propertyState, action): void {
      state.features.cctv = action.payload;
    },

    setCeramicTiles(state: propertyState, action): void {
      state.features.ceramicTiles = action.payload;
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
      state.features.playRoom = action.payload;
    },

    setSmartHome(state: propertyState, action): void {
      state.features.smartHome = action.payload;
    },

    setWalkableDistanceToBeach(state: propertyState, action): void {
      state.features.walkableDistanceToBeach = action.payload;
    },

    setDoubleGlazing(state: propertyState, action): void {
      state.features.doubleGlazing = action.payload;
    },

    setElevator(state: propertyState, action): void {
      state.features.elevator = action.payload;
    },

    resetState: () => {
      return initialState;
    },
  },
});

export const {
  setCode,
  setParentCategory,
  setOwner,
  setManager,
  setCategory,
  setState,
  setPrice,
  setArea,
  setKeyId,
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
  // setArea,
  setPlot,
  setBasement,
  setAttic,
  setGarden,
  setBalconies,
  setStoreRoom,
  setToPublicTransport,
  setToSea,
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
export const selectOwner = ({ property }: RootState) => property.ownerId;
export const selectManager = ({ property }: RootState) => property.managerId;
export const selectCategory = ({ property }: RootState) => property.category;
export const selectState = ({ property }: RootState) => property.state;
export const selectPrice = ({ property }: RootState) => property.price;
export const selectArea = ({ property }: RootState) => property.totalArea;
export const selectParentCategory = ({ property }: RootState) =>
  property.parentCategory;

export const selectKeyId = ({ property }: RootState) => property.keyId;
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

export const selectFurnished = ({ property }: RootState) =>
  property.propertyDetail.furnished;
export const selectOrientation = ({ property }: RootState) =>
  property.propertyDetail.orientation;
export const selectFloorType = ({ property }: RootState) =>
  property.propertyDetail.floorType;
export const selectViewType = ({ property }: RootState) =>
  property.propertyDetail.view; // TODO: is this correct? Why is it named view and not viewType?
export const selectFrameType = ({ property }: RootState) =>
  property.propertyDetail.frameType;
export const selectAccessibility = ({ property }: RootState) =>
  property.propertyDetail.accessibility;
export const selectEnergyClass = ({ property }: RootState) =>
  property.propertyDetail.energyClass;
export const selectZoneType = ({ property }: RootState) =>
  property.propertyDetail.zoneType;
export const selectElectricityType = ({ property }: RootState) =>
  property.propertyDetail.electricityType;
export const selectFloors = ({ property }: RootState) =>
  property.propertyDetail.floor;
export const selectKitchens = ({ property }: RootState) =>
  property.propertyDetail.kitchens;
export const selectLayers = ({ property }: RootState) =>
  property.propertyDetail.layers;
export const selectBathrooms = ({ property }: RootState) =>
  property.propertyDetail.bathrooms;
export const selectNumOfWC = ({ property }: RootState) =>
  property.propertyDetail.numOfWC;
export const selectLivingRooms = ({ property }: RootState) =>
  property.propertyDetail.livingRooms;
export const selectBedrooms = ({ property }: RootState) =>
  property.propertyDetail.bedrooms;
export const selectStorerooms = ({ property }: RootState) =>
  property.propertyDetail.storerooms;
export const selectAvgUtils = ({ property }: RootState) =>
  property.propertyDetail.avgUtils;

export const selectHeatingSystem = ({ property }: RootState) =>
  property.propertyDetail.heating.heatingSystem;
export const selectHeatingType = ({ property }: RootState) =>
  property.propertyDetail.heating.heatingType;
export const selectFloorHeating = ({ property }: RootState) =>
  property.propertyDetail.heating.floorHeating;
export const selectAirConditioning = ({ property }: RootState) =>
  property.propertyDetail.heating.airConditioning;

export const selectPlot = ({ property }: RootState) =>
  property.propertyDetail.areas.plot;
export const selectCovered = ({ property }: RootState) =>
  property.propertyDetail.areas.covered;
export const selectBasement = ({ property }: RootState) =>
  property.propertyDetail.areas.basement;
export const selectHasAttic = ({ property }: RootState) =>
  property.features.attic;
export const selectGarden = ({ property }: RootState) =>
  property.propertyDetail.areas.garden;
// TODO:
export const selectStoreRoom = ({ property }: RootState) => 666;

// TODO: these are needed foreach parking & each balcony; How should we do it?
export const selectParkingType = ({ property }: RootState) => "Garage";
export const selectSpots = ({ property }: RootState) => 0;
export const selectBalconySide = ({ property }: RootState) => "Front";
export const selectBalconies = ({ property }: RootState) => 0;
// END TODO

export const selectToPublicTransport = ({ property }: RootState) =>
  property.propertyDetail.distance.toPublicTransport;
export const selectToSea = ({ property }: RootState) =>
  property.propertyDetail.distance.toSea;

export const selectFireplace = ({ property }: RootState) =>
  property.features.fireplace;

export const selectElevator = ({ property }: RootState) =>
  property.features.elevator;

// TODO:
export const selectPool = ({ property }: RootState) =>
  property.features.playRoom;
// TODO:
export const selectWindowScreens = ({ property }: RootState) =>
  property.features.playRoom;

export const selectModernDesign = ({ property }: RootState) =>
  property.features.modernDesign;

export const selectOffice = ({ property }: RootState) =>
  property.features.office;

export const selectInternet = ({ property }: RootState) =>
  property.features.internet;

export const selectPainted = ({ property }: RootState) =>
  property.features.painted;

export const selectEntranceGate = ({ property }: RootState) =>
  property.features.entranceGate;

export const selectThermalInsulation = ({ property }: RootState) =>
  property.features.thermalInsulation;

export const selectSeaView = ({ property }: RootState) =>
  property.features.seaView;

export const selectGuestroom = ({ property }: RootState) =>
  property.features.guestroom;

export const selectSatelliteTV = ({ property }: RootState) =>
  property.features.satelliteTV;

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

export const selectAttic = ({ property }: RootState) => property.features.attic;

export const selectBar = ({ property }: RootState) => property.features.bar;

export const selectBarbeque = ({ property }: RootState) =>
  property.features.barbeque;

export const selectCctv = ({ property }: RootState) => property.features.cctv;

export const selectCeramicTiles = ({ property }: RootState) =>
  property.features.ceramicTiles;

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
  property.features.playRoom;

// TODO:
export const selectPetAllowed = ({ property }: RootState) => 0;
// TODO:
export const selectSolarBoiler = ({ property }: RootState) => 0;

// TODO:
export const selectAccessForDisable = ({ property }: RootState) =>
  property.features.playRoom;

export const selectSmartHome = ({ property }: RootState) =>
  property.features.smartHome;

export const selectWalkableDistanceToBeach = ({ property }: RootState) =>
  property.features.walkableDistanceToBeach;

export const selectDoubleGlazing = ({ property }: RootState) =>
  property.features.doubleGlazing;

export const { reducer } = slice;
