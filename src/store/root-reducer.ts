import { combineReducers } from "@reduxjs/toolkit";

import { dashboard } from "src/services/dashboard";
import { labels } from "src/services/labels";
import { publicListing, spitogatosListing } from "src/services/listings";
import { logs } from "src/services/logs";
import { note } from "src/services/note";
import { notification } from "src/services/notification";
import { tickets } from "src/services/tickets"; // a.k.a. kanban
import { auth } from "../services/auth";
import { customers } from "../services/customers";
import { global } from "../services/global";
import { location } from "../services/location";
import { properties } from "../services/properties";
import { security } from "../services/security";
import { user } from "../services/user";
import { translation } from "@/services/translate";
import { publicDashboard } from "../services/publicDashboard";
import { company } from "../services/company";
import { solar, airQuality } from "@/services/googleapi";
import { integrations } from "@/services/integrations";

import { reducer as customerFiltersReducer } from "../slices/customer/filters";
import { reducer as customerMiscReducer } from "../slices/customer/misc";
import { reducer as filtersReducer } from "../slices/filters";
import { reducer as logReducer } from "../slices/log";
import { reducer as securityReducer } from "../slices/security";
import { agreements } from "@/services/agreements";

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
    [tickets.reducerPath]: tickets.reducer,
    [logs.reducerPath]: logs.reducer,
    [dashboard.reducerPath]: dashboard.reducer,
    [publicDashboard.reducerPath]: publicDashboard.reducer,
    [translation.reducerPath]: translation.reducer,
    [company.reducerPath]: company.reducer,
    [agreements.reducerPath]: agreements.reducer,
    // Listings
    [publicListing.reducerPath]: publicListing.reducer,
    [spitogatosListing.reducerPath]: spitogatosListing.reducer,
    // ...
    [solar.reducerPath]: solar.reducer,
    [airQuality.reducerPath]: airQuality.reducer,
    // ...
    [integrations.reducerPath]: integrations.reducer,

    // property
    filters: filtersReducer,
    // customer
    customerMisc: customerMiscReducer,
    customerFilters: customerFiltersReducer,
    // general
    securitySlice: securityReducer,
    logsFilters: logReducer,
});
