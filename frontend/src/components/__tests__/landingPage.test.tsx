import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import LandingPage from '../../landingPage';
import { BrowserRouter } from 'react-router-dom'
jest.mock('../../styles/Style.css', () => ({}));
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

describe('<LandingPage />', () => {
  test('renders all child components', () => {
    render(<BrowserRouter>
            <LandingPage />
        </BrowserRouter>);

    expect(screen.getByTestId('heroContent')).toBeInTheDocument();
    expect(screen.getByTestId('ourServiceContent')).toBeInTheDocument();
    expect(screen.getByTestId('whyUsContent')).toBeInTheDocument();
    expect(screen.getByTestId('testimonialContent')).toBeInTheDocument();
    expect(screen.getByTestId('CTAContent')).toBeInTheDocument();
    expect(screen.getByTestId('FAQContent')).toBeInTheDocument();
  });
});
