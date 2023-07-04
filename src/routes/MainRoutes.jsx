import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
import { Home } from "../pages/Home/Home";

function MainRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes