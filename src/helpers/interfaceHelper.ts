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

export interface WeatherDay {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  hours: WeatherHour[];
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

export interface WeatherHour {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
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

type ThemeVariant = 'light' | 'dark';

export type ThemeContent = {
  theme: ThemeVariant;
  setTheme: (c: ThemeVariant) => void;
};

export interface NavbarProps {
  theme: boolean;
}
