import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import "./styles/LoginPage.css"

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsLoading(false);
        navigate('/admin');

      } else {
        const ErrorMessage = await response.json();
        setIsLoading(false);
        setError(ErrorMessage.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsLoading(false);
    }
  };

  return (
    <div id="containerLogin">
      <Row style={{ height: '100%' }}>
        <Col xs={12} sm={8}>
          <img
            src="../public/assets/images/loginSideImage.png"
            width="100%"
            height="100%"
            style={{ objectFit: 'cover' }}
            alt="Login Side Image"
          />
        </Col>
        <Col xs={12} sm={4} className="align-self-center px-5">
          {isLoading ?
            <Spinner animation="border" /> : 
            <>
                <div className="icon-Header" style={{ width: '100px' }}></div>
                <h1 className="fw-bolder fs-4 py-4">Welcome, Admin BCR</h1>
                {error && <p className="text-danger">{error}</p>}
                <Form className="py-4" onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" className="btn btn-first py-2" style={{ width: '100%' }}>
                    Sign in
                  </Button>
                </Form>
            </>
          }
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
