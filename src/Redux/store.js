import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoceReducer";

export const store = configureStore({
  reducer: {
    Invoice: invoiceReducer,
  },
});
