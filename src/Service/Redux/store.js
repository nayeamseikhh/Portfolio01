// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
