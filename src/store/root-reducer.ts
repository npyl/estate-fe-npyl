import { combineReducers } from "@reduxjs/toolkit";

import { labels } from "src/services/labels";
import { note } from "src/services/note";
import { notification } from "src/services/notification";
import { auth } from "../services/auth";
import { customers } from "../services/customers";
import { global } from "../services/global";
import { location } from "../services/location";
import { properties } from "../services/properties";
import { security } from "../services/security";
import { user } from "../services/user";
import { exports } from "../services/exports";
import { tickets } from "src/services/tickets"; // a.k.a. kanban
import { logs } from "src/services/logs";
import { listings } from "src/services/listings";

import { reducer as customerReducer } from "../slices/customer";
import { reducer as customerFiltersReducer } from "../slices/customer/filters";
import { reducer as customerMiscReducer } from "../slices/customer/misc";
import { reducer as filtersReducer } from "../slices/filters";
import kanbanReducer from "../slices/kanban";
import { reducer as labelsReducer } from "../slices/labels";
import { reducer as notesReducer } from "../slices/notes";
import { reducer as notificationReducer } from "../slices/notification";
import { reducer as propertyReducer } from "../slices/property";
import { reducer as securityReducer } from "../slices/security";
import { reducer as logReducer } from "../slices/log";

export const rootReducer = combineReducers({
    [location.reducerPath]: location.reducer,
    [auth.reducerPath]: auth.reducer,
    [user.reducerPath]: user.reducer,
    [properties.reducerPath]: properties.reducer,
    [customers.reducerPath]: customers.reducer,
    [global.reducerPath]: global.reducer,
    [note.reducerPath]: note.reducer,
    [labels.reducerPath]: labels.reducer,
    [notification.reducerPath]: notification.reducer,
    [security.reducerPath]: security.reducer,
    [exports.reducerPath]: exports.reducer,
    [tickets.reducerPath]: tickets.reducer,
    [logs.reducerPath]: logs.reducer,
    [listings.reducerPath]: listings.reducer,

    // property
    property: propertyReducer,
    filters: filtersReducer,
    // customer
    customer: customerReducer,
    customerMisc: customerMiscReducer,
    customerFilters: customerFiltersReducer,
    // general
    notes: notesReducer,
    labelsStore: labelsReducer,
    notification: notificationReducer,
    kanban: kanbanReducer,
    securitySlice: securityReducer,
    logsFilters: logReducer,
});
