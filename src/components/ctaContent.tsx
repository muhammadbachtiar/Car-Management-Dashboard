import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CTAContent = () => {
  return (
    <section className="CTAContent">
      <Container>
        <Row className="CTAContent-Content justify-content-center text-center">
          <Col md={12}>
            <Row className="px-2">
              <Col md={12}>
                <h3 className="card-title fw-bolder px-5 fs-2">Sewa Mobil di (Lokasimu) Sekarang</h3>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Link to='/cars'>
                <Button variant="startRent" id="btn-startRent" className="btn btn-startRent">Mulai Sewa Mobil</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CTAContent;