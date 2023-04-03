import { combineReducers } from "@reduxjs/toolkit";

import { auth } from "../services/auth";
import { document } from "../services/document";
import { properties } from "../services/properties";
import { user } from "../services/user";

export const rootReducer = combineReducers({
  [document.reducerPath]: document.reducer,
  [auth.reducerPath]: auth.reducer,
  [user.reducerPath]: user.reducer,
  [properties.reducerPath]: properties.reducer,
});
