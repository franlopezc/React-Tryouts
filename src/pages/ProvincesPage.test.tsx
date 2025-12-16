// Tests para ProvincesPage

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProvincesPage from './ProvincesPage';

// Mock del hook useWeather
jest.mock('../hooks/useWeather', () => ({
  useWeather: jest.fn(),
}));

// Mock de los componentes
jest.mock('../components/WeatherDisplay', () => {
  return function MockWeatherDisplay() {
    return <div data-testid="weather-display">Weather Display</div>;
  };
});

jest.mock('../components/LoadingSpinner', () => {
  return function MockLoadingSpinner({ message }: { message: string }) {
    return <div data-testid="loading-spinner">{message}</div>;
  };
});

jest.mock('../components/ErrorAlert', () => {
  return function MockErrorAlert({ message }: { message: string }) {
    return <div data-testid="error-alert">{message}</div>;
  };
});

const mockUseWeather = require('../hooks/useWeather').useWeather;

describe('ProvincesPage', () => {
  beforeEach(() => {
    mockUseWeather.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });
  });

  test('renders page title and description', () => {
    render(<ProvincesPage />);
    
    expect(screen.getByText('🏛️ Clima por Provincias')).toBeInTheDocument();
    expect(screen.getByText('Selecciona una ciudad española para ver su pronóstico meteorológico')).toBeInTheDocument();
  });

  test('renders city selector', () => {
    render(<ProvincesPage />);
    
    expect(screen.getByLabelText('Seleccionar ciudad')).toBeInTheDocument();
  });

  test('shows loading spinner when loading', () => {
    mockUseWeather.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<ProvincesPage />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Cargando datos meteorológicos...')).toBeInTheDocument();
  });

  test('shows error alert when there is an error', () => {
    mockUseWeather.mockReturnValue({
      data: null,
      loading: false,
      error: { message: 'Error de conexión' },
    });

    render(<ProvincesPage />);
    
    expect(screen.getByTestId('error-alert')).toBeInTheDocument();
    expect(screen.getByText('Error de conexión')).toBeInTheDocument();
  });

  test('shows weather display when data is available', () => {
    const mockWeatherData = { address: 'Madrid', days: [] };
    mockUseWeather.mockReturnValue({
      data: mockWeatherData,
      loading: false,
      error: null,
    });

    render(<ProvincesPage />);
    
    expect(screen.getByTestId('weather-display')).toBeInTheDocument();
  });

  test('updates selected city when option is chosen', async () => {
    render(<ProvincesPage />);
    
    const select = screen.getByLabelText('Seleccionar ciudad');
    fireEvent.mouseDown(select);
    
    await waitFor(() => {
      expect(screen.getByText('Madrid')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Madrid'));
    
    // Verificar que el hook se llama con la ciudad seleccionada
    expect(mockUseWeather).toHaveBeenCalledWith('Madrid');
  });
});