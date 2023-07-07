import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// component import
import PieGraph from "./PieGraph";
import PieGraphList from "./PieGraphList";

const PageWrap = styled.div`
  background-color: rgb(25, 25, 25);
  display: flex;
  flex-direction: column;
  padding: 1%;
  height: 96vh;
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
  height: 68%;
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
  width: 45%;
  padding: 1%;
`;
// MiddleRightTop
const MiddleRightTop = styled.div`
  display: flex;
  justify-content: space-between;
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
  width: 10%;
`;
const Rightlegend = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
  flex-direction: column;
  justify-content: space-around;
`;

const PageBottom = styled.div`
  height: 25%;
`;

function Analysis() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const graphZoneRef = useRef();

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

  useEffect(() => {
    const graphZoneElement = graphZoneRef.current;
    const width = graphZoneElement.offsetWidth;
    const height = graphZoneElement.offsetHeight;

    console.log(width);
    console.log(height);
  }, []);

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
            <div style={{ display: "flex", width: "30%" }}>
              <div
                style={{
                  width: "25%",
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
                  width: "75%",
                  fontSize: "23px",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "16px", marginRight: "5px" }}>총</span>
                219,200원
              </div>
            </div>
            <GraphZone>
              <PieGraph alt="원형그래프" />
              <PieGraphList alt="그래프리스트" />
            </GraphZone>
          </Expenditure>
          <Earnings>
            <div style={{ display: "flex", width: "30%" }}>
              <div
                style={{
                  width: "25%",
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
                  width: "75%",
                  fontSize: "23px",
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "16px", marginRight: "5px" }}>총</span>
                219,200원
              </div>
            </div>
            <GraphZone ref={graphZoneRef}>
              <PieGraph alt="원형그래프" />
              <PieGraphList alt="그래프리스트" />
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
          <MiddleRightBottomWrap>123</MiddleRightBottomWrap>
        </MiddleRight>
      </PageMiddle>
      <PageBottom>Bottom</PageBottom>
    </PageWrap>
  );
}

export default Analysis;
