import React from "react";
import "./App.css";
import { BrowerRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowerRouter>
      sidebar
      <Routes>
        <Route path="/" emelent="홈화면"></Route>
        <Route path="/login" emelent="로그인"></Route>
        <Route path="/signup" emelent="회원가입"></Route>
        <Route path="/accountbook" emelent="가계부"></Route>
        <Route path="/analysis" element="소비패턴분석"></Route>
        <Route path="/wishList" element="위시리스트"></Route>
        <Route path="/premium" element="프리미엄"></Route>
      </Routes>
    </BrowerRouter>
  );
}

export default App;

// 스타일,리덕스,라우터
