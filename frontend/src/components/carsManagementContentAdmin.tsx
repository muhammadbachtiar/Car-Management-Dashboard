import { Breadcrumb, Container, Row, Col,  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarCard from './carCardAdmin';
import React from 'react';

interface Car {
  id: string;
  name: string;
  type: string;
  rent_per_day: number;
  image_url: string;
  available_at: string;
  time_updated: string;
}

interface CarsManagementDashboardProps {
  carsData: Car[];
}

const CarsManagementDasboard: React.FC<CarsManagementDashboardProps> = ({carsData}) => {
  return (
    <Container style={{ minWidth: '98%' }} data-testid="cars-management-dashboard">
      <Row className="justify-content-start my-4">
        <Col xs={12} className="align-self-center">
            <Breadcrumb>
                <Breadcrumb.Item href="#">Cars</Breadcrumb.Item>
                <Breadcrumb.Item active>List Cars</Breadcrumb.Item>
            </Breadcrumb>
        </Col>
      </Row>
      <Row className="justify-content-between my-4">
        <Col xs={6} md={5}>
          <h1 className="fs-4 fw-semibold align-self-center">List Car</h1>
        </Col>
        <Col xs={6} md={5} lg={3} className="align-self-center">
            <Link to="/admin/addCar" className="btn-add nav-link text-center">
                <i className="fa-solid fa-plus"></i> Add New Car
            </Link>
        </Col>
      </Row>
      <Row className="justify-content-start m-1"></Row>
      <Row>
        {carsData.map((car: Car) => (
                <CarCard
                key={car.id}
                id={car.id}
                name={car.name}
                image={car.image_url}
                type={car.type}
                rentPerDay = {car.rent_per_day}
                available_at = {car.available_at}
                timeUpdate={car.time_updated}
                />
            ))}
      </Row>
    </Container>
  );
};

export default CarsManagementDasboard;
