// Tests para useWeather hook

import { renderHook, waitFor } from '@testing-library/react';
import { useWeather } from './useWeather';

// Mock del servicio
jest.mock('../services/weatherService', () => ({
  fetchWeatherData: jest.fn(),
}));

const mockFetchWeatherData = require('../services/weatherService').fetchWeatherData;

describe('useWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useWeather(null));
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refetch).toBe('function');
  });

  test('does not fetch when location is null', () => {
    renderHook(() => useWeather(null));
    
    expect(mockFetchWeatherData).not.toHaveBeenCalled();
  });

  test('fetches data when location is provided', async () => {
    const mockData = { address: 'Madrid', days: [] };
    mockFetchWeatherData.mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useWeather('Madrid'));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(mockFetchWeatherData).toHaveBeenCalledWith('Madrid', undefined, undefined);
  });

  test('handles fetch error correctly', async () => {
    const errorMessage = 'Network error';
    mockFetchWeatherData.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useWeather('Madrid'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual({ message: errorMessage });
  });

  test('refetch function works correctly', async () => {
    const mockData = { address: 'Madrid', days: [] };
    mockFetchWeatherData.mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useWeather('Madrid'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Clear the mock to test refetch
    mockFetchWeatherData.mockClear();
    
    result.current.refetch();
    
    expect(mockFetchWeatherData).toHaveBeenCalledWith('Madrid', undefined, undefined);
  });

  test('fetches with date parameters', async () => {
    const mockData = { address: 'Madrid', days: [] };
    mockFetchWeatherData.mockResolvedValue(mockData);
    
    renderHook(() => useWeather('Madrid', '2024-01-01', '2024-01-07'));
    
    await waitFor(() => {
      expect(mockFetchWeatherData).toHaveBeenCalledWith('Madrid', '2024-01-01', '2024-01-07');
    });
  });
});