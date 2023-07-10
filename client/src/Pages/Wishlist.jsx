import { styled } from "styled-components";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const WishlistContainer = styled.div`
  height: 100vh;
  background-color: red;
  border: 5px solid blue;
`;

export default function Wishlist() {
  return (
    <>
      <WishlistContainer></WishlistContainer>
    </>
  );
}
