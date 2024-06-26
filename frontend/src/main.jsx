import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Vols from './pages/vols/Vols1.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Login from './pages/auth/Login.jsx';
import {AuthContextProvaider}  from './context/AuthContext';
import Hotels from "./pages/hotels/Hotels.jsx";
import Maps from "./pages/maps/Maps.jsx";
import AllMaps from './components/allMaps/AllMaps.jsx';
import NoPage from "./pages/NoPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    <Route path="/vols" element={<Vols />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path='/hotels' element={<Hotels />} />
    <Route path='/maps' element={<Maps />} />
    <Route path='/allMaps' element={<AllMaps />} />
    <Route path="*" element={<NoPage />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvaider>
    <RouterProvider router={router} />
    </AuthContextProvaider>
  </React.StrictMode>
);
