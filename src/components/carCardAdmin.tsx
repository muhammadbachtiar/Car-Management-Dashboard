import {useState} from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

interface CarCardProps {
  id: string;
  image: string;
  name: string;
  type: string;
  rentPerDay: number;
  available_at: string
  timeUpdate: string;
}

const CarCard: React.FC<CarCardProps> = ({ id, image, name, type, rentPerDay,  available_at, timeUpdate }) => {
  const navigate = useNavigate();

  const [deleteCarId, setDeleteCarId] = useState<string | null>(null);

  const [show, setShow] = useState(false);

  const openDeleteModal = (carId: string) => {
    setDeleteCarId(carId);
    setShow(true);
  };
  
  const closeDeleteModal = () => {
    setDeleteCarId(null);
    setShow(false);
  };

  const handleDeleteCar = async (carId: string | null) => {
    if (!carId) {
      console.error('Car ID is missing.');
      return;
    }
  
    try {

      const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
          return;
        }

      const response = await fetch(`http://localhost:3000/api/v1/cars/${carId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        console.log(`Car with ID ${carId} deleted successfully.`);
        window.location.reload();
      } else {
        console.error('Failed to delete car:', response.statusText);
      }
    } catch (error) {
      console.error('Error during car deletion:', error);
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="col-12 col-md-6 col-xl-4 my-1" id={id}>
      <Card>
        <Card.Body className="m-3">
          <Card.Img src={image} alt="Car Image" height="222px" />
          <Card.Title className="fs-6 fw-normal fs-6 fw-medium my-3">
            {name} / {type}
          </Card.Title>
          <Card.Title className="fs-5 fw-bolder">Rp. {rentPerDay.toLocaleString('id-ID')} / hari</Card.Title>
          <ul id="carDescription-nav" className="p-0">
            <li className="list-group-item d-flex justify-content-star align-items-center">
              <span className="badgeWhite">
                <i className="fa-solid fa-key"></i>
              </span>{' '}
              Available At {new Date(available_at).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </li>
            <li className="list-group-item d-flex justify-content-star align-items-center">
              <span className="badgeWhite">
                <i className="fa-regular fa-clock"></i>
              </span>{' '}
              Updated At {new Date(timeUpdate).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </li>
          </ul>
          <div className="row my-1">
            <div className="col-6">
              <Button variant="delete" id={`btn-chooseCar-${id}`} data-bs-toggle="modal" onClick={() => openDeleteModal(id)}>
                <i className="fa-solid fa-trash me-2"></i>
                <b>Delete</b>
              </Button>
            </div>
            <div className="col-6">
              <Link to={`/admin/editCar/${id}`}>
                <Button variant="edit" id={`btn-chooseCar-${id}`}>
                  <i className="fa-solid fa-pen-to-square me-2"></i>
                  <b>Edit</b>
                </Button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={closeDeleteModal} backdrop="static" keyboard={false}>
      <Modal.Body>
        <div className="container mx-auto text-center" style={{ width: '320px' }}>
          <img src="http://res.cloudinary.com/dwprvigp0/image/upload/v1699603002/btibvajbj5fisee2kgg4.png" className="card-img" alt="Car Image" height="222px" />
          <h5 className="modal-title text-center" id="exampleModalLabel">
            Menghapus Data Mobil
          </h5>
          <p className="text-center">
            Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?
          </p>
          <div className="row my-1 justify-content-center">
            <div className="col-6 ">
              <Button variant="first" onClick={() => handleDeleteCar(deleteCarId)}>
                Ya
              </Button>
            </div>
            <div className="col-6">
              <Button variant="second" onClick={closeDeleteModal}>
                Tidak
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    </div>
  );
};

export default CarCard;
