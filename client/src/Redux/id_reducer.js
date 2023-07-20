import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null, // 초기 값은 null로 설정합니다.
};

const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setId } = idSlice.actions;
export default idSlice.reducer;