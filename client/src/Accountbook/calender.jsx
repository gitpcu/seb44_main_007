import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import { styled } from 'styled-components';
import { data } from '../InitData/data';


const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div key={i}>
                {date[i]}
            </div>,
        );
    }
    return <DayWeek>{days}</DayWeek>;  
};

export const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    //월 이동
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

      
    //날짜 
    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const weekStart = startOfWeek(monthStart);
    const weekEnd = endOfWeek(monthEnd);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const rows = [];
    let days = [];
    let day = weekStart;
    let formattedDate = '';

    //데이터 리듀스
    const dateSums = data.reduce((acc, item) => {
        const { date, type, amount } = item;
        const daySum = acc[date] || { income: 0, expense: 0 };
        if (type === '수입') {
          daySum.income += amount;
        } else if (type === '지출') {
          daySum.expense += amount;
        }
        acc[date] = daySum;
        return acc;
      }, {});
      

    while (day <= weekEnd) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'yyyy-MM-dd');
            const cloneDay = day;
            const daySum = dateSums[formattedDate] || { income: 0, expense: 0 };
            days.push(
                <CellTextContainer
                    className={` ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}>
                    <CellText 
                    key={formattedDate}
                    style={{color: format(currentMonth, 'M') !== format(day, 'M') ? 'rgb(95, 95, 95)' : ''
                    }} >
                        <TextDay>{format(day, 'd')}</TextDay>
                        <TextType>
                            <Income>{daySum.income !== 0 && daySum.income}</Income>
                            <Expense>{daySum.expense !== 0 && daySum.expense}</Expense>
                        </TextType>
                    </CellText>
                            
                </CellTextContainer>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <CellWeek>{days}</CellWeek>,
        );
        days = [];
    }

    return (
        <CalenderWapper>
            {/* 월, 페이지 이동 */}
            <Header >
                <Icon src="icon/left_arrow.png" alt="<" onClick={prevMonth} />
                <Text>
                    {format(currentMonth, 'M')}월
                </Text>
                <Icon src="icon/right_arrow.png" alt=">"  onClick={nextMonth} />   
            </Header>
            {/* 요일 */}
            <RenderDays />
            {/* 날짜 */}
            <Body>
                {rows}
            </Body>
        </CalenderWapper>
    );
};

const CalenderWapper = styled.div`
    width: 940px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Header = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Text = styled.span`
    width: 50px;
    text-align: center;
    font-size: 20px;
    margin: 0 20px;
`

const Icon = styled.img`
    filter: invert(69%) sepia(0%) saturate(201%) hue-rotate(210deg) brightness(93%) contrast(90%);
    width: 22px;
    height: 22px;
    cursor: pointer;
`
const DayWeek = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: rgb(160, 160, 160);
    font-size: 14px;
`

const Body = styled.div`
    width: 100%;
    height: 490px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
`
// 주, 7일씩
const CellWeek = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`
//날짜 div
const CellTextContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-around;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0);
    cursor: pointer;
    &:hover{
        background-color: rgba(210, 210, 210, 0.1);
    }
    &.selected{
        background-color: rgba(210, 210, 210, 0.1);
        border: 1px solid #C5FF78;
    }
`;
//날짜 span
const CellText = styled.span`
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TextDay = styled.div`
    margin-bottom: 5px;
`;

const TextType = styled.div`
    height: 30px;
    font-size: 14px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #365A42;
`;

const Income = styled.p`
    text-align: center;
    color: #365A42;
    margin-bottom: 3px;
`;

const Expense = styled.p`
    text-align: center;
    color: rgb(255, 64, 52);
`;