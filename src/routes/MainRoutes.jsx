import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
import { Dashboard } from '../pages/Dashboard/Dashboard';

function MainRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes