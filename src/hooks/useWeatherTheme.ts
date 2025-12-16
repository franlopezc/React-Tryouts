// Hook para manejo dinámico de themes según clima

import { useEffect } from 'react';
import { ProcessedWeatherData } from '../types/weather';
import { applyTemperatureTheme } from '../utils/temperatureColors';

type WeatherTheme = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';

/**
 * Mapea iconos de weather a themes
 */
const getWeatherTheme = (icon: string): WeatherTheme => {
  switch (icon) {
    case 'clear-day':
    case 'clear-night':
      return 'sunny';
    
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
    case 'cloudy':
      return 'cloudy';
    
    case 'rain':
    case 'showers-day':
    case 'showers-night':
      return 'rainy';
    
    case 'thunderstorm':
    case 'thunder-rain':
    case 'thunder-showers-day':
    case 'thunder-showers-night':
      return 'stormy';
    
    case 'snow':
    case 'snow-showers-day':
    case 'snow-showers-night':
      return 'snowy';
    
    case 'fog':
    case 'wind':
    default:
      return 'cloudy';
  }
};

/**
 * Determina si debe activarse dark mode según clima y hora
 */
const shouldUseDarkMode = (weatherData: ProcessedWeatherData): boolean => {
  const currentHour = new Date().getHours();
  const isNightTime = currentHour < 6 || currentHour > 20;
  
  // Dark mode automático para clima tormentoso
  if (weatherData.days[0]?.icon.includes('thunder')) {
    return true;
  }
  
  // Dark mode para noche o clima severo
  if (isNightTime || weatherData.days[0]?.icon.includes('storm')) {
    return true;
  }
  
  return false;
};

/**
 * Hook para aplicar theme dinámico según datos meteorológicos
 */
export const useWeatherTheme = (weatherData: ProcessedWeatherData | null) => {
  useEffect(() => {
    if (!weatherData) {
      // Theme por defecto
      document.documentElement.setAttribute('data-weather-theme', 'cloudy');
      document.documentElement.setAttribute('data-dark-mode', 'false');
      return;
    }

    const currentWeather = weatherData.days[0];
    if (!currentWeather) return;

    const theme = getWeatherTheme(currentWeather.icon);
    const darkMode = shouldUseDarkMode(weatherData);

    // Aplicar theme al documento
    document.documentElement.setAttribute('data-weather-theme', theme);
    document.documentElement.setAttribute('data-dark-mode', darkMode.toString());
    
    // Aplicar theme de temperatura basado en temperatura actual
    const currentTemp = currentWeather.temp;
    applyTemperatureTheme(currentTemp);

    // Smooth transition
    document.documentElement.style.transition = 'var(--theme-transition)';

  }, [weatherData]);

  return {
    currentTheme: weatherData ? getWeatherTheme(weatherData.days[0]?.icon) : 'cloudy',
    isDarkMode: weatherData ? shouldUseDarkMode(weatherData) : false,
  };
};