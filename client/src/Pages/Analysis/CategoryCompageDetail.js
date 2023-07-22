import React from "react";
import styled from "styled-components";
import Palette from "../../Palette/Palette.jsx";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
  > p {
    font-size: 13px;
  }
`;
const Graph = styled.div`
  width: 75%;
  max-height: 21px;
  display: flex;
  justify-content: center;
`;
const LeftWrap = styled.div`
  display: flex;
  justify-content: right;
  width: 40%;
`;
const RightWrap = styled.div`
  display: flex;
  justify-content: left;
  width: 60%;
`;
const GraphLeft = styled.div`
  display: flex;
  justify-content: right;
  background: linear-gradient(to left, rgba(100,100,100,1), rgba(100,100,100,0.5));
  border-right: 1px solid rgb(210, 210, 210);
  border-radius: 4px 0px 0px 4px;
  width: ${(props) => `${props.length}%`};
  height: 12px;
`;
const GraphRight = styled.div`
  display: flex;
  justify-content: left;
  background-color: ${(props) => props.color};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: ${(props) => `${props.length}%`};
  max-width: 65%;
  height: 12px;
  margin-right: 10px;
`;
const Money = styled.p`
  color: rgb(160, 160, 160);
  font-size: 13px;
  width: 100px;
  height: 100%;
  line-height: 21px;
`;
const ListDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 10px;
`;
function CategoryCompageDetail({
  categoryamount,
  lastmonthcategoryamount,
  category,
  lastmonthcategoryamountArr,
  categoryamountArr,
}) {
  const interval = categoryamount - lastmonthcategoryamount; // 이전달과 지난달의 차이
  const monthsum = categoryamount + lastmonthcategoryamount; // 이전달과 지난달의 합
  
  const combineCategory = [...lastmonthcategoryamountArr,...categoryamountArr]
  const maxValue = Math.max(...combineCategory); //이번달 지날달 모두 합친 배열의 최대값

  const curPercent = (categoryamount / (maxValue - (maxValue * 0.7))) * 100; // 현재 달 %
  const prevPercent = (lastmonthcategoryamount / (maxValue - (maxValue * 0.75))) * 100; // 지난 달 %


  return (
    <Wrap>
      <Title>
        <ListDot color={Palette[category]} />
        <p>{category}</p>
      </Title>
      <Graph>
        <LeftWrap>
          <GraphLeft length={prevPercent} />
        </LeftWrap>
        <RightWrap>
          <GraphRight color={Palette[category]} length={curPercent} />
          <Money>
            {interval > 0 ? "+" : null}
            {interval}원
          </Money>
        </RightWrap>
      </Graph>
    </Wrap>
  );
}

export default CategoryCompageDetail;
