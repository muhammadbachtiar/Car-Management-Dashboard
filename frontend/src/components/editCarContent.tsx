import { Breadcrumb, Col, Form, Button, Card, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import React from "react";

const EditCarContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState({
    name: '',
    rentPerDay: 0,
    type: 'Small', 
    image: null as File | null,
    capacity: '',
    description: '',
    transmission: '',
    available_at: '',
    year: '',
    isWithDriver: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
          return;
        }

        const response = await fetch(`https://car-rental-app-weathered-tree-7075.fly.dev/api/v1/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCarData({
            name: data.data.name,
            rentPerDay: data.data.rent_per_day,
            type: data.data.type,
            image: null,
            capacity: data.data.capacity,
            description: data.data.description,
            transmission: data.data.transmission,
            available_at: data.data.available_at,
            year: data.data.year,
            isWithDriver: data.data.isWithDriver,
          });

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
  }, [id, navigate]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
  
      const formData = new FormData();
      formData.append('name', carData.name);
      formData.append('rentPerDay', carData.rentPerDay.toString());
      formData.append('type', carData.type);
      formData.append('capacity', carData.capacity.toString());
      formData.append('description', carData.description);
      formData.append('transmission', carData.transmission);
      formData.append('available_at', carData.available_at);
      formData.append('year', carData.year);
      formData.append('isWithDriver', String(carData.isWithDriver));

      if (carData.image) {
        formData.append('image', carData.image);
      }
  
      const response = await fetch(`https://car-rental-app-weathered-tree-7075.fly.dev/api/v1/cars/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        console.log('Car data updated successfully.');
        setLoading(false);
        navigate('/admin');
      } else {
        console.error('Failed to update car data:', response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during car data update:', error);
      setLoading(false);
    }
  };

  function formatDate(date : string) {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }
  


  return (
    <div className="container" style={{ minWidth: '98%' }}>
      {loading ?
            <Spinner animation="border" /> : 
            <>
              {error && <p className="text-danger">{error}</p>}
              <Row className="justify-content-start my-4">
                <Col xs={12} className="align-self-center">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Cars</Breadcrumb.Item>
                        <Breadcrumb.Item active><Link to="/admin">List Cars</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit Car</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
              </Row>
              <div className="row justify-content-between my-4">
                <div className="col-12">
                  <h1 className="fs-4 fw-semibold align-self-center">Edit Car</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Card>
                    <Card.Body className="col-12 col-md-7 col-xl-5">
                      <Form id="carForm" encType="multipart/form-data" onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3 row">
                          <Form.Label column sm={3} htmlFor="name">
                            Nama
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control type="text" id="name" name="name" placeholder="Nama" value={carData.name} onChange={(e) => setCarData({ ...carData, name: e.target.value })} required />
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-3 row">
                          <Form.Label column sm={3} htmlFor="rentPerDay">
                            Sewa Per Hari
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control type="number" id="rentPerDay" name="rentPerDay" placeholder="Sewa Per Hari" value={carData.rentPerDay} required onChange={(e) => setCarData({ ...carData, rentPerDay: parseInt(e.target.value, 10) || 0 })}/>
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-3 row">
                          <Form.Label column sm={3} htmlFor="type">
                            Ukuran
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control type="text" id="type" name="type" placeholder="Type" value={carData.type} onChange={(e) => setCarData({ ...carData, type: e.target.value })} required />
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-3 row">
                          <Form.Label column sm={3} htmlFor="image">
                            Foto
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Control type="file" id="image" name="image" placeholder="Foto" onChange={(e) => {
                                const inputElement = e.target as HTMLInputElement;
                                const file = inputElement?.files?.[0] || null;
                                setCarData({ ...carData, image: file });
                              }} />
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-3 row">
                          <Form.Label column sm={3} htmlFor="withDriver">
                            Driver
                          </Form.Label>
                          <Col sm={9}>
                            <Form.Check
                              type="radio" id="withDriver" name="withDriver" label="Ya" checked={carData.isWithDriver} onChange={() => setCarData({...carData, isWithDriver: true})}
                            />
                            <Form.Check
                              type="radio" id="withoutDriver" name="withDriver" label="Tidak" checked={!carData.isWithDriver} onChange={() => setCarData({...carData, isWithDriver:false})}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group className="mb-3 row">
                        <Form.Label column sm={3} htmlFor="description">
                          Description
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control as="textarea" id="description" name="description" placeholder="Description" required 
                            value={carData.description}  onChange={(e) => setCarData({ ...carData, description: e.target.value})}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-3 row">
                        <Form.Label column sm={3} htmlFor="capacity">
                          Capacity
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control type="number" id="capacity" name="capacity" placeholder="Capacity" required 
                             value={carData.capacity}  onChange={(e) => setCarData({ ...carData, capacity: e.target.value })}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-3 row">
                        <Form.Label column sm={4} htmlFor="transmission">
                          Transmission
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Select id="transmission" name="transmission"
                            value={carData.transmission}  onChange={(e) => setCarData({ ...carData, transmission: e.target.value })}
                          >
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                          </Form.Select>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mb-3 row">
                        <Form.Label column sm={3} htmlFor="available_at">
                          Available At
                        </Form.Label>
                        <Col sm={9}>
                        <Form.Control
                          type="date"
                          id="available_at"
                          name="available_at"
                          placeholder="Available at"
                          required
                          value={carData.available_at ? formatDate(carData.available_at) : ''}
                          onChange={(e) => setCarData({ ...carData, available_at: e.target.value })}
                        />
                      </Col>
                      </Form.Group>
                      <Form.Group className="mb-3 row">
                        <Form.Label column sm={3} htmlFor="year">
                          Year
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control type="number" id="year"name="year"placeholder="Year" required 
                            value={carData.year}  onChange={(e) => setCarData({ ...carData, year: e.target.value })}
                          min="1900" max="2100" />
                        </Col>
                      </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="row my-1 align-items-end" style={{ minHeight: '30vh' }}>
                <div className="col d-flex">
                  <Link to="/admin" id="btn-chooseCar" className="btn-second btn mx-1">
                    <b>Cancel</b>
                  </Link>
                  <Button type="submit" id="btn-chooseCar" form="carForm" className="btn-first btn mx-1">
                    <b>Save</b>
                  </Button>
                </div>
              </div>
            </>
        }
    </div>
  );
};

export default EditCarContent;
