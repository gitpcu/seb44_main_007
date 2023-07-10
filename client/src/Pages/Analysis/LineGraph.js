import React, { useState } from "react";
import styled from "styled-components";

const GraphWrap = styled.div`
  padding: 1%;
  width: 100%;
  height: 100%;
  display: flex;
`;
const DataWrap = styled.div`
  position: relative;
  width: 8.3%;
  height: 100%;
`;
const GraphTop = styled.div`
  height: 80%;
  width: 20px;
  background-color: rgb(25, 25, 25);
  margin: auto;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: ${(props) => props.value}px;
    left: 50%;
    height: 6px;
    width: 6px;
    background-color: red;
    border-radius: 50%;
    transform: translateX(-50%);
  }
`;
const GraphBottom = styled.div`
  border-top: 1px solid rgb(25, 25, 25);
  width: 100%;
  height: 20%;
  color: white;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LineGraph = () => {
  const [data, setData] = useState([55, 37, 35, 20, 45, 50, 40]);

  const GraphContainer = ({ value, index }) => {
    return (
      <DataWrap>
        <GraphTop value={value} />
        <GraphBottom>
          <p>22.07</p>
          <p>461,300원</p>
        </GraphBottom>
      </DataWrap>
    );
  };

  return (
    <GraphWrap>
      {data.map((value, index) => (
        <GraphContainer key={index} value={value} index={index} />
      ))}
    </GraphWrap>
  );
};

export default LineGraph;
