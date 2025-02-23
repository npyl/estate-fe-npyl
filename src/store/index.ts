import type { Action } from "@reduxjs/toolkit";
import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from "react-redux";
import type { ThunkAction } from "redux-thunk";
import { global } from "src/services/global";
import { labels } from "src/services/labels";
import { generalListing, publicListing } from "src/services/listings";
import { logs } from "src/services/logs";
import { note } from "src/services/note";
import { notification } from "src/services/notification";
import { tasks } from "@/services/tasks";
import { auth } from "../services/auth";
import { customers } from "../services/customers";
import { dashboard } from "../services/dashboard";
import { rtkQueryErrorLogger } from "../services/error";
import { location } from "../services/location";
import { properties } from "../services/properties";
import { security } from "../services/security";
import { user } from "../services/user";
import { publicDashboard } from "@/services/publicDashboard";
import { translation } from "@/services/translate";
import { company, googleWorkspaceApi } from "../services/company";
import { solar, airQuality } from "@/services/googleapi";
import { agreements } from "@/services/agreements";
import { integrations } from "@/services/integrations";
import { calendar } from "@/services/calendar";
import { googleOAuth } from "@/services/google-oauth";
import { messages } from "@/services/messages";
import { logout } from "@/services/logout";
import { server } from "@/services/server";
import { rootReducer } from "./root-reducer";

export const createStore = (
    options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // Ignore these action types
                    ignoredActions: [],
                    ignoredActionPaths: ["payload", "meta"],
                },
            }).concat(
                auth.middleware,
                user.middleware,
                properties.middleware,
                customers.middleware,
                global.middleware,
                note.middleware,
                labels.middleware,
                location.middleware,
                notification.middleware,
                security.middleware,
                tasks.middleware,
                logs.middleware,
                dashboard.middleware,
                publicDashboard.middleware,
                company.middleware,
                // listings
                generalListing.middleware,
                publicListing.middleware,
                // ...
                translation.middleware,
                solar.middleware,
                airQuality.middleware,
                integrations.middleware,
                agreements.middleware,
                calendar.middleware,
                googleWorkspaceApi.middleware,
                googleOAuth.middleware,
                messages.middleware,
                logout.middleware,
                // ...
                server.middleware,
                rtkQueryErrorLogger
            ),
        ...options,
    });
export const store = createStore();

export const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
