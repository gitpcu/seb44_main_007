import React, { useState } from 'react'
import * as S from './accountbook_style';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import 'react-datepicker/dist/react-datepicker.css';
import { data } from '../InitData/data';
import { Calender } from './calender';


const Accountbook = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState(0);

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1);
  const day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
  const monthEng = today.toLocaleDateString('en-us', { month: 'short'}).toUpperCase();

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const incomeType = data.filter((income) => income.type === "수입")
  .map((income) => income.amount)
  .reduce((acc,cur) => {return acc + cur;} ,0).toLocaleString();

  const spendType = data.filter((spend) => spend.type === "지출")
  .map((spend) => spend.amount)
  .reduce((acc,cur) => {return acc + cur;} ,0).toLocaleString();

    return (
      <>
      <S.AccountbookPage>
        <S.AccountbookWrapper>
            <S.userWelcome>Welcome, user!</S.userWelcome>
            <S.AccountBox>
              <S.InnerWrapper>
                <S.Title>총 수입</S.Title>
                <S.Amount>{incomeType}</S.Amount>
              </S.InnerWrapper>
              <S.InnerWrapper>
                <S.Title>총 지출</S.Title>
                <S.Amount>{spendType}</S.Amount>
              </S.InnerWrapper>
              <S.InnerWrapperGoal>
                <S.Title>목표 지출 금액</S.Title>
                <S.AmountGoal>1,000,000</S.AmountGoal>
              </S.InnerWrapperGoal>
            </S.AccountBox>
            
            <S.AccountbookSection>
              <S.AccountbookHeader>
                <S.TabHeader active={activeTab === 0}>
                  <p>날짜 선택
                    <DatePicker
                      className='datePicker'
                      locale={ko}
                      dateFormat="yyyy-MM-dd"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </p>
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
                    <S.MonthDay>{monthEng} {day}</S.MonthDay>
                    <S.DataUl>
                      {data.filter((data) => data.date === startDate?.toISOString().split('T')[0]).map((item) => {return(
                        <S.DataLi>
                          <S.Category>{item.category}</S.Category>
                          <S.TradeName>{item.tradeName}</S.TradeName>
                          <S.Note>{item.note}</S.Note>
                          <S.AmountLi isIncome={item.type === "수입"}>
                            {item.type === "수입" ? '+ '+(item.amount) : '- '+(item.amount)}</S.AmountLi>
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
  
  export default Accountbook;
  