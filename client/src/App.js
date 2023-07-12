import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
<<<<<<< HEAD
import Accountbook from "./Accountbook/accountbook";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Wishlist from "./Pages/Wishlist";
=======
import Accountbook from "./Pages/accountbook";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
// import Wishlist from "./Pages/Wishlist";
>>>>>>> 06458ecf2f01d1a8f84ee99b66a3e09288f07d3c
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
  const [isHome, setIsHome] = useState(true)
  console.log(isHome)
  return (
    <main className={isHome ? 'main-home' : 'main-else'}>
      <BrowserRouter>
        <SideNavBar setIsHome={setIsHome} />
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/accountbook" element={<Accountbook />} />
<<<<<<< HEAD
          <Route path="/analysis" element="소비패턴분석" />
          <Route path="/wishList" element={<Wishlist />} />
=======
          <Route path="/analysis" element={<Analysis />} />
          {/* <Route path="/wishList" element={<Wishlist />} /> */}
>>>>>>> 06458ecf2f01d1a8f84ee99b66a3e09288f07d3c
          <Route path="/premium" element="프리미엄" />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
<<<<<<< HEAD
// 스타일,리덕스,라우터
=======
>>>>>>> 06458ecf2f01d1a8f84ee99b66a3e09288f07d3c
