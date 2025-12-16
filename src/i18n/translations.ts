// Sistema de traducciones centralizado

export type Language = 'es' | 'en';

export interface Translations {
  // Navigation
  nav: {
    provinces: string;
    myLocation: string;
  };
  
  // Provinces Page
  provinces: {
    title: string;
    subtitle: string;
    selectCity: string;
    selectCityPlaceholder: string;
    selectedCity: string;
    province: string;
  };
  
  // My Location Page
  myLocation: {
    title: string;
    subtitle: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchButton: string;
    searching: string;
    showingWeatherFor: string;
    searchToStart: string;
    searchDescription: string;
    notFound: string;
  };
  
  // Weather Display
  weather: {
    currentConditions: string;
    maxTemp: string;
    humidity: string;
    wind: string;
    pressure: string;
    feelsLike: string;
    hourlyForecast: string;
    weeklyForecast: string;
    today: string;
    now: string;
    rain: string;
    uvIndex: string;
    thermalSensation: string;
    rainProbability: string;
  };
  
  // Loading and errors
  common: {
    loading: string;
    loadingWeather: string;
    searchingWeather: string;
    error: string;
    retry: string;
    close: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      provinces: 'Clima por Provincias',
      myLocation: 'Mi Localidad',
    },
    provinces: {
      title: '🏛️ Clima por Provincias',
      subtitle: 'Selecciona una ciudad española para ver su pronóstico meteorológico',
      selectCity: 'Seleccionar ciudad',
      selectCityPlaceholder: 'Selecciona una ciudad',
      selectedCity: 'Ciudad seleccionada:',
      province: 'Provincia:',
    },
    myLocation: {
      title: '📍 Mi Localidad',
      subtitle: 'Busca cualquier pueblo o ciudad de España para ver su clima',
      searchLabel: 'Buscar localidad',
      searchPlaceholder: 'Ej: Madrid, Barcelona, Calle Mayor 1...',
      searchButton: 'Buscar',
      searching: 'Buscando...',
      showingWeatherFor: 'Mostrando clima para:',
      searchToStart: '🔍 Busca cualquier localidad',
      searchDescription: 'Escribe el nombre de una ciudad, pueblo o dirección',
      notFound: 'No se encuentra información para el domicilio introducido',
    },
    weather: {
      currentConditions: 'Condiciones actuales',
      maxTemp: 'Máxima del día',
      humidity: 'Humedad',
      wind: 'Viento',
      pressure: 'Presión',
      feelsLike: 'Sensación térmica',
      hourlyForecast: '⏰ Pronóstico por horas',
      weeklyForecast: '📅 Pronóstico de 7 días',
      today: 'Hoy',
      now: 'Ahora',
      rain: 'Lluvia',
      uvIndex: 'Índice UV',
      thermalSensation: 'Sensación térmica',
      rainProbability: 'Probabilidad lluvia',
    },
    common: {
      loading: 'Cargando...',
      loadingWeather: 'Cargando datos meteorológicos...',
      searchingWeather: 'Buscando información meteorológica...',
      error: 'Error',
      retry: 'Reintentar',
      close: 'Cerrar',
    },
  },
  en: {
    nav: {
      provinces: 'Weather by Provinces',
      myLocation: 'My Location',
    },
    provinces: {
      title: '🏛️ Weather by Provinces',
      subtitle: 'Select a Spanish city to see its weather forecast',
      selectCity: 'Select city',
      selectCityPlaceholder: 'Select a city',
      selectedCity: 'Selected city:',
      province: 'Province:',
    },
    myLocation: {
      title: '📍 My Location',
      subtitle: 'Search for any town or city in Spain to see its weather',
      searchLabel: 'Search location',
      searchPlaceholder: 'E.g: Madrid, Barcelona, Main Street 1...',
      searchButton: 'Search',
      searching: 'Searching...',
      showingWeatherFor: 'Showing weather for:',
      searchToStart: '🔍 Search any location',
      searchDescription: 'Enter the name of a city, town or address',
      notFound: 'No information found for the entered address',
    },
    weather: {
      currentConditions: 'Current conditions',
      maxTemp: 'Daily high',
      humidity: 'Humidity',
      wind: 'Wind',
      pressure: 'Pressure',
      feelsLike: 'Feels like',
      hourlyForecast: '⏰ Hourly forecast',
      weeklyForecast: '📅 7-day forecast',
      today: 'Today',
      now: 'Now',
      rain: 'Rain',
      uvIndex: 'UV Index',
      thermalSensation: 'Feels like',
      rainProbability: 'Rain probability',
    },
    common: {
      loading: 'Loading...',
      loadingWeather: 'Loading weather data...',
      searchingWeather: 'Searching weather information...',
      error: 'Error',
      retry: 'Retry',
      close: 'Close',
    },
  },
};