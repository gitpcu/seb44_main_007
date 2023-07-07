import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import targetExpendReducer from './Accountbook/account_reducer';
import { expendReducer, profitReducer, targetReducer,  } from './Accountbook/account_reducer';

const rootReducer = combineReducers({
  totalExpend: expendReducer,
  totalProfit: profitReducer,
  targetExpend: targetReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;