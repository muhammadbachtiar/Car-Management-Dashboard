import { Nav } from 'react-bootstrap';
import React, { useEffect } from 'react';

const SidebarAdmin: React.FC = () => {

    useEffect(() => {
        const handleSidebarToggle = (event: Event) => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');

            // Menyimpan nilai sebagai string di localStorage
            localStorage.setItem('sb|sidebar-toggle', String(document.body.classList.contains('sb-sidenav-toggled')));
        };

        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', handleSidebarToggle);
        }

        return () => {
            if (sidebarToggle) {
                sidebarToggle.removeEventListener('click', handleSidebarToggle);
            }
        };
    }, []);
  return (
    <>
      <div className="border-end" id="sidebar-fix">
        <div className="sidebar-heading border-bottom">
          <Nav.Link href="/">
            <div className="icon-HeaderAdmin"></div>
          </Nav.Link>
        </div>
        <div className="list-group list-group-flush">
          <div className="list-group">
            <Nav.Link href="/" className="list-group-item list-group-item-action text-center">
              <i className="fa-solid fa-house"></i>
              <span style={{ fontSize: '10px', display: 'block' }}>Dashboard</span>
            </Nav.Link>
            <Nav.Link href="/cars" className="list-group-item list-group-item-action text-center">
              <i className="fa-solid fa-car-side"></i>
              <span style={{ fontSize: '10px', display: 'block' }}>Cars</span>
            </Nav.Link>
          </div>
        </div>
      </div>

      <div className="border-end" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom">
          <div className="icon-HeaderAdmin"></div>
        </div>
        <div className="list-group list-group-flush">
          <Nav.Link href="/" className="list-group-item list-group-item-action list-group-item-light p-3">
            CARS
          </Nav.Link>
          <Nav.Link href="/cars" className="list-group-item list-group-item-action list-group-item-light p-3">
            List Cars
          </Nav.Link>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
