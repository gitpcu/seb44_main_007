import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { expendReducer, profitReducer, targetReducer,  } from './Accountbook/account_reducer';
import dataReducer from './Accountbook/submit_data_reducer';
import selectedDateReducer from './Accountbook/date_reducer'

const rootReducer = combineReducers({
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