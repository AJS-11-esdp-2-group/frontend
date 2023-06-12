import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./Components/Layout/Header/Header";
import HomePage from "./Container/HomePage/HomePage";
import Goods from "./Container/Goods/Goods";
import Suppliers from "./Container/Suppliers/Suppliers";
function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<Header/>}>
                  <Route index element={<HomePage/>}/>
                  <Route path={'/goods'} element={<Goods/>}/>
                  <Route path={'/suppliers'} element={<Suppliers/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
