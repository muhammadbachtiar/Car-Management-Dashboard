import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../loginPage';
import '@testing-library/jest-dom';

jest.mock('../../styles/LoginPage.css', () => ({}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // menjalankan fungsi asli dari react-router-dom
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: 'mockPath' }), // atau nilai lain yang Anda inginkan
  }));

describe('LoginPage Component', () => {
  it('renders login form correctly', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Welcome, Admin BCR')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('handles login form submission', async () => {
    render(<LoginPage />);
    
    // Mocking fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ token: 'sampleToken' }),
    });

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'sample@email.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'samplePassword' },
    });

    fireEvent.click(screen.getByText('Sign in'));

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

});
