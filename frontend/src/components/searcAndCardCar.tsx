import { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button} from 'react-bootstrap';
import CarCard from './carCard';
import React from 'react';

interface Car {
  id: string;
  image_url: string;
  name: string;
  description: string;
  type: string;
  rent_per_day: number;
  capacity: number;
  transmission: string;
  year: number;
  isWithDriver: boolean;
  available_at: string;
}

function SearchCarAndCardCar() {
  const [carData, setCarData] = useState<Car[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState({
    tipeDriver: '',
    tanggal: '',
    waktu: '',
    jumlahPenumpang: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isSearching) {
          const response = await fetch('https://car-rental-app-weathered-tree-7075.fly.dev/api/v1/cars');
          const data = await response.json();
          setCarData(data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isSearching]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dateString = searchParams.tanggal;
    const timeString = searchParams.waktu;
  
    const searchTime = new Date(`${dateString}T${timeString}Z`);

    const filteredCars = carData.filter((car) => {
      const carAvailableAt = new Date(car.available_at);
      return (
        (searchParams.tipeDriver === '' || car.isWithDriver.toString() === searchParams.tipeDriver) &&
        (dateString === '' || searchTime < carAvailableAt) &&
        (searchParams.jumlahPenumpang === '' || car.capacity >= Number(searchParams.jumlahPenumpang))
      );
    });
  
    setCarData(filteredCars);
    setIsSearching(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setSearchParams((prevSearchParams) => ({ ...prevSearchParams, [id]: value }));
  };

  const handleEditFinish = () => {
    setIsSearching(false);
  };
  

  return (
    <>
      <section>
        <Container style={{ width: '80%' }}>
          <div className="my-3">
            <Card className="findCarCard">
              <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Row className="justify-content-around">
                  <Col>
                      <Form.Group controlId="tipeDriver">
                          <Form.Label>Tipe Driver</Form.Label>
                          <Form.Control as="select" required value={searchParams.tipeDriver} onChange={handleInputChange} disabled={isSearching}>
                              <option disabled selected>Pilih Tipe Driver</option>
                              <option value="true">Dengan Sopir</option>
                              <option value="false">Tanpa Sopir (Lepas Kunci)</option>
                          </Form.Control>
                      </Form.Group>
                  </Col>
                  <Col xs={12} xl={2}>
                      <Form.Group controlId="tanggal">
                          <Form.Label>Tanggal</Form.Label>
                          <Form.Control type="date" required value={searchParams.tanggal} onChange={handleInputChange} disabled={isSearching}/>
                      </Form.Group>
                  </Col>
                  <Col xs={12} xl={2}>
                      <Form.Group controlId="waktu">
                          <Form.Label>Waktu Jemput/Ambil</Form.Label>
                          <Form.Control type="time" required value={searchParams.waktu} onChange={handleInputChange} disabled={isSearching} />
                      </Form.Group>
                  </Col>
                  <Col xs={12} xl={3}>
                      <Form.Group controlId="jumlahPenumpang">
                          <Form.Label>Jumlah Penumpang (optional)</Form.Label>
                          <Form.Control type="number" min="1" placeholder="Jumlah Penumpang" value={searchParams.jumlahPenumpang} onChange={handleInputChange}  disabled={isSearching}/>
                      </Form.Group>
                  </Col>
                  <Col xs={12} xl={2} className="align-self-end">
                    <Button type="submit" className="btn-startRent" id="searchCarBtn" style={{ display: isSearching ? 'none' : 'inline-block' }}>
                      Cari Mobil
                    </Button>
                    <Button className="btn-second" id="editBtn" style={{ display: isSearching ? 'inline-block' : 'none' }} onClick={handleEditFinish}>
                      Edit
                    </Button>
                  </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </section>
      <div className="container my-2" style={{width: '80%'}}>
            <div className="row">
            {carData.map((car: Car) => (
                <CarCard
                key={car.id}
                id={car.id}
                image={car.image_url}
                name={car.name}
                description={car.description}
                type={car.type}
                rentPerDay={car.rent_per_day}
                capacity={car.capacity}
                transmission={car.transmission}
                year={car.year}
                />
            ))}
            </div>
          </div>
    </>
  );
}

export default SearchCarAndCardCar;
