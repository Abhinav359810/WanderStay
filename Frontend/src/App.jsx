import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Routes,Route } from "react-router-dom";
import Index from "./pages/Index";
import Show from "./pages/show";
import NewForm from "./pages/NewForm";
import Editform from "./pages/Editform";

function App() {
    return(
      <>
      <h2>This is navbar</h2>

      {/* creating Routes container */}
      <Routes>
        <Route path = '/listings' element={<Index/>}/>
        <Route path = '/listings/new' element = {<NewForm/>}/>
        <Route path = '/listings/:id' element={<Show/>}/>
        <Route path = '/listings/:id/edit' element={<Editform/>}/>
      </Routes>

      <h2>This is footer</h2>
      </>
    );
};
export default App;