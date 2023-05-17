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
    // setCode(state: customerState, action): void {
    //   state.code = action.payload;
    // },

    resetState: () => {
      return initialState;
    },
  },
});

export const {
  //   setCoverageFactor,

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
