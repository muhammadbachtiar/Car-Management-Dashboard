import React from 'react';
import { render, screen } from '@testing-library/react';
import EditCarPage from '../../editCarPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../styles/SidebarAdmin.css', () => ({}));
jest.mock('../../styles/ListCarManagement.css', () => ({}));

// Mock components and modules
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'some-id' }), // Assuming a valid ID for testing purposes
  useNavigate: () => jest.fn(),
}));

// Mock the fetch API to prevent actual network calls
global.fetch = jest.fn();

describe('<EditCarPage />', () => {
  it('should render the EditCarPage component properly', async () => {
    render(
      <BrowserRouter>
        <EditCarPage />
      </BrowserRouter>
    );

    const editCarElements = screen.getAllByText('Edit Car');
    editCarElements.forEach(element => {
        expect(element).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText('Nama')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sewa Per Hari')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Foto')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Capacity')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Year')).toBeInTheDocument();

    expect(screen.getByLabelText('Nama')).toBeInTheDocument();
    expect(screen.getByLabelText('Sewa Per Hari')).toBeInTheDocument();
    expect(screen.getByLabelText('Ukuran')).toBeInTheDocument();
    expect(screen.getByLabelText('Foto')).toBeInTheDocument();
    expect(screen.getByLabelText('Driver')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Capacity')).toBeInTheDocument();
    expect(screen.getByLabelText('Transmission')).toBeInTheDocument();
    expect(screen.getByLabelText('Available At')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();
   
  });

  
});
