import { createSlice } from '@reduxjs/toolkit';

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const initialState = {
    selectedDate: `${year}-${month}-${day}`,
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
