import React from "react";
import styled from "styled-components";

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
  width: 80%;
  display: flex;
  justify-content: center;
`;
const GraphLeft = styled.div`
  display: flex;
  justify-content: right;
  background-color: rgb(95, 95, 95);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 10%;
`;
const GraphRight = styled.div`
  display: flex;
  justify-content: left;
  background-color: blue;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 40%;
`;
const Money = styled.div`
  color: white;
`;
const ListDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 10px;
`;
function CategoryCompageDetail() {
  //   const graphmake = (prev, next) => {
  //     let total = prev + next;
  //     const prevgraph =
  //   };
  return (
    <Wrap>
      <Title>
        <ListDot color="#FFFFFF" />
        <p style={{ color: "#ffffff" }}> 식비/간식</p>
      </Title>
      <Graph>
        <GraphLeft />
        <GraphRight />
        <Money>+20,300</Money>
      </Graph>
    </Wrap>
  );
}

export default CategoryCompageDetail;
