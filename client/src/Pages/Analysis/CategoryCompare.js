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
  const categoryarr1 = [
    ...new Set(
      curmonth.map((it) => {
        return it.category;
      })
    ),
  ];
  const categoryarr2 = [
    ...new Set(
      prevmonth.map((it) => {
        return it.category;
      })
    ),
  ];

  const categoryarr = Array.from(new Set([...categoryarr1, ...categoryarr2]));

  // 이번달의 카테고리별 총 사용금액
  const curmonthByCategory = curmonth.reduce((result, item) => {
    if (result[item.category]) {
      result[item.category] += item.amount;
    } else {
      result[item.category] = item.amount;
    }
    return result;
  }, {});

  // 지난달의 카테고리별 총 사용금액
  const lastmonthBycategory = prevmonth.reduce((result, item) => {
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
        const categoryamount = curmonthByCategory[it]
          ? curmonthByCategory[it]
          : 0;
        const lastmonthcategoryamount = lastmonthBycategory[it]
          ? lastmonthBycategory[it]
          : 0;
        return (
          <CategoryCompageDetail
            categoryamount={categoryamount}
            lastmonthcategoryamount={lastmonthcategoryamount}
            category={it}
          />
        );
      })}
    </Wrap>
  );
}

export default CategoryCompare;
