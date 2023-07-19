import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDataList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setDataList } = dataSlice.actions;
export default dataSlice.reducer;