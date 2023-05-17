import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ICustomer } from "src/types/customer";

type customerState = ICustomer;

const initialState: customerState = {
  firstName: "",
  lastName: "",
  email: "",
  mobilePhone: "",
  homePhone: "",
  //   managedBy: null,
  status: 0,
  fax: "",
  nationality: "",
  idNumber: "",
  passportNumber: "",
  dateOfBirth: "",
  leadSource: "",
  preferredLanguage: "",
  suggestedBy: "",
  //   location: undefined,
  notes: [],
  ownedProperties: [],
  labels: [],
  //   demand: undefined,
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

    // TODO
    // setSuggestedBy(state: customerState, action): void {
    //   state.suggestedBy = action.payload;
    // },

    // TODO
    // setLocation(state: customerState, action): void {
    //   state.status = action.payload;
    // },

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
export const selectLabels = ({ customer }: RootState) => customer.labels;
export const selectDemand = ({ customer }: RootState) => customer.demand;

export const { reducer } = slice;
