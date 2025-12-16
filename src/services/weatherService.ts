// Servicio para consumo de la API de Visual Crossing Weather con tipado estricto

import { WeatherData, ProcessedWeatherData, ProcessedWeatherDay, ProcessedWeatherHour } from '../types/weather';
import { fahrenheitToCelsius } from '../utils/temperature';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

/**
 * Procesa los datos de temperatura de Fahrenheit a Celsius
 */
const processTemperatureData = (data: WeatherData): ProcessedWeatherData => {
  const processHour = (hour: any): ProcessedWeatherHour => ({
    ...hour,
    temp: fahrenheitToCelsius(hour.temp),
    feelslike: fahrenheitToCelsius(hour.feelslike),
    tempmax: hour.tempmax ? fahrenheitToCelsius(hour.tempmax) : undefined,
    tempmin: hour.tempmin ? fahrenheitToCelsius(hour.tempmin) : undefined,
  });

  const processDay = (day: any): ProcessedWeatherDay => ({
    ...day,
    temp: fahrenheitToCelsius(day.temp),
    feelslike: fahrenheitToCelsius(day.feelslike),
    tempmax: fahrenheitToCelsius(day.tempmax),
    tempmin: fahrenheitToCelsius(day.tempmin),
    hours: day.hours.map(processHour),
  });

  return {
    ...data,
    temp: fahrenheitToCelsius(data.temp),
    feelslike: fahrenheitToCelsius(data.feelslike),
    days: data.days.map(processDay),
  };
};

/**
 * Obtiene datos meteorológicos para una ubicación específica
 * @param location Nombre de la ubicación
 * @param dateOne Fecha inicial (opcional)
 * @param dateTwo Fecha final (opcional)
 * @returns Datos meteorológicos procesados con temperaturas en Celsius
 */
export const fetchWeatherData = async (
  location: string,
  dateOne?: string,
  dateTwo?: string
): Promise<ProcessedWeatherData> => {
  if (!API_KEY) {
    throw new Error('API key no configurada');
  }

  let url = `${BASE_URL}/${encodeURIComponent(location)}?key=${API_KEY}&unitGroup=us&include=hours`;
  
  if (dateOne && dateTwo) {
    url += `&from=${dateOne}&to=${dateTwo}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Ubicación no encontrada');
    }
    if (response.status === 401) {
      throw new Error('API key inválida');
    }
    if (response.status === 429) {
      throw new Error('Límite de peticiones excedido');
    }
    throw new Error(`Error del servidor: ${response.status}`);
  }

  const data: WeatherData = await response.json();
  return processTemperatureData(data);
};

/**
 * Busca ubicaciones en España que coincidan con el término de búsqueda
 * @param searchTerm Término de búsqueda
 * @returns Array de ubicaciones encontradas
 */
export const searchSpanishLocations = async (searchTerm: string): Promise<string[]> => {
  // Para esta implementación, usaremos una búsqueda simple
  // En producción, se podría usar una API de geocodificación
  const spanishCities = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga',
    'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba',
    'Valladolid', 'Vigo', 'Gijón', 'Vitoria-Gasteiz', 'La Coruña',
    'Granada', 'Elche', 'Oviedo', 'Badalona', 'Cartagena', 'Terrassa',
    'Jerez de la Frontera', 'Sabadell', 'Móstoles', 'Santa Cruz de Tenerife',
    'Pamplona', 'Almería', 'Alcalá de Henares', 'Fuenlabrada', 'Leganés',
    'San Sebastián', 'Getafe', 'Burgos', 'Santander', 'Albacete',
    'Castellón de la Plana', 'Alcorcón', 'Logroño', 'Badajoz', 'Salamanca',
    'Huelva', 'Marbella', 'Lérida', 'Tarragona', 'León', 'Cádiz', 'Jaén',
    'Ourense', 'Lugo', 'Santiago de Compostela', 'Cáceres', 'Melilla', 'Ceuta'
  ];

  return spanishCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10); // Limitar a 10 resultados
};