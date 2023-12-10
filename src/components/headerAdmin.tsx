import React from 'react';
import { Navbar, Container, Button, Form } from 'react-bootstrap';

const HeaderAdmin: React.FC = () => {
  return (
    <Navbar expand="lg" bg="white" className="border-bottom" style={{ padding: '12px' }}>
      <Container fluid>
        <Button id="sidebarToggle" className="btn btn-third">
          <i className="fa-solid fa-bars"></i>
        </Button>
        <div className="row justify-content-between">
          <div className="col-8">
            <div className="row justify-content-center">
              <Form className="d-flex" role="search">
                <Form.Control type="search" name="name" placeholder=" &#xF002; Search" aria-label="Search" className="form-control me-1 fontAwesome" />
                <Button type="submit" className="btn-second">
                  Search
                </Button>
              </Form>
            </div>
          </div>
          <div className="col-4 align-self-center">
            <div className="row">
              <div className="col-sm-2">
                <span className="badgeUser">
                  <i className="fa-solid fa-user"></i>
                </span>
              </div>
              <div className="col-sm-10 text-center align-self-center">
                Unis Badri <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default HeaderAdmin;
