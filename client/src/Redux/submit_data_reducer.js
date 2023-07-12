import { createSlice } from '@reduxjs/toolkit';
import { data } from '../InitData/data';

const initialState = {
    accountDataList: data,
};

const accountDataSlice = createSlice({
  name: 'accountData',
  initialState,
  reducers: {
    addAccountData: (state, action) => {
      state.accountDataList.push(action.payload);
    },
    updateAccountData: (state, action) => {
      const { tradeId, updatedData } = action.payload;
      const index = state.accountData.findIndex(data => data.tradeId === tradeId);
      if (index !== -1) {
        state.accountData[index] = updatedData;
      }
    },
    deleteAccountData: (state, action) => {
      const idToDelete = action.payload;
      state.accountDataList = state.accountDataList.filter((item) => item.tradeId !== idToDelete);
    },
  },
});

export const { addAccountData, updateAccountData, deleteAccountData } = accountDataSlice.actions;
export default accountDataSlice.reducer;
