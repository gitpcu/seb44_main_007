import React, { useState } from 'react'
import * as S from './accountbook_style';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import 'react-datepicker/dist/react-datepicker.css';


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

  const [isMonth, setIsMonth] = useState(today.getMonth())
  const handleMonthPlus = () => {
    setIsMonth(isMonth + 1)
  }
  const handleMonthMinus = () => {
    setIsMonth(isMonth - 1)
  }

    return (
      <>
      <S.AccountbookPage>
        <S.AccountbookWrapper>
            <S.userWelcome>Welcome, user!</S.userWelcome>
            <S.AccountBox>
              <S.InnerWrapper>
                <S.Title>총 수입</S.Title>
                <S.Amount>1,000,000</S.Amount>
              </S.InnerWrapper>
              <S.InnerWrapper>
                <S.Title>총 지출</S.Title>
                <S.Amount>1,000,000</S.Amount>
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
                <S.MonthChange active={activeTab === 1}>
                    <img src="icon/left_arrow.png" alt="<" />
                    <p>{`${month}`} 월</p>
                    <img src="icon/right_arrow.png" alt=">" />
                 </S.MonthChange>
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
                  </S.DateContent>
                </S.TabContents>
                <S.TabContents active={activeTab === 1}>hi2</S.TabContents>
              </S.AccountbookContents>
            </S.AccountbookSection>
        </S.AccountbookWrapper>
        </S.AccountbookPage>
      </>
    );
  };
  
  export default Accountbook;
  