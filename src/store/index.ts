import type { Action } from "@reduxjs/toolkit";
import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import type { ThunkAction } from "redux-thunk";
import { auth } from "../services/auth";
import { document } from "../services/document";
import { rtkQueryErrorLogger } from "../services/error";
import { properties } from "../services/properties";
import { customers } from "../services/customers";
import { user } from "../services/user";
import { rootReducer } from "./root-reducer";
import { global } from "src/services/global";
import { note } from "src/services/note";
export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [
            "document/executeQuery/fulfilled",
            "document/executeQuery/pending",
            "document/subscriptions/unsubscribeQueryResult",
            "document/executeQuery/pending",
            "document/executeQuery/fulfilled",
          ],
          ignoredActionPaths: ["payload", "meta", "document"],
        },
      }).concat(
        document.middleware,
        auth.middleware,
        user.middleware,
        properties.middleware,
        customers.middleware,
        global.middleware,
        note.middleware,
        rtkQueryErrorLogger
      ),
    ...options,
  });
export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
