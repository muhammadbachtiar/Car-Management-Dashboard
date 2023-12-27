
import CarsManagementDasboard from "./components/carsManagementContentAdmin";
import HeaderAdmin from "./components/headerAdmin";
import SidebarAdmin from "./components/sidebarAdmin";
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from "react";

import "./styles/SidebarAdmin.css"
import "./styles/ListCarManagement.css"

interface Car {
    id: string;
    name: string;
    type: string;
    rent_per_day: number;
    image_url: string;
    available_at: string;
    time_updated: string;
  }
  

const CarsListManagementPage: React.FC = () => {
    const [carsData, setCarsData] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
          return;
        }

        const response = await fetch('https://car-rental-app-weathered-tree-7075.fly.dev/api/v1/cars');

        if (response.ok) {
          const data = await response.json();
          setCarsData(data.data);
        } else {
          console.error('Error fetching cars data:', response.status);
          setError("Error fetching cars data");
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setError("Error fetching cars data");
      } finally {
        setLoading(false);
      }
    };

    fetchCarsData();
  }, [navigate]);

    return (
        <div className="d-flex" id="wrapper">
            {loading ?
            <Spinner animation="border" data-testid="loading-spinner"/> : 
                <>
                    <SidebarAdmin/>
                    <div id="page-content-wrapper">
                        <HeaderAdmin/>
                        <CarsManagementDasboard carsData={carsData}/>
                        {error && <p className="text-danger">{error}</p>}
                    </div>
                </>
            }
        </div>
    );
}

export default CarsListManagementPage