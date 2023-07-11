import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataSlice from "./reducers";
import { expendReducer, profitReducer, targetReducer,  } from './account_reducer';
import dataReducer from './submit_data_reducer';
import selectedDateReducer from './date_reducer'

const rootReducer = combineReducers({
  data: dataSlice,
  totalExpend: expendReducer, //지출 총 합
  totalProfit: profitReducer, //수익 총 합
  targetExpend: targetReducer, //목표 지출 금액
  accountData: dataReducer, // 데이터 리스트
  selectedDate: selectedDateReducer, //선택한 날짜
  
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
