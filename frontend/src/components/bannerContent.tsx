import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface BannerContentProps {
  showStartRentButton: boolean;
}


const BannerContent: React.FC<BannerContentProps> = ({showStartRentButton}) => {
  return (
    <div className="col-12 heroContent-Content" id="heroContent-Content">
      <Row className="justify-content-between align-items-center">
        <Col lg={5} py={3} id="heroContent-Content--text">
          <h3 className="text-start fw-bolder heroContent-Content--text-h3">
            Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)
          </h3>
          <p className="text-start">
            Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
          </p>
          {showStartRentButton && (
            <Link to="/cars">  
              <Button type="button" className="btn-startRent" id="btn-startRent">
                Mulai Sewa Mobil
              </Button>
            </Link>
          )}
        </Col>
        <Col lg={7} className="heroContent-Content--img">
          <img
            src="/assets/images/Mercedes Car EQC 300kW Edition - 900x598 1 (1).png"
            className="rounded float-end float-md-none"
            alt="..."
            id="heroContent-imageCarContent"
          />
        </Col>
      </Row>
    </div>
  );
}

export default BannerContent;
