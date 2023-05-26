import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { IPropertyDetails } from "src/types/details";
import { IPropertyFeatures } from "src/types/features";
import { ILocation, ILocationPOST } from "src/types/location";
import {
  IProperties,
  IPropertyAreas,
  IPropertyConstruction,
  IPropertyDistances,
  IPropertyHeatingAndEnergy,
  IPropertySuitableFor,
  IPropertyTechnicalFeatures,
} from "src/types/properties";

interface IPropertiesPostRequest {
  id?: number;
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
  location: ILocationPOST;
  features: IPropertyFeatures;
  labelIDs: number[];
}

type propertyState = IPropertiesPostRequest;

const initialState: propertyState = {
  code: 0,
  title: "",
  managerId: 0,
  ownerId: 0,
  state: "",
  parentCategory: "",
  category: "",
  area: 0,
  plotArea: 0,
  price: 0,
  averageUtils: 0,
  rented: false,
  currentRentPrice: 0,
  estimatedRentPrice: 0,
  rentalStart: "",
  rentalEnd: "",
  availableAfter: "",
  keyCode: "",
  auction: false,
  debatablePrice: false,
  buildable: false,
  video: "",
  description: "",
  suitableFor: {
    student: false,
    cottage: false,
    touristRental: false,
    investment: false,
    doctorsOffice: false,
    professionalUse: false,
    renovation: false,
    agriculturalUse: false,
  },
  heatingAndEnergy: {
    energyClass: "",
    heatingType: "",
    heatingSystem: "",
    electricityType: "",
    floorHeating: false,
    airConditioning: false,
    solarBoiler: false,
    offPeakElectricity: false,
  },
  distances: {
    schools: 0,
    supermarket: 0,
    cafeRestaurant: 0,
    hospital: 0,
    airport: 0,
    sea: 0,
    publicTransport: 0,
    entertainment: 0,
  },
  areas: {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    plot: 0,
    covered: 0,
    basement: 0,
    attic: 0,
    garden: 0,
    balconies: 0,
    storeroom: 0,
    groundFloor: 0,
  },
  construction: {
    yearOfConstruction: 0,
    underConstruction: false,
    newlyBuilt: false,
    incomplete: false,
    totalFloorNumber: 0,
    internalStairs: false,
    neoclassical: false,
    yearOfRenovation: 0,
    renovated: false,
    needsRenovation: false,
    preserved: false,
    elevator: false,
  },
  technicalFeatures: {
    entrances: 0,
    displayWindowsLength: 0,
    safetyDoor: false,
    alarmSystem: false,
    painted: false,
    furnished: "",
    frameType: "",
    paneGlassType: "",
    windowScreens: false,
    fireplace: false,
    bright: false,
    luxurious: false,
    electricCarChargingFacilities: false,
    reception: false,
    petsAllowed: false,
    floorType: "",
    satelliteTV: false,
    wiring: false,
    loadingUnloadingElevator: false,
    falseCeiling: false,
    withEquipment: false,
    doubleFrontage: false,
    consideration: false,
    floorToAreaRatio: 0,
    coverageFactor: 0,
    facadeLength: 0,
    inclination: "",
  },
  details: {
    floor: "",
    bedrooms: 0,
    kitchens: 0,
    wc: 0,
    layers: 0,
    livingrooms: 0,
    bathrooms: 0,
    rooms: 0,
    attic: false,
    storeroom: false,
    playroom: false,
    floorApartment: false,
    penthouse: false,
    orientation: "",
    viewType: "",
    accessibility: "",
    landUse: "",
    zoneType: "",
    balconies: [],
    parkings: [],
  },
  location: {
    street: "0",
    number: 0,
    complex: "",
    zipCode: 0,
    city: "",
    region: "",
    country: "",
  },
  features: {
    panoramicView: false,
    seaView: false,
    mountainView: false,
    seaFront: false,
    walkableDistanceToBeach: false,
    quietArea: false,
    bright: false,
    nearBusRoute: false,
    smartHome: false,
    guestroom: false,
    office: false,
    homeCinema: false,
    combinedKitchenAndDiningArea: false,
    soundInsulation: false,
    thermalInsulation: false,
    heatedPool: false,
    indoorPool: false,
    organizedGarden: false,
    jacuzzi: false,
    well: false,
    drilling: false,
    masonryFence: false,
    accessForDisabled: false,
    alarmSystem: false,
    has24HoursSecurity: false,
    cctv: false,
    internet: false,
    fireDetector: false,
    independentHeatingPerRoom: false,
    adaptingToTheGround: false,
    barbeque: false,
    pool: false,
    view: false,
    facade: false,
    corner: false,
    veranda: false,
    tents: false,
    withinResidentialZone: false,
    withinCityPlan: false,
    loadingDock: false,
  },
  propertyImage: "",
  labelIDs: []
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

    // Parkings & Balconies
    addParking(state: propertyState, { payload }) {
      state.details.parkings.push(payload);
    },
    setParkingType(state: propertyState, { payload }) {
      const index = payload.parkingIndex;
      const type = payload.type;
      if (index === null || !type) return;

      state.details.parkings[index].parkingType = type;
    },
    setParkingSpots(state: propertyState, { payload }) {
      const index = payload.parkingIndex;
      const spots = payload.spots;
      if (index === null || !spots) return;

      state.details.parkings[index].spots = spots;
    },
    addBalcony(state: propertyState, { payload }) {
      state.details.balconies.push(payload);
    },
    setBalconySide(state: propertyState, { payload }) {
      const index = payload.balconyIndex;
      const side = payload.side;
      if (index === null || !side) return;

      state.details.balconies[index].side = side;
    },
    setBalconyArea(state: propertyState, { payload }) {
      const index = payload.balconyIndex;
      const area = payload.area;
      if (index === null || !area) return;

      state.details.balconies[index].area = area;
    },

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
      state.features.pool = action.payload;
    },

    setAccessForDisable(state: propertyState, action): void {
      state.features.accessForDisabled = action.payload;
    },

    setSolarBoiler(state: propertyState, action): void {
      state.heatingAndEnergy.solarBoiler = action.payload;
    },

    setOffice(state: propertyState, action): void {
      state.features.office = action.payload;
    },

    setInternet(state: propertyState, action): void {
      state.features.internet = action.payload;
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

    setBarbeque(state: propertyState, action): void {
      state.features.barbeque = action.payload;
    },

    setCctv(state: propertyState, action): void {
      state.features.cctv = action.payload;
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

    setFloorApartment(state: propertyState, action): void {
      state.details.floorApartment = action.payload;
    },
    setPenthouse(state: propertyState, action): void {
      state.details.penthouse = action.payload;
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

    addLabel(state: propertyState, action): void {
      if (!state.labelIDs.includes(action.payload))
        state.labelIDs.push(action.payload);
    },

    setInitialState: (state: propertyState, action): void => {
      const payload: IProperties = action.payload;

      state.id = payload.id;
      state.code = payload.code;
      state.title = payload.title;
      state.managerId = payload.manager.id;
      state.ownerId = payload.owner.id;
      state.state = payload.state;
      state.parentCategory = payload.parentCategory;
      state.category = payload.category;
      state.area = payload.area;
      state.plotArea = payload.plotArea;
      state.price = payload.price;
      state.averageUtils = payload.averageUtils;
      state.rented = payload.rented;
      state.currentRentPrice = payload.currentRentPrice;
      state.estimatedRentPrice = payload.estimatedRentPrice;
      state.rentalStart = payload.rentalStart;
      state.rentalEnd = payload.rentalEnd;
      state.availableAfter = payload.availableAfter;
      state.keyCode = payload.keyCode;
      state.auction = payload.auction;
      state.debatablePrice = payload.debatablePrice;
      state.buildable = payload.buildable;
      state.video = payload.video;
      state.description = payload.description;
      state.propertyImage = payload.propertyImage;
      state.suitableFor = payload.suitableFor;
      state.heatingAndEnergy = payload.heatingAndEnergy;
      state.distances = payload.distances;
      state.areas = payload.areas;
      state.construction = payload.construction;
      state.technicalFeatures = payload.technicalFeatures;
      state.details = payload.details;

      // Location
      const location: ILocation = payload.location;
      state.location.city = location.city;
      state.location.complex = location.complex;
      state.location.country = location.country;
      state.location.number = location.number;
      state.location.region = location.region;
      state.location.street = location.street;
      state.location.zipCode = location.zipCode;

      state.features = payload.features;

      // map labels
      state.labelIDs = payload.labels
        ? payload.labels
          .filter((label) => label.id) // where id not null
          .map((label) => {
            return label.id!;
          })
        : [];
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  setInitialState,

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

  // Parkings & Balconies
  addParking,
  setParkingType,
  setParkingSpots,
  addBalcony,
  setBalconySide,
  setBalconyArea,

  setBasement,
  setAttic,
  setGarden,
  setPublicTransportation,
  setRooms,
  setHasAttic,
  setPool,
  setAccessForDisable,
  setSolarBoiler,
  setOffice,
  setInternet,
  setEntrances,
  setThermalInsulation,
  setSeaView,
  setGuestroom,
  setQuietArea,
  setSoundInsulation,
  setHas24HoursSecurity,
  setBuildable,
  setBarbeque,
  setCctv,
  setCombinedKitchenAndDiningArea,
  setFireDetector,
  setHomeCinema,
  setJacuzzi,
  setNearBusRoute,
  setPanoramicView,
  setPlayRoom,
  setSmartHome,
  setWalkableDistanceToBeach,
  setElevator,

  addLabel,

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
export const selectNumOfWC = ({ property }: RootState) => property.details.wc;

export const selectLivingRooms = ({ property }: RootState) =>
  property.details.livingrooms;

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
export const selectGarden = ({ property }: RootState) => property.areas.garden;
export const selectStoreroom = ({ property }: RootState) =>
  property.areas.storeroom;
export const selectAttic = ({ property }: RootState) => property.areas.attic;

export const selectParkings = ({ property }: RootState) => property.details.parkings;
export const selectBalconies = ({ property }: RootState) => property.details.balconies;

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

// Construction
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

export const selectOffice = ({ property }: RootState) =>
  property.features.office;

export const selectInternet = ({ property }: RootState) =>
  property.features.internet;

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

export const selectBarbeque = ({ property }: RootState) =>
  property.features.barbeque;

export const selectCctv = ({ property }: RootState) => property.features.cctv;

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
export const selectHasAttic = ({ property }: RootState) =>
  property.details.attic;

//Property Description
export const selectFloorApartment = ({ property }: RootState) =>
  property.details.floorApartment;
export const selectPenthouse = ({ property }: RootState) =>
  property.details.penthouse;

export const selectSolarBoiler = ({ property }: RootState) =>
  property.heatingAndEnergy.solarBoiler;

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

export const selectLoadingDock = ({ property }: RootState) =>
  property.features.loadingDock;

export const selectLabelIDs = ({ property }: RootState) => property.labelIDs;

export const { reducer } = slice;
