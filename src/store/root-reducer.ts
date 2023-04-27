import { combineReducers } from "@reduxjs/toolkit";

import { auth } from "../services/auth";
import { document } from "../services/document";
import { properties } from "../services/properties";
import { customers } from "../services/customers";
import { user } from "../services/user";
import { global } from "../services/global";
import { reducer as propertyReducer } from "../slices/property";

export const rootReducer = combineReducers({
  [document.reducerPath]: document.reducer,
  [auth.reducerPath]: auth.reducer,
  [user.reducerPath]: user.reducer,
  [properties.reducerPath]: properties.reducer,
  [customers.reducerPath]: customers.reducer,
  [global.reducerPath]: global.reducer,
  property: propertyReducer,
});
