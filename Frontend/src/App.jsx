import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Routes,Route } from "react-router-dom";
import Index from "./pages/Index";
import Show from "./pages/Show.jsx";
import NewForm from "./pages/NewForm";
import Editform from "./pages/Editform";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    return(
      <>
      <Navbar/>

      {/* creating Routes container */}
      <div className="container">
      <Routes>
        <Route path = '/listings' element={<Index/>}/>
        <Route path = '/listings/new' element = {<NewForm/>}/>
        <Route path = '/listings/:id' element={<Show/>}/>
        <Route path = '/listings/:id/edit' element={<Editform/>}/>
      </Routes>
      </div>

      <Footer/>
      </>
    );
};
export default App;