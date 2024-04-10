import { combineReducers } from "@reduxjs/toolkit";

import { dashboard } from "src/services/dashboard";
import { labels } from "src/services/labels";
import { listings } from "src/services/listings";
import { logs } from "src/services/logs";
import { note } from "src/services/note";
import { notification } from "src/services/notification";
import { tickets } from "src/services/tickets"; // a.k.a. kanban
import { auth } from "../services/auth";
import { customers } from "../services/customers";
import { exports } from "../services/exports";
import { global } from "../services/global";
import { location } from "../services/location";
import { properties } from "../services/properties";
import { security } from "../services/security";
import { user } from "../services/user";
import { publicDashboard } from "../services/publicDashboard";

import { reducer as customerFiltersReducer } from "../slices/customer/filters";
import { reducer as customerMiscReducer } from "../slices/customer/misc";
import { reducer as filtersReducer } from "../slices/filters";
import { reducer as logReducer } from "../slices/log";
import { reducer as securityReducer } from "../slices/security";

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
    [dashboard.reducerPath]: dashboard.reducer,
    [publicDashboard.reducerPath]: publicDashboard.reducer,

    // property
    filters: filtersReducer,
    // customer
    customerMisc: customerMiscReducer,
    customerFilters: customerFiltersReducer,
    // general
    securitySlice: securityReducer,
    logsFilters: logReducer,
});
