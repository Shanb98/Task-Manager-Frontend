import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Registration from "./pages/Registration";


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="Home" element={<Home/>}/>
      <Route path="Registration" element={<Registration/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
