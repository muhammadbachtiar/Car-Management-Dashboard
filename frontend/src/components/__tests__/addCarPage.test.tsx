import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCarPageAdmin from '../../addCarPage';
import { BrowserRouter } from 'react-router-dom'

jest.mock('../../styles/SidebarAdmin.css', () => ({}));
jest.mock('../../styles/ListCarManagement.css', () => ({}));
  

describe('<AddCarPageAdmin />', () => {
  test('renders the form correctly', () => {
    render(<BrowserRouter>
            <AddCarPageAdmin/>
        </BrowserRouter>);
    
    expect(screen.getByText('Add New Car')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Nama')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Sewa Per Hari')).toBeInTheDocument();

    expect(screen.getByLabelText('Ukuran')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tipe')).toBeInTheDocument();

    expect(screen.getByLabelText('Foto')).toBeInTheDocument();

    expect(screen.getByLabelText('Driver')).toBeInTheDocument();
    expect(screen.getByLabelText('Ya')).toBeInTheDocument();
    expect(screen.getByLabelText('Tidak')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Capacity')).toBeInTheDocument();

    expect(screen.getByLabelText('Transmission')).toBeInTheDocument();
    expect(screen.getByText('Manual')).toBeInTheDocument();
    expect(screen.getByText('Automatic')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Available at')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Year')).toBeInTheDocument();

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

//   test('handles form submission', async () => {
//     render(
//       <BrowserRouter>
//         <AddCarPageAdmin />
//       </BrowserRouter>
//     );



//     fireEvent.change(screen.getByPlaceholderText('Nama'), { target: { value: 'Test Car' } });
//     fireEvent.change(screen.getByPlaceholderText('Sewa Per Hari'), { target: { value: '10000' } });
//     fireEvent.change(screen.getByPlaceholderText('Tipe'), { target: { value: 'Sedan' } });

//     const file = new File(['test-image'], 'test-image.png', { type: 'image/png' });
//     fireEvent.change(screen.getByPlaceholderText('Foto'), { target: { files: [file] } });

//     fireEvent.click(screen.getByLabelText('Ya'));

//     fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Description test' } });

//     fireEvent.change(screen.getByPlaceholderText('Capacity'), { target: { value: '5' } });

//     fireEvent.change(screen.getByLabelText('Transmission'), { target: { value: 'Manual' } });

//     fireEvent.change(screen.getByPlaceholderText('Available at'), { target: { value: '2023-12-20' } });

//     fireEvent.change(screen.getByPlaceholderText('Year'), { target: { value: '2023' } });

//     fireEvent.click(screen.getByText('Save'));

//   });
});
