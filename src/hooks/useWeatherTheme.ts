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
 * Hook para aplicar theme dinámico según condiciones meteorológicas
 */
export const useWeatherTheme = (conditions: string, temperature: number) => {
  useEffect(() => {
    if (!conditions) {
      // Theme por defecto
      document.documentElement.setAttribute('data-weather-theme', 'cloudy');
      document.documentElement.setAttribute('data-dark-mode', 'false');
      return;
    }

    // Determinar theme basado en condiciones
    const theme = conditions.toLowerCase().includes('rain') ? 'rainy' :
                 conditions.toLowerCase().includes('storm') ? 'stormy' :
                 conditions.toLowerCase().includes('snow') ? 'snowy' :
                 conditions.toLowerCase().includes('clear') ? 'sunny' : 'cloudy';

    const currentHour = new Date().getHours();
    const isNightTime = currentHour < 6 || currentHour > 20;
    const darkMode = isNightTime || conditions.toLowerCase().includes('storm');

    // Aplicar theme al documento
    document.documentElement.setAttribute('data-weather-theme', theme);
    document.documentElement.setAttribute('data-dark-mode', darkMode.toString());
    
    // Aplicar theme de temperatura
    applyTemperatureTheme(temperature);

    // Smooth transition
    document.documentElement.style.transition = 'var(--theme-transition)';

  }, [conditions, temperature]);

  return {
    currentTheme: conditions ? (conditions.toLowerCase().includes('rain') ? 'rainy' :
                               conditions.toLowerCase().includes('storm') ? 'stormy' :
                               conditions.toLowerCase().includes('snow') ? 'snowy' :
                               conditions.toLowerCase().includes('clear') ? 'sunny' : 'cloudy') : 'cloudy',
    isDarkMode: false,
  };
};