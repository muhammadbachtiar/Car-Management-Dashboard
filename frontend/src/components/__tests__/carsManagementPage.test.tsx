import React from 'react';
import { render, screen } from '@testing-library/react';
import CarsListManagementPage from '../../carsManagementPage';
import CarsManagementDasboard from '../carsManagementContentAdmin';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../styles/SidebarAdmin.css', () => ({}));
jest.mock('../../styles/ListCarManagement.css', () => ({}));

describe('CarsListManagementPage Component', () => {

  test('should show tittle and button add car', async () => {

    render(<BrowserRouter><CarsListManagementPage /></BrowserRouter>);

    expect(screen.getByText('List Car')).toBeInTheDocument();
    expect(screen.getByText('Add New Car')).toBeInTheDocument();
  });

  test('renders components correctly when data is loaded', async () => {
    render(
      <BrowserRouter>
        <CarsListManagementPage />
      </BrowserRouter>
    );

    expect(screen.getByTestId('header-admin')).toBeInTheDocument();
    expect(screen.getByTestId('cars-management-dashboard')).toBeInTheDocument();
  });

  it('renders cars data correctly', () => {
    const mockCarsData = [
      {
        id: '1',
        name: 'Toyota Camry',
        type: 'Sedan',
        rent_per_day: 50,
        image_url: 'path-to-image',
        available_at: '2023-01-01',
        time_updated: '2023-01-01T12:00:00Z',
      },
    ];

    render(<BrowserRouter><CarsManagementDasboard carsData={mockCarsData} /></BrowserRouter>);


    expect(screen.getByText('Toyota Camry / Sedan')).toBeInTheDocument();
    expect(screen.getByText('Rp. 50 / hari')).toBeInTheDocument();
  });
});
