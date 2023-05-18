import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ICustomer } from "src/types/customer";

interface customerState extends ICustomer {
  labelIDs: number[];
}

// TODO: make a custom POST type

const initialState: customerState = {
  firstName: "",
  lastName: "",
  email: "",
  mobilePhone: "",
  homePhone: "",
  managedBy: 1, // TODO: Implement this!
  status: 0,
  fax: "",
  nationality: "",
  idNumber: "",
  passportNumber: "",
  dateOfBirth: "",
  leadSource: "",
  preferredLanguage: "",
  suggestedBy: "",
  location: {
    street: "",
    number: 0,
    complex: "",
    zipCode: 0,
    city: "",
    region: "",
    country: "",
    // lat: number;
    // lng: number;
  },
  notes: [],
  ownedProperties: [],
  labelIDs: [],
  demand: {
    filters: {
      minBedrooms: 0,
      maxBedrooms: 0,
      minBathrooms: 0,
      maxBathrooms: 0,
      furnished: "",
      maxCovered: 0,
      minCovered: 0,
      minPlot: 0,
      maxPlot: 0,
      minYearOfConstruction: 0,
      maxYearOfConstruction: 0,
      minFloor: "",
      maxFloor: "",
      parentCategory: "",
      state: "",
      minPrice: 0,
      maxPrice: 0,
    },
    priorityFeatures: {
      // attic: false,  // TODO: this causes backend exception
      // bar: false,    // TODO: same...
      panoramicView: false,
      seaView: false,
      mountainView: false,
      // facade_sea: false, // TODO: same
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
      // petAllowed: false, // TODO: same
      seaFront: false,
    },
    nonPriorityFeatures: {
      // attic: false,  // TODO: this causes backend exception
      // bar: false,    // TODO: same...
      panoramicView: false,
      seaView: false,
      mountainView: false,
      // facade_sea: false, // TODO: same
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
      // petAllowed: false, // TODO: same
      seaFront: false,
    },
    timeframe: "",
  },
};

const slice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setFirstName(state: customerState, action): void {
      state.firstName = action.payload;
    },
    setLastName(state: customerState, action): void {
      state.lastName = action.payload;
    },
    setEmail(state: customerState, action): void {
      state.email = action.payload;
    },
    setMobilePhone(state: customerState, action): void {
      state.mobilePhone = action.payload;
    },
    setHomePhone(state: customerState, action): void {
      state.homePhone = action.payload;
    },

    // setManagedBy: TODO

    setStatus(state: customerState, action): void {
      state.status = action.payload;
    },
    setFax(state: customerState, action): void {
      state.fax = action.payload;
    },
    setNationality(state: customerState, action): void {
      state.nationality = action.payload;
    },
    setIdNumber(state: customerState, action): void {
      state.idNumber = action.payload;
    },
    setPassportNumber(state: customerState, action): void {
      state.passportNumber = action.payload;
    },
    setDateOfBirth(state: customerState, action): void {
      state.dateOfBirth = action.payload;
    },
    setLeadSource(state: customerState, action): void {
      state.leadSource = action.payload;
    },
    setPreferredLanguage(state: customerState, action): void {
      state.preferredLanguage = action.payload;
    },

    addLabel(state: customerState, { payload }): void {
      if (!state.labelIDs.includes(payload)) state.labelIDs.push(payload);
    },

    addNote(state: customerState, { payload }): void {
      state.notes.push(payload);
    },

    // TODO
    // setSuggestedBy(state: customerState, action): void {
    //   state.suggestedBy = action.payload;
    // },

    setStreet(state: customerState, action): void {
      state.location.street = action.payload;
    },
    setNumber(state: customerState, action): void {
      state.location.number = action.payload;
    },
    setCity(state: customerState, action): void {
      state.location.city = action.payload;
    },
    setComplex(state: customerState, action): void {
      state.location.complex = action.payload;
    },
    setZipCode(state: customerState, action): void {
      state.location.zipCode = action.payload;
    },
    setRegion(state: customerState, action): void {
      state.location.region = action.payload;
    },
    setCountry(state: customerState, action): void {
      state.location.country = action.payload;
    },

    // DEMAND
    setMinBedrooms(state: customerState, action): void {
      state.demand.filters.minBedrooms = action.payload;
    },

    setMaxBedrooms(state: customerState, action): void {
      state.demand.filters.maxBedrooms = action.payload;
    },

    setMinBathrooms(state: customerState, action): void {
      state.demand.filters.minBathrooms = action.payload;
    },

    setMaxBathrooms(state: customerState, action): void {
      state.demand.filters.maxBathrooms = action.payload;
    },

    setFurnished(state: customerState, action): void {
      state.demand.filters.furnished = action.payload;
    },

    setMaxCovered(state: customerState, action): void {
      state.demand.filters.maxCovered = action.payload;
    },

    setMinCovered(state: customerState, action): void {
      state.demand.filters.minCovered = action.payload;
    },

    setMinPlot(state: customerState, action): void {
      state.demand.filters.minPlot = action.payload;
    },

    setMaxPlot(state: customerState, action): void {
      state.demand.filters.maxPlot = action.payload;
    },

    setMinYearOfConstruction(state: customerState, action): void {
      state.demand.filters.minYearOfConstruction = action.payload;
    },

    setMaxYearOfConstruction(state: customerState, action): void {
      state.demand.filters.maxYearOfConstruction = action.payload;
    },

    setMinFloor(state: customerState, action): void {
      state.demand.filters.minFloor = action.payload;
    },

    setMaxFloor(state: customerState, action): void {
      state.demand.filters.maxFloor = action.payload;
    },

    setParentCategory(state: customerState, action): void {
      state.demand.filters.parentCategory = action.payload;
    },

    setState(state: customerState, action): void {
      state.demand.filters.state = action.payload;
    },

    setMinPrice(state: customerState, action): void {
      state.demand.filters.minPrice = action.payload;
    },

    setMaxPrice(state: customerState, action): void {
      state.demand.filters.maxPrice = action.payload;
    },

    setTimeFrame(state: customerState, action): void {
      state.demand.timeframe = action.payload;
    },

    resetState: () => {
      return initialState;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setMobilePhone,
  setHomePhone,
  setStatus,
  setFax,
  setNationality,
  setIdNumber,
  setPassportNumber,
  setDateOfBirth,
  setLeadSource,
  setPreferredLanguage,

  // notes
  addNote,

  // labels
  addLabel,

  // location
  setStreet,
  setNumber,
  setCity,
  setComplex,
  setZipCode,
  setRegion,
  setCountry,

  // demand
  setMinBedrooms,
  setMaxBedrooms,
  setMinBathrooms,
  setMaxBathrooms,
  setFurnished,
  setMaxCovered,
  setMinCovered,
  setMinPlot,
  setMaxPlot,
  setMinYearOfConstruction,
  setMaxYearOfConstruction,
  setMinFloor,
  setMaxFloor,
  setParentCategory,
  setState,
  setMinPrice,
  setMaxPrice,
  setTimeFrame,

  resetState,
} = slice.actions;

export const selectAll = ({ customer }: RootState) => customer;

export const selectFirstName = ({ customer }: RootState) => customer.firstName;
export const selectLastName = ({ customer }: RootState) => customer.lastName;
export const selectEmail = ({ customer }: RootState) => customer.email;
export const selectMobilePhone = ({ customer }: RootState) =>
  customer.mobilePhone;
export const selectHomePhone = ({ customer }: RootState) => customer.homePhone;
export const selectManagedBy = ({ customer }: RootState) => customer.managedBy;
export const selectStatus = ({ customer }: RootState) => customer.status;
export const selectFax = ({ customer }: RootState) => customer.fax;
export const selectNationality = ({ customer }: RootState) =>
  customer.nationality;
export const selectIdNumber = ({ customer }: RootState) => customer.idNumber;
export const selectPassportNumber = ({ customer }: RootState) =>
  customer.passportNumber;
export const selectDateOfBirth = ({ customer }: RootState) =>
  customer.dateOfBirth;
export const selectLeadSource = ({ customer }: RootState) =>
  customer.leadSource;
export const selectPreferredLanguage = ({ customer }: RootState) =>
  customer.preferredLanguage;
export const selectSuggestedBy = ({ customer }: RootState) =>
  customer.suggestedBy;
export const selectLocation = ({ customer }: RootState) => customer.location;
export const selectNotes = ({ customer }: RootState) => customer.notes;
export const selectOwnedProperties = ({ customer }: RootState) =>
  customer.ownedProperties;
export const selectLabels = ({ customer }: RootState) => customer.labelIDs;
export const selectDemand = ({ customer }: RootState) => customer.demand;

// Location
export const selectStreet = ({ customer }: RootState) =>
  customer.location.street;
export const selectNumber = ({ customer }: RootState) =>
  customer.location.number;
export const selectCity = ({ customer }: RootState) => customer.location.city;
export const selectComplex = ({ customer }: RootState) =>
  customer.location.complex;
export const selectZipCode = ({ customer }: RootState) =>
  customer.location.zipCode;
export const selectRegion = ({ customer }: RootState) =>
  customer.location.region;
export const selectCountry = ({ customer }: RootState) =>
  customer.location.country;

// Demand
export const selectMinBedrooms = ({ customer }: RootState) =>
  customer.demand.filters.minBedrooms;

export const selectMaxBedrooms = ({ customer }: RootState) =>
  customer.demand.filters.maxBedrooms;

export const selectMinBathrooms = ({ customer }: RootState) =>
  customer.demand.filters.minBathrooms;

export const selectMaxBathrooms = ({ customer }: RootState) =>
  customer.demand.filters.maxBathrooms;

export const selectFurnished = ({ customer }: RootState) =>
  customer.demand.filters.furnished;

export const selectMaxCovered = ({ customer }: RootState) =>
  customer.demand.filters.maxCovered;

export const selectMinCovered = ({ customer }: RootState) =>
  customer.demand.filters.minCovered;

export const selectMinPlot = ({ customer }: RootState) =>
  customer.demand.filters.minPlot;

export const selectMaxPlot = ({ customer }: RootState) =>
  customer.demand.filters.maxPlot;

export const selectMinYearOfConstruction = ({ customer }: RootState) =>
  customer.demand.filters.minYearOfConstruction;

export const selectMaxYearOfConstruction = ({ customer }: RootState) =>
  customer.demand.filters.maxYearOfConstruction;

export const selectMinFloor = ({ customer }: RootState) =>
  customer.demand.filters.minFloor;

export const selectMaxFloor = ({ customer }: RootState) =>
  customer.demand.filters.maxFloor;

export const selectParentCategory = ({ customer }: RootState) =>
  customer.demand.filters.parentCategory;

export const selectState = ({ customer }: RootState) =>
  customer.demand.filters.state;

export const selectMinPrice = ({ customer }: RootState) =>
  customer.demand.filters.minPrice;

export const selectMaxPrice = ({ customer }: RootState) =>
  customer.demand.filters.maxPrice;

export const selectTimeFrame = ({ customer }: RootState) =>
  customer.demand.timeframe;

export const { reducer } = slice;
