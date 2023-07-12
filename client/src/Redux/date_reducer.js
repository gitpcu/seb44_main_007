import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedDate: '2023-07-10',
  };

const selectedDateSlice = createSlice({
  name: 'chosenDate',
  initialState,
  reducers: {
    selectDate: (state, action) => {
        state.selectedDate = action.payload
    },
  },
});

export const { selectDate } = selectedDateSlice.actions;
export default selectedDateSlice.reducer;
