import {configureStore} from "@reduxjs/toolkit";
import {crmApi} from "./crmApi";

export const store = configureStore({
  reducer: {
    [crmApi.reducerPath]: crmApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(crmApi.middleware)
})