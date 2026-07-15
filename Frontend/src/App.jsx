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
import PageNotFound from "./components/PageNotFound.jsx";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/login.jsx";

function App() {
    return(
      <>
      <Navbar/>
      <Toaster position="top-center" />

      {/* creating Routes container */}
      <div className="container">
      <Routes>
        <Route path = '/listings' element={<Index/>}/>
        <Route path = '/listings/new' element = {<NewForm/>}/>
        <Route path = '/listings/:id' element={<Show/>}/>
        <Route path = '/listings/:id/edit' element={<Editform/>}/>
        <Route path = '/signup' element={<Signup/>}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '*' element={<PageNotFound/>}/>
      </Routes>
      </div>

      <Footer/>
      </>
    );
};
export default App;