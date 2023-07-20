import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

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
export const wishListReducer = dataSlice.reducer;

const useableSlice = createSlice({
  name: "data",
  initialState: 0,
  reducers: {
    setUseAble: (state, action) => action.payload,
  },
});

export const { setUseAble } = useableSlice.actions;
export const useableReducer = useableSlice.reducer;