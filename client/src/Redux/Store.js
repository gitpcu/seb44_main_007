import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./reducers";

const store = configureStore({
  reducer: {
    data: dataSlice,
  },
});

export default store;
