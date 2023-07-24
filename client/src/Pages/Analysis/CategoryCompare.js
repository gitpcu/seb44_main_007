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
  const categoryOrder = ['식비_간식', '주거_통신', '교통_차량', '생활_마트', '의류_미용', '의료_건강', '교육_문화', '보험_세금', '기타지출'];
  const categoryArr = Array.from(new Set(categoryOrder));

  //지출만
  const spendDataExpend = Array.isArray(spendData) ? spendData.filter((item) => item.type === '지출') : [];
  const lastmonthDataExpend = lastmonthData.filter((item) => item.type === '지출');

  // 이번달의 카테고리별 총 사용금액
  const curmonthByCategory = spendDataExpend.reduce((result, item) => {
    if (result[item.category]) {
      result[item.category] += item.amount;
    } else {
      result[item.category] = item.amount;
    }
    return result;
  }, {});

  // 지난달의 카테고리별 총 사용금액
  const lastmonthBycategory = lastmonthDataExpend.reduce((result, item) => {
    if (result[item.category]) {
      result[item.category] += item.amount;
    } else {
      result[item.category] = item.amount;
    }
    return result;
  }, {});

  // 지난달의 카테고리별 총 사용금액 배열
  const categoryAmountMap = {};

  categoryOrder.forEach((category) => {
    categoryAmountMap[category] = 0;
  });
  lastmonthDataExpend.forEach((item) => {
    const { category, amount } = item;
    categoryAmountMap[category] += amount;
  });

  const categoryAmountArray = categoryOrder.map((category) => categoryAmountMap[category]);

  // 이번달의 카테고리별 총 사용금액 배열
  const categoryAmountMap2 = {};

  categoryOrder.forEach((category) => {
    categoryAmountMap2[category] = 0;
  });
  spendDataExpend.forEach((item) => {
    const { category, amount } = item;
    categoryAmountMap2[category] += amount;
  });

  const categoryAmountArray2 = categoryOrder.map((category) => categoryAmountMap2[category]);

  return (
    <Wrap>
      {categoryArr.map((it) => {
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
            categoryamountArr={categoryAmountArray2}
            lastmonthcategoryamountArr={categoryAmountArray}
          />
        );
      })}
    </Wrap>
  );
}

export default CategoryCompare;
