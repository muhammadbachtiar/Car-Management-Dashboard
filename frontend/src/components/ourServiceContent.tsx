import { Container, Row, Col, Image} from 'react-bootstrap';
import React from 'react';

const OurServiceContent : React.FC = () => {
  return (
    <section className="ourServiceContent" id="ourServiceContent" data-testid="ourServiceContent">
      <Container>
        <Row className="justify-content-md-around justify-content-center">
          <Col lg={6} className="align-self-center ourServiceContent-Content--img">
            <Image src="/assets/images/Happy Girl - 961x1443 2.png" rounded alt="..." id="ourServiceContent-imageCarContent" />
            <div className="ourServiceContent-Content--img-additional-element"></div>
            <div className="ourServiceContent-Content--img-additional-element"></div>
            <div className="ourServiceContent-Content--img-additional-element"></div>
          </Col>
          <Col lg={6} id="ourServiceContent-Content--text">
            <Row className="gy-3">
              <Col md={12}>
                <h3 className="text-start fw-bolder">Best Car Rental for any kind of trip in (Lokasimu)!</h3>
              </Col>
              <Col md={12}>
                <p className="text-start">
                  Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga lebih murah dibandingkan yang lain, kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting, dll.
                </p>
                    <ul id="ourServiceContent-nav">
                        <li className="list-group-item d-flex justify-content-star align-items-center">
                            <span className="badge"><i className="fa-solid fa-check"></i></span> Sewa Mobil Dengan Supir di Bali 12 Jam
                        </li>
                            <li className="list-group-item d-flex justify-content-star align-items-center">
                            <span className="badge"><i className="fa-solid fa-check"></i></span> Sewa Mobil Lepas Kunci di Bali 24 Jam
                        </li>
                        <li className="list-group-item d-flex justify-content-star align-items-center">
                            <span className="badge"><i className="fa-solid fa-check"></i></span> Sewa Mobil Jangka Panjang Bulanan
                        </li>
                        <li className="list-group-item d-flex justify-content-star align-items-center">
                            <span className="badge"><i className="fa-solid fa-check"></i></span> Gratis Antar - Jemput Mobil di Bandara
                        </li>
                        <li className="list-group-item d-flex justify-content-star align-items-center">
                            <span className="badge"><i className="fa-solid fa-check"></i></span> Layanan Airport Transfer / Drop In Out
                        </li>
                    </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default OurServiceContent;
