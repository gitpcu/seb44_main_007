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

function CategoryCompare() {
  return (
    <Wrap>
      <CategoryCompageDetail />
      <CategoryCompageDetail />
      <CategoryCompageDetail />
      <CategoryCompageDetail />
      <CategoryCompageDetail />
      <CategoryCompageDetail />
      <CategoryCompageDetail />
      <CategoryCompageDetail />
    </Wrap>
  );
}

export default CategoryCompare;
