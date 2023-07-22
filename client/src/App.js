import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Accountbook from "./Pages/accountbook";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Wishlist from "./Pages/Wishlist";
import Premium from "./Pages/Premium";
import SideNavBar from "./Components/SideNavBar";
import Analysis from "./Pages/Analysis/Analysis";
import Mypage from "./Pages/Mypage";

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
  const [isHome, setIsHome] = useState(true);
  console.log(isHome);
  return (
    <main className={isHome ? "main-home" : "main-else"}>
      <BrowserRouter>
        <SideNavBar setIsHome={setIsHome} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/accountbook" element={<Accountbook />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/wishList" element={<Wishlist />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
