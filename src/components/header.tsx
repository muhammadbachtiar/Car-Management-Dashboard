import { Container, Row, Col, Nav } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';

function HeaderMenu() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div className="fixed-header">
      <Container>
        <Row className="heroContent-Head justify-content-around">
          <Col md={1} xs={3} className="icon-Header">
            <a href="#heroContent" className="d-block">
            </a>
          </Col>
          <Col md={10} xs={6}>
            <div className="hamburger-menu" onClick={handleShow}>
      
              <i className="fa-solid fa-bars"></i>

            </div>
            <div className="responsive-MenuDesktop">
              <Nav className="justify-content-md-end justify-content-start Menu">
                <Nav.Item className="Container-colse-button">
                  <Row className="align-self-center p-3">
                    <h3>BCR</h3>
                  </Row>
                  <Row className="close-button align-self-center text-end">
                    <i className="fa-solid fa-xmark"></i>
                  </Row>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#ourServiceContent">Our Service</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#whyUsContent">Why Us</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#testimonialContent">Testimonial</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#FAQContent">FAQ</Nav.Link>
                </Nav.Item>
                <Nav.Link href="#" id="Menu-registerbtn" >Register</Nav.Link>
              </Nav>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <Offcanvas show={show} placement="end" onHide={handleClose}  style={{ backgroundColor: '#F1F3FF', width: '45%' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h3>BCR</h3></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-md-end justify-content-start Menu">
            <Nav.Item>
              <Nav.Link href="#ourServiceContent">Our Service</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#whyUsContent">Why Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#testimonialContent">Testimonial</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#FAQContent">FAQ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link id="Menu-registerbtn" href="#">
                Register
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default HeaderMenu;

