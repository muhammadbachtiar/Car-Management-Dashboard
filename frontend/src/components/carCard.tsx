import React from 'react';
import { Card } from 'react-bootstrap';

interface CarCardProps {
  id: string;
  image: string;
  name: string;
  description: string;   
  type: string;
  rentPerDay: number;
  capacity: number;
  transmission: string;
  year: number;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  image,
  name,
  description,
  type,
  rentPerDay,
  capacity,
  transmission,
  year,
}) => {
  return (
    <div className="col-12 col-md-6 col-xl-4 my-1" id={id}>
      <Card style={{ height: '100%', marginBottom: 0 }}>
        <Card.Body>
          <Card.Img src={image} className="card-img" alt="Car Image" height="222px" />
          <Card.Title className="fs-6 fw-normal my-3">{name} / {type}</Card.Title>
          <Card.Title className="card-title fs-5 fw-bolder">Rp {rentPerDay.toLocaleString('id-ID')} / hari</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <ul id="carDescription-nav">
            <li className="list-group-item d-flex justify-content-star align-items-center">
              <span className="badgeWhite"><i className="fa-solid fa-user-group"></i></span> {capacity} Orang
            </li>
            <li className="list-group-item d-flex justify-content-star align-items-center">
              <span className="badgeWhite"><i className="fa-solid fa-gear"></i></span> {transmission}
            </li>
            <li className="list-group-item d-flex justify-content-star align-items-center">
              <span className="badgeWhite"><i className="fa-regular fa-calendar"></i></span> Tahun {year}
            </li>
          </ul>
          <button type="button" id="btn-chooseCar" className="btn btn-choose" >
            Pilih Mobil
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CarCard;
