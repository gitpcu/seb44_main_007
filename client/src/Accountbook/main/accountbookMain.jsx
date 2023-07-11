import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { totalProfit, totalExpend } from '../account_reducer'
import { selectDate } from '../date_reducer';
import * as S from './accountbookMain_style';
import TargetAmountModal from "./targetAmountModal";
import DatePicker from 'react-datepicker';
// import { ko } from "date-fns/esm/locale";
import 'react-datepicker/dist/react-datepicker.css';
import { Calender } from './calender';


const AccountbookMain = () => {
  const dispatch = useDispatch();

  const targetExpend = useSelector((state) => state.targetExpend);
  const totalProfitSelector = useSelector((state) => state.totalProfit);
  const totalExpendSelector = useSelector((state) => state.totalExpend);
  const [activeTab, setActiveTab] = useState(0);

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1);
  const day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  
  //날짜
  const selectedDate = useSelector((state) => state.selectedDate);
  
  const handleDateChange = (date) => {
    dispatch(selectDate(date));
  };

  const currentDate = selectedDate.selectedDate;

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const formatDateShort = (date) => {
    const formattedDate = new Date(date);
    const month = formattedDate.toLocaleString('en-US', { month: 'short' });
    const day = formattedDate.getDate();
    const formattedString = `${month} ${day}`;
    return formattedString;
}

  // console.log(new Date())
  // console.log(currentDate)
  // console.log(formatDate(currentDate))

  //총 수입, 지출 리듀서
  const accountDataList = useSelector((state) => state.accountData.accountDataList); 
  //데이터 받아오면 data => accountDataList
  useEffect(() => {
    const calTotalProfit = () => {
      const ProfitData = accountDataList
        .filter((item) => item.type === '수입')
        .reduce((sum, item) => sum + item.amount, 0);
      dispatch(totalProfit(ProfitData));
    };
    const calTotalExpend = () => {
      const ExpendData = accountDataList
        .filter((item) => item.type === '지출')
        .reduce((sum, item) => sum + item.amount, 0);
      dispatch(totalExpend(ExpendData));
    };

    calTotalProfit();
    calTotalExpend();
  }, [dispatch, accountDataList] );

    return (
      <>
      <S.AccountbookPage>
        <S.AccountbookWrapper>
            <S.userWelcome>Welcome, user!</S.userWelcome>
            <S.AccountBox>
              <S.InnerWrapper>
                <S.Title>총 수입</S.Title>
                <S.Amount>{totalProfitSelector.toLocaleString()}</S.Amount>
              </S.InnerWrapper>
              <S.InnerWrapper>
                <S.Title>총 지출</S.Title>
                <S.Amount>{totalExpendSelector.toLocaleString()}</S.Amount>
              </S.InnerWrapper>
              <S.InnerWrapperGoal>
                <S.Title>
                  목표 지출 금액
                  <TargetAmountModal />
                </S.Title>
                <S.AmountGoal>{targetExpend.toLocaleString()}</S.AmountGoal>
              </S.InnerWrapperGoal>
            </S.AccountBox>
            
            <S.AccountbookSection>
              <S.AccountbookHeader>
                <S.TabHeader active={activeTab === 0}>
                  <p>날짜 선택</p>
                  <DatePicker
                    className='datePicker'
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </S.TabHeader>
                <S.TabHeader active={activeTab === 1}>
                  <p>Today {`${year}-${month}-${day}`}</p>
                </S.TabHeader>
                <div>
                  <S.TabButton active={activeTab===0} onClick={() => handleTabClick(0)}>일별</S.TabButton>
                  <S.TabButton active={activeTab===1} onClick={() => handleTabClick(1)}>월별</S.TabButton>
                </div>
              </S.AccountbookHeader>
              <S.AccountbookContents>
                <S.TabContents active={activeTab === 0}>
                  <S.DatePage>
                    <img src="icon/left_arrow.png" alt="<" />
                    <p>날짜 페이지 네이션</p>
                    <img src="icon/right_arrow.png" alt=">" />
                  </S.DatePage>
                  <S.DateContent>
                    <S.MonthDay>{formatDateShort(currentDate)}</S.MonthDay>
                    <S.DataUl>
                      {accountDataList.filter((data) => data.date === formatDate(currentDate)).map((item) => {return(
                        <S.DataLi>
                          <S.Category>{item.category}</S.Category>
                          <S.TradeName>{item.tradeName}</S.TradeName>
                          <S.Note>{item.note}</S.Note>
                          <S.AmountLi isIncome={item.type === "수입"}>
                            {item.type === "수입" ? '+ '+(item.amount.toLocaleString()) : '- '+(item.amount.toLocaleString())}</S.AmountLi>
                        </S.DataLi>
                      );
                      })}
                    </S.DataUl>
                  </S.DateContent>
                </S.TabContents>
                <S.TabContents active={activeTab === 1}>
                  <Calender />
                </S.TabContents>
              </S.AccountbookContents>
            </S.AccountbookSection>
          </S.AccountbookWrapper>
        </S.AccountbookPage>
      </>
    );
  };
  
  export default AccountbookMain;
  