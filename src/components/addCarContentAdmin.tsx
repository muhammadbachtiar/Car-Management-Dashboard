import { Breadcrumb, Col, Form, Button, Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


const AddNewCarContent: React.FC = () => {

  const [name, setName] = useState('');
  const [rentPerDay, setRentPerDay] = useState<number>();
  const [type, setType] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [transmission, setTransmission] = useState('');
  const [available_at, setAvailable_at] = useState('');
  const [year, setYear] = useState('');
  const [isWithDriver, setIsWithDriver] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('rentPerDay', String(rentPerDay));
    formData.append('type', type);
    formData.append('description', description);
    formData.append('capacity', capacity);
    formData.append('transmission', transmission);
    formData.append('available_at', available_at);
    formData.append('year', year);
    formData.append('isWithDriver', String(isWithDriver));
    
    if (image) {
      formData.append('image', image);
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
          return;
        }

      const response = await fetch('http://localhost:3000/api/v1/cars', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsLoading(false);
        navigate('/admin');
      } else {
        setIsLoading(false);
        console.error('Failed to add car:', response.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error during car addition:', error);
    }
  };

  return (
    <div className="container" style={{ minWidth: '98%' }}>
      {isLoading ?
            <Spinner animation="border" /> : 
            <>
              <Row className="justify-content-start my-4">
            <Col xs={12} className="align-self-center">
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Cars</Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/admin">List Cars</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Add Cars</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
      </Row>
      <div className="row justify-content-between my-4">
        <div className="col-12">
          <h1 className="fs-4 fw-semibold align-self-center">Add New Car</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Card>
            <Card.Body className="col-12 col-md-7 col-xl-5">
              <Form method="POST" id="carForm" encType="multipart/form-data" onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={3}>
                    Nama
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type="text" id="name" name="name" placeholder="Nama" required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={3}>
                    Sewa Per Hari
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type="number" id="rentPerDay" name="rentPerDay" placeholder="Sewa Per Hari" required 
                      value={rentPerDay}
                      onChange={(e) => setRentPerDay(Number(e.target.value))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={3}>
                    Ukuran
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type="text" id="type" name="type" placeholder="Tipe" required 
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={3}>
                    Foto
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type="file" id="image" name="image" placeholder="Foto" required 
                      onChange={(e) => setImage((e.target as HTMLInputElement).files?.[0] || null)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={3}>
                    Driver
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Check
                      type="radio" id="withDriver" name="withDriver" label="Ya" checked={isWithDriver} onChange={() => setIsWithDriver(true)}
                    />
                    <Form.Check
                      type="radio" id="withoutDriver" name="withDriver" label="Tidak" checked={!isWithDriver} onChange={() => setIsWithDriver(false)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={3}>
                    Description
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control as="textarea" id="description" name="description" placeholder="Description" required value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={3}>
                    Capacity
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type="text" id="capacity" name="capacity" placeholder="Capacity" required 
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={4}>
                    Transmission
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select id="transmission" name="transmission" value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={3}>
                    Available At
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type="date" id="available_at" name="available_at" placeholder="Available at" required value={available_at} onChange={(e) => setAvailable_at(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3 row">
                  <Form.Label column sm={3}>
                    Year
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type="number" id="year"name="year"placeholder="Year" required value={year} onChange={(e) => setYear(e.target.value)} min="1900" max="2100" />
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

export default AddNewCarContent;
