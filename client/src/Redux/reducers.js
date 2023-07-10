import { createSlice } from "@reduxjs/toolkit";
// data fetch 해오기

const dataSlice = createSlice({
  name: "data",
  initialState: {
    initData: [],
    loading: false,
    error: null,
  },
  reducers: {
    setfetchData: (state, action) => {
      state.initData = action.payload;
    },
  },
});

export const { setfetchData } = dataSlice.actions;
export default dataSlice.reducer;
