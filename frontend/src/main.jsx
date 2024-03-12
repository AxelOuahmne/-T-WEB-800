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
// import { AuthContextProvaider } from './context/AuthContext.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    <Route path="/vols" element={<Vols />} />
      {/* ... etc. */}
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthContextProvaider> */}
    <RouterProvider router={router} />
    {/* </AuthContextProvaider> */}
   
  </React.StrictMode>
);