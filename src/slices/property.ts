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
import { ILabel } from "src/types/label";

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
  bar: boolean;
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
  labelIDs: number[];
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
  parentCategory: "",
  category: "",
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
  description: "LEPA PSOLOUTIONS ON FIRE ",
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
    underConstruction: false,
    newlyBuilt: false,
    incomplete: true,
    totalFloorNumber: 1,
    internalStairs: true,
    neoclassical: false,
    yearOfRenovation: 2016,
    renovated: true,
    needsRenovation: false,
    preserved: false,
    elevator: true,
  },
  technicalFeatures: {
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
    floor: "1",
    bedrooms: 1,
    kitchens: 1,
    wc: 1,
    layers: 5,
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
    // lat: 38.24741203168578,
    // lng: 21.735938799204945,
  },
  features: {
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

    setCoverageFactor(state: propertyState, action): void {
      state.technicalFeatures.coverageFactor = action.payload;
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

    setBuildable(state: propertyState, action): void {
      state.buildable = action.payload;
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

    setOrientation(state: propertyState, action): void {
      state.details.orientation = action.payload;
    },
    setLandUse(state: propertyState, action): void {
      state.details.landUse = action.payload;
    },
    setViewType(state: propertyState, action): void {
      state.details.viewType = action.payload;
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
    setFloor(state: propertyState, action): void {
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
    setStoreroom(state: propertyState, action): void {
      state.areas.storeroom = action.payload;
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
    setStoreroomBool(state: propertyState, action): void {
      state.details.storeroom = action.payload;
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
    setBalconies(state: propertyState, action): void {
      state.areas.balconies;
    },
    // END TODO

    setYearOfConstruction(state: propertyState, action): void {
      state.construction.yearOfConstruction = action.payload;
    },
    setUnderConstruction(state: propertyState, action): void {
      state.construction.underConstruction = action.payload;
    },
    setNewlyBuilt(state: propertyState, action): void {
      state.construction.newlyBuilt = action.payload;
    },
    setIncomplete(state: propertyState, action): void {
      state.construction.incomplete = action.payload;
    },
    setTotalFloorNumber(state: propertyState, action): void {
      state.construction.totalFloorNumber = action.payload;
    },
    setElevator(state: propertyState, action): void {
      state.construction.elevator = action.payload;
    },
    setInternalStairs(state: propertyState, action): void {
      state.construction.internalStairs = action.payload;
    },
    setAvailableAfter(state: propertyState, action): void {
      state.availableAfter = action.payload;
    },

    setNeoclassical(state: propertyState, action): void {
      state.construction.neoclassical = action.payload;
    },
    setYearOfRenovation(state: propertyState, action): void {
      state.construction.yearOfRenovation = action.payload;
    },
    setRenovated(state: propertyState, action): void {
      state.construction.renovated = action.payload;
    },
    setNeedsRenovation(state: propertyState, action): void {
      state.construction.needsRenovation = action.payload;
    },
    setPreserved(state: propertyState, action): void {
      state.construction.preserved = action.payload;
    },
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
    setModernDesign(state: propertyState, action): void {
      // state.d = action.payload;
    },

    setOffice(state: propertyState, action): void {
      state.features.office = action.payload;
    },

    setInternet(state: propertyState, action): void {
      state.features.internet = action.payload;
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

    setQuietArea(state: propertyState, action): void {
      state.features.quietArea = action.payload;
    },

    setSoundInsulation(state: propertyState, action): void {
      state.features.soundInsulation = action.payload;
    },

    setHas24HoursSecurity(state: propertyState, action): void {
      state.features.has24HoursSecurity = action.payload;
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

    setMountainView(state: propertyState, action): void {
      state.features.mountainView = action.payload;
    },

    setSeaFront(state: propertyState, action): void {
      state.features.seaFront = action.payload;
    },

    setHeatedPool(state: propertyState, action): void {
      state.features.heatedPool = action.payload;
    },

    setIndoorPool(state: propertyState, action): void {
      state.features.indoorPool = action.payload;
    },

    setOrganizedGarden(state: propertyState, action): void {
      state.features.organizedGarden = action.payload;
    },

    setWell(state: propertyState, action): void {
      state.features.well = action.payload;
    },

    setDrilling(state: propertyState, action): void {
      state.features.drilling = action.payload;
    },

    setMasonryFence(state: propertyState, action): void {
      state.features.masonryFence = action.payload;
    },

    setAccessForDisabled(state: propertyState, action): void {
      state.features.accessForDisabled = action.payload;
    },

    setIndependentHeatingPerRoom(state: propertyState, action): void {
      state.features.independentHeatingPerRoom = action.payload;
    },

    setAdaptingToTheGround(state: propertyState, action): void {
      state.features.adaptingToTheGround = action.payload;
    },

    setView(state: propertyState, action): void {
      state.features.view = action.payload;
    },

    setFacade(state: propertyState, action): void {
      state.features.facade = action.payload;
    },
    setLoadingDock(state: propertyState, action): void {
      state.features.loadingDock = action.payload;
    },

    setCorner(state: propertyState, action): void {
      state.features.corner = action.payload;
    },

    setVeranda(state: propertyState, action): void {
      state.features.veranda = action.payload;
    },

    setTents(state: propertyState, action): void {
      state.features.tents = action.payload;
    },

    setWithinResidentialZone(state: propertyState, action): void {
      state.features.withinResidentialZone = action.payload;
    },

    setWithinCityPlan(state: propertyState, action): void {
      state.features.withinCityPlan = action.payload;
    },

    setWalkableDistanceToBeach(state: propertyState, action): void {
      state.features.walkableDistanceToBeach = action.payload;
    },

    setDoubleGlazing(state: propertyState, action): void {
      // state.details.doubleGlazing = action.payload;
    },

    setFloorApartment(state: propertyState, action): void {
      // state.features.floorApartment = action.payload;
    },
    setPenthouse(state: propertyState, action): void {
      // state.features.penthouse = action.payload;
    },
    setEntrances(state: propertyState, action): void {
      state.technicalFeatures.entrances = action.payload;
    },

    setDisplayWindowsLength(state: propertyState, action): void {
      state.technicalFeatures.displayWindowsLength = action.payload;
    },

    setSafetyDoor(state: propertyState, action): void {
      state.technicalFeatures.safetyDoor = action.payload;
    },

    setAlarmSystem(state: propertyState, action): void {
      state.technicalFeatures.alarmSystem = action.payload;
    },

    setPainted(state: propertyState, action): void {
      state.technicalFeatures.painted = action.payload;
    },

    setFurnished(state: propertyState, action): void {
      state.technicalFeatures.furnished = action.payload;
    },

    setFrameType(state: propertyState, action): void {
      state.technicalFeatures.frameType = action.payload;
    },

    setPaneGlassType(state: propertyState, action): void {
      state.technicalFeatures.paneGlassType = action.payload;
    },

    setWindowScreens(state: propertyState, action): void {
      state.technicalFeatures.windowScreens = action.payload;
    },

    setFireplace(state: propertyState, action): void {
      state.technicalFeatures.fireplace = action.payload;
    },

    setBright(state: propertyState, action): void {
      state.technicalFeatures.bright = action.payload;
    },

    setLuxurious(state: propertyState, action): void {
      state.technicalFeatures.luxurious = action.payload;
    },

    setElectricCarChargingFacilities(state: propertyState, action): void {
      state.technicalFeatures.electricCarChargingFacilities = action.payload;
    },

    setReception(state: propertyState, action): void {
      state.technicalFeatures.reception = action.payload;
    },

    setPetsAllowed(state: propertyState, action): void {
      state.technicalFeatures.petsAllowed = action.payload;
    },

    setFloorType(state: propertyState, action): void {
      state.technicalFeatures.floorType = action.payload;
    },

    setSatelliteTV(state: propertyState, action): void {
      state.technicalFeatures.satelliteTV = action.payload;
    },

    setWiring(state: propertyState, action): void {
      state.technicalFeatures.wiring = action.payload;
    },

    setLoadingUnloadingElevator(state: propertyState, action): void {
      state.technicalFeatures.loadingUnloadingElevator = action.payload;
    },

    setFalseCeiling(state: propertyState, action): void {
      state.technicalFeatures.falseCeiling = action.payload;
    },

    setWithEquipment(state: propertyState, action): void {
      state.technicalFeatures.withEquipment = action.payload;
    },

    setDoubleFrontage(state: propertyState, action): void {
      state.technicalFeatures.doubleFrontage = action.payload;
    },

    setConsideration(state: propertyState, action): void {
      state.technicalFeatures.consideration = action.payload;
    },

    setFloorToAreaRatio(state: propertyState, action): void {
      state.technicalFeatures.floorToAreaRatio = action.payload;
    },
    setFacadeLength(state: propertyState, action): void {
      state.technicalFeatures.facadeLength = action.payload;
    },

    setInclination(state: propertyState, action): void {
      state.technicalFeatures.inclination = action.payload;
    },
    setStudent(state: propertyState, action): void {
      state.suitableFor.student = action.payload;
    },
    setAgriculturalUse(state: propertyState, action): void {
      state.suitableFor.agriculturalUse = action.payload;
    },

    setCottage(state: propertyState, action): void {
      state.suitableFor.cottage = action.payload;
    },
    setTouristRental(state: propertyState, action): void {
      state.suitableFor.touristRental = action.payload;
    },
    setInvestment(state: propertyState, action): void {
      state.suitableFor.investment = action.payload;
    },
    setDoctorsOffice(state: propertyState, action): void {
      state.suitableFor.doctorsOffice = action.payload;
    },
    setProfessionalUse(state: propertyState, action): void {
      state.suitableFor.professionalUse = action.payload;
    },
    setRenovation(state: propertyState, action): void {
      state.suitableFor.renovation = action.payload;
    },
    setInitialState: (state: propertyState, action): void => {
      state.code = action.payload.code;
      state.title = action.payload.title;
      state.managerId = action.payload.managerId;
      state.ownerId = action.payload.ownerId;
      state.state = action.payload.state;
      state.parentCategory = action.payload.parentCategory;
      state.category = action.payload.category;
      state.area = action.payload.are;
      state.plotArea = action.payload.plotArea;
      state.price = action.payload.price;
      state.averageUtils = action.payload.averageUtils;
      state.rented = action.payload.rented;
      state.currentRentPrice = action.payload.currentRentPrice;
      state.estimatedRentPrice = action.payload.estimatedRentPrice;
      state.rentalStart = action.payload.rentalStart;
      state.rentalEnd = action.payload.rentalEnd;
      state.availableAfter = action.payload.availableAfter;
      state.keyCode = action.payload.keyCode;
      state.auction = action.payload.auction;
      state.debatablePrice = action.payload.debatablePrice;
      state.buildable = action.payload.buildable;
      state.video = action.payload.video;
      state.bar = action.payload.bar;
      state.description = action.payload.description;
      state.propertyImage = action.payload.propertyImage;
      state.suitableFor = action.payload.suitableFor;
      state.heatingAndEnergy = action.payload.heatingAndEnergy;
      state.distances = action.payload.distances;
      state.areas = action.payload.areas;
      state.construction = action.payload.construction;
      state.technicalFeatures = action.payload.technicalFeatures;
      state.details = action.payload.details;
      state.location = action.payload.location;
      state.features = action.payload.features;
      state.labelIDs = [
        ...action.payload.labels.map((label: ILabel) => label.id),
      ];
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  setCoverageFactor,
  setSeaFront,
  setAgriculturalUse,
  setHeatedPool,
  setIndoorPool,
  setOrganizedGarden,
  setWell,
  setDrilling,
  setMasonryFence,
  setAccessForDisabled,
  setIndependentHeatingPerRoom,
  setAdaptingToTheGround,
  setView,
  setFacade,
  setCorner,
  setVeranda,
  setTents,
  setWithinResidentialZone,
  setWithinCityPlan,
  setMountainView,
  setStudent,
  setCottage,
  setTouristRental,
  setInvestment,
  setDoctorsOffice,
  setProfessionalUse,
  setRenovation,
  setDisplayWindowsLength,
  setSafetyDoor,
  setAlarmSystem,
  setPainted,
  setFurnished,
  setFrameType,
  setPaneGlassType,
  setWindowScreens,
  setFireplace,
  setBright,
  setLuxurious,
  setElectricCarChargingFacilities,
  setReception,
  setPetsAllowed,
  setFloorType,
  setSatelliteTV,
  setWiring,
  setLoadingUnloadingElevator,
  setFalseCeiling,
  setWithEquipment,
  setDoubleFrontage,
  setConsideration,
  setFloorToAreaRatio,
  setFacadeLength,
  setInclination,
  setYearOfConstruction,
  setUnderConstruction,
  setNewlyBuilt,
  setIncomplete,
  setTotalFloorNumber,
  setAvailableAfter,
  setInternalStairs,
  setNeoclassical,
  setYearOfRenovation,
  setRenovated,
  setNeedsRenovation,
  setPreserved,
  setSea,
  setLoadingDock,

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

  setOrientation,
  setViewType,
  setAccessibility,
  setEnergyClass,
  setZoneType,
  setElectricityType,
  setFloor,
  setKitchens,
  setLayers,
  setBathrooms,
  setNumOfWC,
  setLivingRooms,
  setBedrooms,
  setStoreroom,
  setStoreroomBool,
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
  setPool,
  setAccessForDisable,
  setPetAllowed,
  setSolarBoiler,
  setModernDesign,
  setOffice,
  setInternet,
  setEntrances,
  setEntranceGate,
  setThermalInsulation,
  setSeaView,
  setGuestroom,
  setQuietArea,
  setSoundInsulation,
  setHas24HoursSecurity,
  setBuildable,
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
export const selectBuildable = ({ property }: RootState) => property.buildable;
export const selectDescription = ({ property }: RootState) =>
  property.description;
export const selectAvailableAfter = ({ property }: RootState) =>
  property.availableAfter;

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

// property.details.furnished;
export const selectOrientation = ({ property }: RootState) =>
  property.details.orientation;

// property.details.floorType;
export const selectLandUse = ({ property }: RootState) =>
  property.details.landUse;
export const selectViewType = ({ property }: RootState) =>
  property.details.viewType;

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
export const selectFloor = ({ property }: RootState) => property.details.floor;
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
export const selectStoreroomBool = ({ property }: RootState) =>
  property.details.storeroom;
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

export const selectEntrances = ({ property }: RootState) =>
  property.technicalFeatures.entrances;

export const selectStudent = ({ property }: RootState) =>
  property.suitableFor.student;

export const selectCottage = ({ property }: RootState) =>
  property.suitableFor.cottage;
export const selectTouristRental = ({ property }: RootState) =>
  property.suitableFor.touristRental;
export const selectInvestment = ({ property }: RootState) =>
  property.suitableFor.investment;
export const selectDoctorsOffice = ({ property }: RootState) =>
  property.suitableFor.doctorsOffice;
export const selectProfessionalUse = ({ property }: RootState) =>
  property.suitableFor.professionalUse;
export const selectRenovation = ({ property }: RootState) =>
  property.suitableFor.renovation;

export const selectAgriculturalUse = ({ property }: RootState) =>
  property.suitableFor.agriculturalUse;

export const selectDisplayWindowsLength = ({ property }: RootState) =>
  property.technicalFeatures.displayWindowsLength;

export const selectSafetyDoor = ({ property }: RootState) =>
  property.technicalFeatures.safetyDoor;

export const selectAlarmSystem = ({ property }: RootState) =>
  property.technicalFeatures.alarmSystem;

export const selectPainted = ({ property }: RootState) =>
  property.technicalFeatures.painted;

export const selectFurnished = ({ property }: RootState) =>
  property.technicalFeatures.furnished;

export const selectFrameType = ({ property }: RootState) =>
  property.technicalFeatures.frameType;

export const selectPaneGlassType = ({ property }: RootState) =>
  property.technicalFeatures.paneGlassType;

export const selectWindowScreens = ({ property }: RootState) =>
  property.technicalFeatures.windowScreens;

export const selectFireplace = ({ property }: RootState) =>
  property.technicalFeatures.fireplace;

export const selectBright = ({ property }: RootState) =>
  property.technicalFeatures.bright;

export const selectLuxurious = ({ property }: RootState) =>
  property.technicalFeatures.luxurious;

export const selectElectricCarChargingFacilities = ({ property }: RootState) =>
  property.technicalFeatures.electricCarChargingFacilities;

export const selectReception = ({ property }: RootState) =>
  property.technicalFeatures.reception;

export const selectPetsAllowed = ({ property }: RootState) =>
  property.technicalFeatures.petsAllowed;

export const selectFloorType = ({ property }: RootState) =>
  property.technicalFeatures.floorType;

export const selectSatelliteTV = ({ property }: RootState) =>
  property.technicalFeatures.satelliteTV;

export const selectWiring = ({ property }: RootState) =>
  property.technicalFeatures.wiring;

export const selectLoadingUnloadingElevator = ({ property }: RootState) =>
  property.technicalFeatures.loadingUnloadingElevator;

export const selectFalseCeiling = ({ property }: RootState) =>
  property.technicalFeatures.falseCeiling;

export const selectWithEquipment = ({ property }: RootState) =>
  property.technicalFeatures.withEquipment;

export const selectDoubleFrontage = ({ property }: RootState) =>
  property.technicalFeatures.doubleFrontage;

export const selectConsideration = ({ property }: RootState) =>
  property.technicalFeatures.consideration;

export const selectFloorToAreaRatio = ({ property }: RootState) =>
  property.technicalFeatures.floorToAreaRatio;

export const selectCoverageFactor = ({ property }: RootState) =>
  property.technicalFeatures.coverageFactor;

export const selectFacadeLength = ({ property }: RootState) =>
  property.technicalFeatures.facadeLength;

export const selectInclination = ({ property }: RootState) =>
  property.technicalFeatures.inclination;

export const selectPlot = ({ property }: RootState) => property.areas.plot;
export const selectCovered = ({ property }: RootState) =>
  property.areas.covered;
export const selectBasement = ({ property }: RootState) =>
  property.areas.basement;
export const selectHasAttic = ({ property }: RootState) =>
  property.details.attic;
export const selectGarden = ({ property }: RootState) => property.areas.garden;
export const selectStoreroom = ({ property }: RootState) =>
  property.areas.storeroom;

// TODO: these are needed foreach parking & each balcony; How should we do it?
export const selectParkingType = ({ property }: RootState) => "Garage";
export const selectSpots = ({ property }: RootState) => 0;
export const selectBalconySide = ({ property }: RootState) => "Front";
export const selectBalconies = ({ property }: RootState) =>
  property.areas.balconies;

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

export const selectYearOfConstruction = ({ property }: RootState) =>
  property.construction.yearOfConstruction;

export const selectNewlyBuilt = ({ property }: RootState) =>
  property.construction.newlyBuilt;

export const selectIncomplete = ({ property }: RootState) =>
  property.construction.incomplete;
export const selectUnderConstruction = ({ property }: RootState) =>
  property.construction.underConstruction;

export const selectTotalFloorNumber = ({ property }: RootState) =>
  property.construction.totalFloorNumber;

//TODO:
export const selectElevator = ({ property }: RootState) =>
  property.construction.elevator;

export const selectInternalStairs = ({ property }: RootState) =>
  property.construction.internalStairs;
export const selectNeoclassical = ({ property }: RootState) =>
  property.construction.neoclassical;
export const selectYearOfRenovation = ({ property }: RootState) =>
  property.construction.yearOfRenovation;
export const selectRenovated = ({ property }: RootState) =>
  property.construction.renovated;
export const selectNeedsRenovation = ({ property }: RootState) =>
  property.construction.needsRenovation;
export const selectPreserved = ({ property }: RootState) =>
  property.construction.preserved;

export const selectPool = ({ property }: RootState) => property.features.pool;

export const selectModernDesign = ({ property }: RootState) => -1;
// property.features.modernDesign;

export const selectOffice = ({ property }: RootState) =>
  property.features.office;

export const selectInternet = ({ property }: RootState) =>
  property.features.internet;

export const selectEntranceGate = ({ property }: RootState) => -1;
// property.features.entranceGate;

export const selectThermalInsulation = ({ property }: RootState) =>
  property.features.thermalInsulation;

export const selectSeaView = ({ property }: RootState) =>
  property.features.seaView;

export const selectGuestroom = ({ property }: RootState) =>
  property.features.guestroom;

export const selectQuietArea = ({ property }: RootState) =>
  property.features.quietArea;

export const selectSoundInsulation = ({ property }: RootState) =>
  property.features.soundInsulation;

export const selectHas24HoursSecurity = ({ property }: RootState) =>
  property.features.has24HoursSecurity;

export const selectAttic = ({ property }: RootState) => property.features.attic;

export const selectBar = ({ property }: RootState) => property.features.bar;

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
export const selectPetAllowed = ({ property }: RootState) =>
  property.features.petAllowed;
// TODO:
export const selectSolarBoiler = ({ property }: RootState) => false;

// TODO:
export const selectAccessForDisable = ({ property }: RootState) =>
  property.features.accessForDisabled;

export const selectSmartHome = ({ property }: RootState) =>
  property.features.smartHome;

export const selectMountainView = ({ property }: RootState) =>
  property.features.mountainView;

export const selectSeaFront = ({ property }: RootState) =>
  property.features.seaFront;

export const selectHeatedPool = ({ property }: RootState) =>
  property.features.heatedPool;

export const selectIndoorPool = ({ property }: RootState) =>
  property.features.indoorPool;

export const selectOrganizedGarden = ({ property }: RootState) =>
  property.features.organizedGarden;

export const selectWell = ({ property }: RootState) => property.features.well;

export const selectDrilling = ({ property }: RootState) =>
  property.features.drilling;

export const selectMasonryFence = ({ property }: RootState) =>
  property.features.masonryFence;

export const selectAccessForDisabled = ({ property }: RootState) =>
  property.features.accessForDisabled;

export const selectIndependentHeatingPerRoom = ({ property }: RootState) =>
  property.features.independentHeatingPerRoom;

export const selectAdaptingToTheGround = ({ property }: RootState) =>
  property.features.adaptingToTheGround;

export const selectView = ({ property }: RootState) => property.features.view;

export const selectFacade = ({ property }: RootState) =>
  property.features.facade;

export const selectCorner = ({ property }: RootState) =>
  property.features.corner;

export const selectVeranda = ({ property }: RootState) =>
  property.features.veranda;

export const selectTents = ({ property }: RootState) => property.features.tents;

export const selectWithinResidentialZone = ({ property }: RootState) =>
  property.features.withinResidentialZone;

export const selectWithinCityPlan = ({ property }: RootState) =>
  property.features.withinCityPlan;

export const selectWalkableDistanceToBeach = ({ property }: RootState) =>
  property.features.walkableDistanceToBeach;

export const selectDoubleGlazing = ({ property }: RootState) => -1;
// property.;
export const selectLoadingDock = ({ property }: RootState) =>
  property.features.loadingDock;

export const { reducer } = slice;
