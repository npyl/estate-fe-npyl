// slice for notifications

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ContactNotificationPOST } from "src/types/notification";

interface notificationState extends ContactNotificationPOST {
    [key: string]: any;
}

const initialState: notificationState = {
    customerName: "",
    customerEmail: "",
    customerMobile: "",
    message: "",
    propertyCode: "",
    tourDate: "",
    tourTime: "",
    tourType: "",
};

const slice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setAttribute(state: notificationState, { payload }): void {
            const key = payload.key;
            const value = payload.value;

            if (key == null || value == null) return;

            state[key] = value;
        },

        resetState: () => {
            return initialState;
        },
    },
});

export const { setAttribute, resetState } = slice.actions;

export const selectAll = ({ notification }: RootState) => notification;
export const selectCustomerName = ({ notification }: RootState) =>
    notification.customerName;
export const selectCustomerEmail = ({ notification }: RootState) =>
    notification.customerEmail;
export const selectCustomerMobile = ({ notification }: RootState) =>
    notification.customerMobile;
export const selectMessage = ({ notification }: RootState) =>
    notification.message;
export const selectPropertyCode = ({ notification }: RootState) =>
    notification.propertyCode;
export const selectTourDate = ({ notification }: RootState) =>
    notification.tourDate;
export const selectTourTime = ({ notification }: RootState) =>
    notification.tourTime;
export const selectTourType = ({ notification }: RootState) =>
    notification.tourType;

export const { reducer } = slice;
