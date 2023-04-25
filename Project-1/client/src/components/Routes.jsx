import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";

const Routing = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;