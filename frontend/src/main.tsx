import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import LandingPage from './landingPage'
import LoginPage from './loginPage';
import SearchCarPage from './searchCarPage';
import CarsListManagementPage from './carsManagementPage';
import AddCarPageAdmin from './addCarPage';
import EditCarPage from './editCarPage';
import PrivateRoutes from './components/privateRoutes';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cars" element={<SearchCarPage />} />
          <Route path="/admin" element={
                    <PrivateRoutes>
                      <CarsListManagementPage />
                    </PrivateRoutes>} />
          <Route path="/admin/addCar" element={<PrivateRoutes><AddCarPageAdmin /></PrivateRoutes>} />
          <Route path="/admin/editCar" element={<PrivateRoutes><EditCarPage /></PrivateRoutes>} />
          <Route path="/admin/editCar/:id" element={<PrivateRoutes><EditCarPage /></PrivateRoutes>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
)
