import React from "react";
import styled from "styled-components";

const ListUL = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: auto;
`;
const Listli = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  color: #ffffff;
  justify-content: space-between;
`;
const ListDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 10px;
`;
const ListCategory = styled.div`
  font-size: 16px;
  margin-right: 10px;
  width: 80px;
`;
const ListPercentage = styled.div`
  font-size: 16px;
`;
const ListPrice = styled.div`
  font-size: 20px;
  flex: auto;
  text-align: right;
`;

function PieGraphList() {
  const ListData = [
    { category: "식비/간식", percentage: 52, price: 108000, color: "#F4CD72" },
    { category: "의류/미용", percentage: 23, price: 52000, color: "#EF9620" },
    { category: "의료/건강", percentage: 18, price: 43200, color: "#835BA1" },
    { category: "기타", percentage: 7, price: 16000, color: "#F4CD72" },
  ];
  return (
    <ListUL>
      {ListData.map((it) => {
        return (
          <Listli>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ListDot color={it.color} />
              <ListCategory> {it.category}</ListCategory>
              <ListPercentage> {it.percentage}%</ListPercentage>
            </div>
            <ListPrice> {it.price} 원</ListPrice>
          </Listli>
        );
      })}
    </ListUL>
  );
}

export default PieGraphList;
