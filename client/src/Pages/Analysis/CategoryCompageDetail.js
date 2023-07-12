import React from "react";
import styled from "styled-components";
import Palette from "../../Palette/Palette.jsx";

const Wrap = styled.div`
  display: flex;
  width: 100%;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
`;
const Graph = styled.div`
  width: 60%;
  max-height: 21px;
  display: flex;
  justify-content: center;
`;
const LeftWrap = styled.div`
  display: flex;
  justify-content: right;
  width: 50%;
`;
const RightWrap = styled.div`
  display: flex;
  justify-content: left;
  width: 50%;
`;
const GraphLeft = styled.div`
  display: flex;
  justify-content: right;
  background-color: rgb(95, 95, 95);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  width: ${(props) => `${props.length}%`};
  height: 100%;
`;
const GraphRight = styled.div`
  display: flex;
  justify-content: left;
  background-color: ${(props) => props.color};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: ${(props) => `${props.length - 10}%`};
  height: 100%;
  margin-right: 5px;
`;
const Money = styled.p`
  color: white;
  font-size: 13px;
  width: 100px;
  height: 100%;
  line-height: 21px;
`;
const ListDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 10px;
`;
function CategoryCompageDetail({
  categoryamount,
  lastmonthcategoryamount,
  category,
}) {
  const interval = categoryamount - lastmonthcategoryamount; // 이전달과 지난달의 차이
  const monthsum = categoryamount + lastmonthcategoryamount; // 이전달과 지난달의 합
  const curPercent = (categoryamount / monthsum) * 100; // 현재 달 %
  const prevPercent = (lastmonthcategoryamount / monthsum) * 100; // 지난 달 %
  return (
    <Wrap>
      <Title>
        <ListDot color={Palette[category]} />
        <p style={{ color: Palette[category] }}>{category}</p>
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
