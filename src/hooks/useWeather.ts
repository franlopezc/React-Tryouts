// Hook personalizado para manejo de datos meteorológicos

import { useState, useEffect } from 'react';
import { ProcessedWeatherData, WeatherError } from '../types/weather';
import { fetchWeatherData } from '../services/weatherService';

interface UseWeatherReturn {
  data: ProcessedWeatherData | null;
  loading: boolean;
  error: WeatherError | null;
  refetch: () => void;
}

/**
 * Hook para obtener y manejar datos meteorológicos
 * @param location Ubicación para obtener el clima
 * @param dateOne Fecha inicial (opcional)
 * @param dateTwo Fecha final (opcional)
 * @returns Estado del clima, loading, error y función refetch
 */
export const useWeather = (
  location: string | null,
  dateOne?: string,
  dateTwo?: string
): UseWeatherReturn => {
  const [data, setData] = useState<ProcessedWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<WeatherError | null>(null);

  const fetchData = async () => {
    if (!location) return;

    try {
      setLoading(true);
      setError(null);
      const weatherData = await fetchWeatherData(location, dateOne, dateTwo);
      setData(weatherData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError({ message: errorMessage });
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location, dateOne, dateTwo]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};