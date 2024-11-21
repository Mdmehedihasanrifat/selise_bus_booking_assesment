import { configureStore } from "@reduxjs/toolkit";
import busReducer from "./busSlice";

export const store = configureStore({
    reducer: busReducer
  })

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
