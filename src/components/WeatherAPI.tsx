import { useEffect, useState } from 'react';
import { Box, Alert, CircularProgress, Container } from '@mui/material';
import { WeatherData, WeatherHour } from '../helpers/interfaceHelper';
import WeatherSummary from './WeatherSummary';
import HourlyWeather from './HourlyWeather';
import WeeklyWeather from './WeeklyWeather';

export type WeatherAPIProps = {
  location: string;
  dateOne?: string;
  dateTwo?: string;
};

// Componente principal reorganizado para mejor UX y arquitectura de componentes
export default function WeatherAPI(props: WeatherAPIProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${props.location}?key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Error al obtener datos del clima');
        }
        
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('No se pudieron cargar los datos del clima. Inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [props.location, API_KEY]);

  const getCurrentWeather = (): WeatherHour | null => {
    if (!weatherData) return null;

    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = weatherData.days[0];

    const currentWeather = currentDay.hours.find((hour) => {
      const hourDate = new Date(hour.datetimeEpoch * 1000);
      return hourDate.getHours() === currentHour;
    });

    return currentWeather || currentDay.hours[0]; // Fallback a la primera hora si no encuentra la actual
  };

  const currentWeather = getCurrentWeather();
  const currentHour = new Date().getHours();

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Box sx={{ color: 'text.secondary' }}>Cargando datos del clima...</Box>
      </Box>
    );
  }

  if (error || !weatherData || !currentWeather) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error || 'No se encontraron datos del clima para esta ubicación.'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Resumen principal del clima actual */}
        <WeatherSummary 
          weatherData={weatherData} 
          currentWeather={currentWeather} 
        />
        
        {/* Pronóstico por horas */}
        <HourlyWeather 
          hours={weatherData.days[0].hours} 
          currentHour={currentHour}
        />
        
        {/* Pronóstico semanal */}
        <WeeklyWeather days={weatherData.days} />
      </Box>
    </Container>
  );
}
