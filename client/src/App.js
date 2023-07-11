import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accountbook from "./Pages/accountbook";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import SideNavBar from "./Components/SideNavBar";
import Analysis from "./Pages/Analysis/Analysis";

//dummyData
import { data } from "./InitData/data";
//redux
import { useDispatch } from "react-redux";
import { setfetchData } from "./Redux/reducers";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setfetchData(data));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <SideNavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/accountbook" element={<Accountbook />}></Route>
        <Route path="/analysis" element={<Analysis />}></Route>
        <Route path="/wishList" element="위시리스트"></Route>
        <Route path="/premium" element="프리미엄"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// 스타일,리덕스,라우터
