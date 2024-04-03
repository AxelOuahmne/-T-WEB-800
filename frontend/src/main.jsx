import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Vols from './pages/vols/Vols.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Login from './pages/auth/Login.jsx';
import {AuthContextProvaider}  from './context/AuthContext';
import Hotels from "./pages/hotels/Hotels.jsx";
import Maps from "./pages/maps/Maps.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    <Route path="/vols" element={<Vols />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path='/hotels' element={<Hotels />} />
    <Route path='/maps' element={<Maps />} />
      {/* ... etc. */}
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
