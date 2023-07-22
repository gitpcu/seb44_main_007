import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: false,
  reducers: {
    setPayment: (state, action) => action.payload,
  },
});

export const { setPayment } = paymentSlice.actions;
export default paymentSlice.reducer;