import React, { useState, useEffect } from 'react';
import {styled} from "styled-components";
import { useSelector } from 'react-redux';
import SubmitData from "./submit_data";

import axios from 'axios'
import apiUrl from '../../../API_URL';

const AccountbookSide = () => {

  // 목표 지출 금액 서버에서 받아오기
  const [amountGoal, setAmountGoal] = useState(0);

  useEffect(() => {
    const getAmountGoal = async () => {
      try {
        const response = await axios.get(apiUrl.url + '/totals/1', {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'withCredentials': true,
            'Authorization': localStorage.getItem('Authorization-Token'),
          },
        });
        setAmountGoal(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    getAmountGoal();
    
  }, []);
    
    const targetExpend = () => {
        if(amountGoal === 0){
            return amountGoal
        } else {
            return amountGoal.data.goal
        }
    }
    const totalExpend = useSelector((state) => state.totalExpend);
    // 퍼센트 계산
    const percentage = (totalExpend / targetExpend()) * 100;
    const formattedPercentage = percentage.toFixed(2);

    //날짜
    const selectedDate = useSelector((state) => state.selectedDate);
    
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
    const currentDate = selectedDate.selectedDate;

    //데이터 받아오기
    const [accountData, setAccountData] = useState([]);

    useEffect(() => {
        const getData = async () => {
        try {
             const response = await axios.get(apiUrl.url + '/trades/2?startDate=2023-07-01&endDate=2023-07-31',{
                  headers: {
                    'ngrok-skip-browser-warning': '69420',
                    'withCredentials': true,
                    'Authorization': localStorage.getItem('Authorization-Token'),
                },
            });
            setAccountData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);

    //일별 총 수입/지출
    // const accountDataList = useSelector((state) => state.accountData.accountDataList); 
    const accountDataList = accountData; 
    const calTotalProfit = Array.isArray(accountDataList)
        ? accountDataList.filter((item) => item.type === '수입' && item.date === formatDate(currentDate))
            .reduce((sum, item) => sum + item.amount, 0)
        :0;

    const calTotalExpend = Array.isArray(accountDataList)
        ? accountDataList.filter((item) => item.type === '지출' && item.date === formatDate(currentDate))
            .reduce((sum, item) => sum + item.amount, 0)
        :0;

    const total = calTotalProfit - calTotalExpend;


    return (
        <>
            <AccountSidePage>
                <AccountSideWrapper>
                    {/* 목표 금액 대비 지출 */}
                    <TargetAmountForm>
                        <Header>
                            <Title>목표 금액 대비 지출</Title>
                            <Percentage zero={targetExpend() === 0}>
                                {targetExpend() === 0 ? '목표 지출 금액을 설정해 주세요.' : formattedPercentage + '%'}
                            </Percentage>
                        </Header>
                        <AmountBar>           
                            <AmountProgress style={{width: `${formattedPercentage}%` }}> </AmountProgress>
                        </AmountBar>
                        <TextDiv>
                            <p>{totalExpend.toLocaleString()}</p>
                            <p>{targetExpend().toLocaleString()}</p>
                        </TextDiv>
                        <TextDiv>
                            <p>총 지출</p>
                            <p>목표 지출 금액</p>
                        </TextDiv>
                    </TargetAmountForm>
                    {/* 일별 총 수입/지출 */}
                    <DayTotalForm>
                        <Header>
                            <Title>일별 총 수입/지출</Title>
                            <Day> {formatDateShort(currentDate)} </Day>
                        </Header>
                        <DayTotalInner>
                            <InnerLine>
                                <Text>총 수입</Text>
                                <Total style={{color : 'rgb(255, 64, 52)' }}>+ {calTotalProfit.toLocaleString()}</Total>
                            </InnerLine>
                            <InnerLine>
                                <Text>총 지출</Text>
                                <Total>- {calTotalExpend.toLocaleString()}</Total>
                            </InnerLine>
                            <Line />
                            <InnerLine>
                                <Text>합계</Text>
                                <Total>{total > 0 ? '+' + total.toLocaleString() : total.toLocaleString()}</Total>
                            </InnerLine>
                        </DayTotalInner>
                    </DayTotalForm>
                    {/* 입력창 */}
                    <SubmitData />
                </AccountSideWrapper>
            </AccountSidePage>
        </>
    );
  };
  export default AccountbookSide;

const AccountSidePage = styled.body`
    color: rgb(34, 34, 31);
    height: 100%;
`
const AccountSideWrapper = styled.div`
    width: 520px;
    min-height: 100vh;
    padding: 50px;
`
const TargetAmountForm = styled.div`
    width: 100%;
    height: 110px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 40px;
`

const Header = styled.div`
    width: 100%;
    height: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
`
const Title = styled.p`
    font-size: 18px;
    font-weight: 700;
`
const Percentage = styled.p`
    font-weight: ${props => props.zero ? '400' : '700'};
    font-size: ${props => props.zero ? '14px' : '20px'};
    color: ${props => props.zero ? 'rgb(160, 160, 160);' : 'rgb(246, 111, 60)'};
`

const AmountBar = styled.div`
    width: 100%;
    height: 14px;
    background-color: rgb(210, 210, 210);
    border-radius: 50px;
    margin-bottom: 10px;
`

const AmountProgress = styled.div`
    height: 14px;
    max-width: 100%;
    text-align: center;
    background-color: rgb(246, 111, 60);
    border-radius: 50px;

`

const TextDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 13px;
    margin-bottom: 3px;
    padding: 0 15px;
`

const DayTotalForm = styled(TargetAmountForm)`
    height: 100%;
`
const Day = styled(Percentage)`
    color: rgb(34, 34, 31);
`
const DayTotalInner = styled.div`
   
`
const InnerLine = styled.div`
    padding: 0 15px;
    margin-bottom: 10px;
    font-size: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
   
`
const Text = styled.p`
    font-weight: 500;
`
const Total = styled.p`
    font-size: 18px;
    font-weight: 700;
`
const Line = styled.div`
    margin-bottom: 10px;
    height: 1px;
    border: 1px solid rgb(210, 210, 210);
   
`

