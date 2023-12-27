import { Container, Row, Col, Nav } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="my-4">
      <Container>
        <Row className="justify-content-around px-3">
          <Col md={4} px-lg-5="true">
            <p className="card-text my-2 fs-6">Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
            <p className="card-text my-2 fs-6">binarcarrental@gmail.com</p>
            <p className="card-text my-2 fs-6">081-233-334-808</p>
          </Col>
          <Col md={2}>
            <Nav className="flex-column footer-partAnchor fw-medium">
              <Nav.Link className="list my-1" href="#item-1-1">
                Our Service
              </Nav.Link>
              <Nav.Link className="list my-1" href="#item-1-2">
                Why Us
              </Nav.Link>
              <Nav.Link className="list my-1" href="#item-1-2">
                Testimonial
              </Nav.Link>
              <Nav.Link className="list my-1" href="#item-1-2">
                FAQ
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <p className="card-text">Connect with us</p>
            <Row className="footer-Contact">
              <Col className="col-2">
                <a href="#">
                  <span className="footer-Contact--badge">
                    <i className="fa-brands fa-facebook-f"></i>
                  </span>
                </a>
              </Col>
              <Col className="col-2">
                <a href="#">
                  <span className="footer-Contact--badge">
                    <i className="fa-brands fa-instagram"></i>
                  </span>
                </a>
              </Col>
              <Col className="col-2">
                <a href="#">
                  <span className="footer-Contact--badge">
                    <i className="fa-brands fa-twitter"></i>
                  </span>
                </a>
              </Col>
              <Col className="col-2">
                <Link to="/admin">
                  <span className="footer-Contact--badge">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                </Link>
              </Col>
              <Col className="col-2">
                <Link to="/login">
                  <span className="footer-Contact--badge">
                    <i className="fa-brands fa-twitch"></i>
                  </span>
                </Link>
              </Col>
            </Row>
          </Col>
          <Col md={2}>
            <p className="card-text my-2">Copyright Binar 2022</p>
            <Row>
              <Col lg={8} className="col-4">
                <div className="icon-Footer"></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;