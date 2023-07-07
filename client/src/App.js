import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Analysis from "./Pages/Analysis/Analysis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element="홈화면"></Route>
        <Route path="/login" element="로그인"></Route>
        <Route path="/signup" element="회원가입"></Route>
        <Route path="/accountbook" element="가계부"></Route>
        <Route path="/analysis" element={<Analysis />}></Route>
        <Route path="/wishList" element="위시리스트"></Route>
        <Route path="/premium" element="프리미엄"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// 스타일,리덕스,라우터
