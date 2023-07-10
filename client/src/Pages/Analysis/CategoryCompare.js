import React from "react";
import styled from "styled-components";
import CategoryCompageDetail from "./CategoryCompageDetail";
const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
`;

function CategoryCompare({ spendData, lastmonthData }) {
  const curmonth = spendData;
  const prevmonth = lastmonthData;

  // 카테고리 종류
  const categoryarr = [
    ...new Set(
      curmonth.map((it) => {
        return it.category;
      })
    ),
  ];

  const curmonthByCategory = curmonth.reduce((result, item) => {
    if (result[item.category]) {
      result[item.category] += item.amount;
    } else {
      result[item.category] = item.amount;
    }
    return result;
  }, {});
  return (
    <Wrap>
      {categoryarr.map((it) => {
        const categoryamount = curmonthByCategory[it];
        return <CategoryCompageDetail categoryamount={categoryamount} />;
      })}
    </Wrap>
  );
}

export default CategoryCompare;
