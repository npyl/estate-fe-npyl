import { combineReducers } from "@reduxjs/toolkit";

import { labels } from "src/services/labels";
import { note } from "src/services/note";
import { auth } from "../services/auth";
import { customers } from "../services/customers";
import { document } from "../services/document";
import { global } from "../services/global";
import { properties } from "../services/properties";
import { user } from "../services/user";
import { reducer as filtersReducer } from "../slices/filters";
import { reducer as propertyReducer } from "../slices/property";
import { reducer as customerReducer } from "../slices/customer";
import { reducer as tabsReducer } from "../slices/tabs";
import { reducer as labelsReducer } from "../slices/labels";

export const rootReducer = combineReducers({
  [document.reducerPath]: document.reducer,
  [auth.reducerPath]: auth.reducer,
  [user.reducerPath]: user.reducer,
  [properties.reducerPath]: properties.reducer,
  [customers.reducerPath]: customers.reducer,
  [global.reducerPath]: global.reducer,
  [note.reducerPath]: note.reducer,
  [labels.reducerPath]: labels.reducer,
  property: propertyReducer,
  customer: customerReducer,
  labelsStore: labelsReducer,
  tabs: tabsReducer,
  filters: filtersReducer,
});
