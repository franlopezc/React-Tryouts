// Tipos TypeScript estrictos para la API de Visual Crossing Weather

export interface WeatherHour {
  datetime: string;
  datetimeEpoch: number;
  temp: number; // Fahrenheit - convertiremos a Celsius
  tempmax?: number;
  tempmin?: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  precipprob: number;
  snow: number;
  snowdepth: number;
  preciptype: string | null;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  conditions: string;
  icon: string;
  stations: string | null;
  source: string;
}

export interface WeatherDay {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  tempmax: number;
  tempmin: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  precipprob: number;
  snow: number;
  snowdepth: number;
  preciptype: string | null;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  conditions: string;
  icon: string;
  stations: string | null;
  source: string;
  hours: WeatherHour[];
}

export interface WeatherData {
  address: string;
  conditions: string;
  cloudcover: number;
  days: WeatherDay[];
  datetime: string;
  datetimeEpoch: number;
  description: string;
  dew: number;
  feelslike: number;
  humidity: number;
  latitude: number;
  longitude: number;
  icon: string;
  precip: number;
  preciptype: string | null;
  precipprob: number;
  pressure: number;
  temp: number;
  timezone: string;
  severerisk: number;
  snow: number;
  snowdepth: number;
  solarenergy: number;
  solarradiation: number;
  source: string;
  stations: string | null;
  uvindex: number;
  visibility: number;
  windgust: number;
  windspeed: number;
  winddir: number;
}

export interface ProcessedWeatherHour extends Omit<WeatherHour, 'temp' | 'feelslike' | 'tempmax' | 'tempmin'> {
  temp: number;
  feelslike: number;
  tempmax?: number;
  tempmin?: number;
}

export interface ProcessedWeatherDay extends Omit<WeatherDay, 'temp' | 'feelslike' | 'tempmax' | 'tempmin' | 'hours'> {
  temp: number;
  feelslike: number;
  tempmax: number;
  tempmin: number;
  hours: ProcessedWeatherHour[];
}

export interface ProcessedWeatherData extends Omit<WeatherData, 'temp' | 'feelslike' | 'days'> {
  temp: number;
  feelslike: number;
  days: ProcessedWeatherDay[];
}

export interface Location {
  name: string;
  country: string;
}

export interface WeatherError {
  message: string;
  code?: string;
}

export interface WeatherState {
  data: ProcessedWeatherData | null;
  loading: boolean;
  error: WeatherError | null;
}