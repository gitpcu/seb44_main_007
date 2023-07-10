import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// component import
import PieGraph from "./PieGraph";
import PieGraphList from "./PieGraphList";
import CategoryCompare from "./CategoryCompare";
import LineGraph from "./LineGraph";

// Dummy Data Import
const PageWrap = styled.div`
  background-color: rgb(34, 34, 31);
  display: flex;
  flex-direction: column;
  padding: 1%;
  width: calc(100% - 300px);
  height: 100vh;
`;

// PageTop
const PageTop = styled.div`
  display: flex;
  height: 5%;
`;
const PageMoveButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 24px;
  font-weight: 600;
  color: rgb(210, 210, 210);
`;
const Month = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: rgb(210, 210, 210);
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

//PageMiddle
const PageMiddle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
  height: 65%;
`;
// MiddleLeft
const MiddleLeft = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  padding: 1%;
`;

// Expenditure
const Expenditure = styled.div`
  height: 50%;
`;
const GraphZone = styled.div`
  width: 100%;
  display: flex;
`;

// Earnings
const Earnings = styled.div`
  height: 50%;
`;

// MiddleRight
const MiddleRight = styled.div`
  width: 50%;
  padding: 1%;
`;
// MiddleRightTop
const MiddleRightTop = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5%;
`;
const RightTitle = styled.div`
  width: 40%;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
`;
const RightlegendWrap = styled.div`
  width: 20%;
  justify-content: center;
`;
const Rightlegend = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ListDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 10px;
`;
// MiddleRightBottom
const MiddleRightBottomWrap = styled.div`
  display: flex;
  width: 100%;
  padding: 5%;
  flex-direction: column;
  justify-content: space-around;
  height: 95%;
`;

const PageBottom = styled.div`
  height: 30%;
`;

function Analysis() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  // get Data from Redux
  const initData = useSelector((state) => state.data.initData);

  // dataState
  const [lastmonthData, setLastMonthData] = useState([]); // 전체 데이터(지난달)
  const [monthData, setMonthData] = useState([]); // 전체 데이터(이번달)
  const [spend, setSpend] = useState(0); // 총 지출
  const [income, setIncome] = useState(0); // 총 수입
  const [spendData, setSpendData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  // 받아온 데이터를 설정한 달에 맞게 filter
  useEffect(() => {
    const filterData = initData.filter((it) => {
      const date = new Date(it.date);
      const datayear = date.getFullYear();
      const datamonth = date.getMonth() + 1;

      return datayear === year && datamonth === month;
    });
    setMonthData(filterData);
  }, [initData, month, year]);

  // 수입,지출 총 금액 산정
  useEffect(() => {
    const filterData1 = monthData.reduce((acc, cur, idx) => {
      if (cur.type === "지출") {
        return (acc += cur.amount);
      }
      return (acc += 0);
    }, 0);
    setSpend(filterData1);
    const filterData2 = monthData.reduce((acc, cur, idx) => {
      if (cur.type === "수입") {
        return (acc += cur.amount);
      }
      return (acc += 0);
    }, 0);
    setIncome(filterData2);
    const filterData3 = monthData.filter((it) => {
      return it.type === "지출";
    });
    setSpendData(filterData3);
    const filterData4 = monthData.filter((it) => {
      return it.type === "수입";
    });
    setIncomeData(filterData4);
  }, [monthData]);

  // function
  const onClickHandler = (e) => {
    const result = e.target.value;
    if (result === "prev") {
      if (month === 1) {
        setYear(year - 1); // 연도 하나 줄어듬
        setMonth(12);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 12) {
        setYear(year + 1); // 연도 하나 늘어남
        setMonth(1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  return (
    <PageWrap>
      <PageTop>
        <PageMoveButton onClick={onClickHandler} value="prev">
          {"<"}
        </PageMoveButton>
        <Month>
          {year}년 {month}월
        </Month>
        <PageMoveButton onClick={onClickHandler} value="next">
          {">"}
        </PageMoveButton>
      </PageTop>
      <PageMiddle>
        <MiddleLeft>
          <Expenditure>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  minWidth: "50px",
                  fontSize: "20px",
                  fontWeight: 600,
                  borderRight: "1px solid white",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                지출
              </div>
              <div
                style={{
                  minwidth: "150px",
                  fontSize: "23px",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "16px", marginRight: "5px" }}>총</span>
                {spend} 원
              </div>
            </div>
            <GraphZone>
              <PieGraph alt="원형그래프" data={spendData} />
              <PieGraphList alt="그래프리스트" data={spendData} />
            </GraphZone>
          </Expenditure>
          <Earnings>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  minwidth: "50px",
                  fontSize: "20px",
                  fontWeight: 600,
                  borderRight: "1px solid white",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                수입
              </div>
              <div
                style={{
                  minwidth: "150px",
                  fontSize: "23px",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "16px", marginRight: "5px" }}>총</span>
                {income} 원
              </div>
            </div>
            <GraphZone>
              <PieGraph alt="원형그래프" data={incomeData} />
              <PieGraphList alt="그래프리스트" data={incomeData} />
            </GraphZone>
          </Earnings>
        </MiddleLeft>
        <MiddleRight>
          <MiddleRightTop>
            <RightTitle>카테고리별 지난달 지출 비교</RightTitle>
            <RightlegendWrap>
              <Rightlegend>
                <ListDot color="#F4CD72" />
                <p style={{ color: "#ffffff" }}>이번 달</p>
              </Rightlegend>
              <Rightlegend>
                <ListDot color="#A0A0A0" />
                <p style={{ color: "#ffffff" }}>지난 달</p>
              </Rightlegend>
            </RightlegendWrap>
          </MiddleRightTop>
          <MiddleRightBottomWrap>
            <CategoryCompare
              spendData={spendData}
              lastmonthData={lastmonthData}
            />
          </MiddleRightBottomWrap>
        </MiddleRight>
      </PageMiddle>
      <PageBottom>
        <LineGraph />
      </PageBottom>
    </PageWrap>
  );
}

export default Analysis;
