import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import MyLocationPage from './MyLocationPage';
import { fetchWeatherData } from '../services/weatherService';

// Mock del servicio de weather
vi.mock('../services/weatherService', () => ({
  fetchWeatherData: vi.fn(),
}));

// Mock de los componentes pesados
vi.mock('../components/WeatherSummary', () => ({
  default: ({ weatherData }: any) => (
    <div data-testid="weather-summary">
      Weather for {weatherData.address}
    </div>
  ),
}));

vi.mock('../components/LoadingSpinner', () => ({
  default: ({ message }: any) => (
    <div data-testid="loading-spinner">{message}</div>
  ),
}));

const mockWeatherData = {
  address: 'Madrid, España',
  temp: 20,
  conditions: 'Clear',
  days: [
    {
      datetime: '2024-01-15',
      temp: 20,
      tempmax: 25,
      tempmin: 15,
      conditions: 'Clear',
      icon: 'clear-day',
      hours: [],
      datetimeEpoch: 1705276800,
    },
  ],
};

describe('MyLocationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial state correctly', () => {
    render(<MyLocationPage />);
    
    expect(screen.getByText('📍 Mi Localidad')).toBeInTheDocument();
    expect(screen.getByLabelText('Buscar localidad')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
    expect(screen.getByText('🔍 Busca cualquier localidad')).toBeInTheDocument();
  });

  it('allows free text input without restrictions', () => {
    render(<MyLocationPage />);
    
    const input = screen.getByLabelText('Buscar localidad');
    
    // Test various input types
    fireEvent.change(input, { target: { value: 'Madrid' } });
    expect(input).toHaveValue('Madrid');
    
    fireEvent.change(input, { target: { value: 'Calle Mayor 123, Madrid' } });
    expect(input).toHaveValue('Calle Mayor 123, Madrid');
    
    fireEvent.change(input, { target: { value: '28001 Madrid' } });
    expect(input).toHaveValue('28001 Madrid');
  });

  it('enables search button only when input has content', () => {
    render(<MyLocationPage />);
    
    const input = screen.getByLabelText('Buscar localidad');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    
    // Initially disabled
    expect(searchButton).toBeDisabled();
    
    // Enabled with content
    fireEvent.change(input, { target: { value: 'Madrid' } });
    expect(searchButton).toBeEnabled();
    
    // Disabled with empty/whitespace
    fireEvent.change(input, { target: { value: '   ' } });
    expect(searchButton).toBeDisabled();
  });

  it('searches on button click', async () => {
    const mockFetch = vi.mocked(fetchWeatherData);
    mockFetch.mockResolvedValueOnce(mockWeatherData as any);
    
    render(<MyLocationPage />);
    
    const input = screen.getByLabelText('Buscar localidad');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    
    fireEvent.change(input, { target: { value: 'Madrid' } });
    fireEvent.click(searchButton);
    
    expect(mockFetch).toHaveBeenCalledWith('Madrid');
    
    await waitFor(() => {
      expect(screen.getByTestId('weather-summary')).toBeInTheDocument();
    });
  });

  it('searches on Enter key press', async () => {
    const mockFetch = vi.mocked(fetchWeatherData);
    mockFetch.mockResolvedValueOnce(mockWeatherData as any);
    
    render(<MyLocationPage />);
    
    const input = screen.getByLabelText('Buscar localidad');
    
    fireEvent.change(input, { target: { value: 'Barcelona' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockFetch).toHaveBeenCalledWith('Barcelona');
    
    await waitFor(() => {
      expect(screen.getByTestId('weather-summary')).toBeInTheDocument();
    });
  });

  it('shows loading state during search', async () => {
    const mockFetch = vi.mocked(fetchWeatherData);
    mockFetch.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<MyLocationPage />);
    
    const input = screen.getByLabelText('Buscar localidad');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    
    fireEvent.change(input, { target: { value: 'Madrid' } });
    fireEvent.click(searchButton);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Buscando información meteorológica...')).toBeInTheDocument();
    expect(searchButton).toHaveTextContent('Buscando...');
    expect(input).toBeDisabled();
  });

  it('shows success state with weather data', async () => {
    const mockFetch = vi.mocked(fetchWeatherData);
    mockFetch.mockResolvedValueOnce(mockWeatherData as any);
    
    render(<MyLocationPage />);
    
    const input = screen.getByLabelText('Buscar localidad');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    
    fireEvent.change(input, { target: { value: 'Madrid' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('weather-summary')).toBeInTheDocument();
      expect(screen.getByText('Mostrando clima para: Madrid, España')).toBeInTheDocument();
    });
  });

  it('shows error message when location not found', async () => {
    const mockFetch = vi.mocked(fetchWeatherData);
    mockFetch.mockRejectedValueOnce(new Error('Location not found'));
    
    render(<MyLocationPage />);
    
    const input = screen.getByLabelText('Buscar localidad');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    
    fireEvent.change(input, { target: { value: 'NonExistentPlace123' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText('No se encuentra información para el domicilio introducido')).toBeInTheDocument();
    });
    
    // Error should be in an info alert
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('clears error when user starts typing after error', async () => {
    const mockFetch = vi.mocked(fetchWeatherData);
    mockFetch.mockRejectedValueOnce(new Error('Location not found'));
    
    render(<MyLocationPage />);
    
    const input = screen.getByLabelText('Buscar localidad');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    
    // Trigger error
    fireEvent.change(input, { target: { value: 'NonExistent' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText('No se encuentra información para el domicilio introducido')).toBeInTheDocument();
    });
    
    // Start typing again
    fireEvent.change(input, { target: { value: 'Madrid' } });
    
    // Error should be cleared
    expect(screen.queryByText('No se encuentra información para el domicilio introducido')).not.toBeInTheDocument();
  });

  it('trims whitespace from input before search', async () => {
    const mockFetch = vi.mocked(fetchWeatherData);
    mockFetch.mockResolvedValueOnce(mockWeatherData as any);
    
    render(<MyLocationPage />);
    
    const input = screen.getByLabelText('Buscar localidad');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    
    fireEvent.change(input, { target: { value: '  Madrid  ' } });
    fireEvent.click(searchButton);
    
    expect(mockFetch).toHaveBeenCalledWith('Madrid');
  });
});