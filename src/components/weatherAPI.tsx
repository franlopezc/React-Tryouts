import { useEffect, useState } from 'react';
import { WeatherData } from '../helpers/interfaceHelper';
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from 'react-icons/wi';

export type WeatherAPIProps = {
  location: string; // City,Country
  dateOne?: string; // yyyy-MM-dd
  dateTwo?: string; // yyyy-MM-dd
};

export const WeatherAPI = (props: WeatherAPIProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.VITE_WEATHER_API_KEY;
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${props.location}?key=${API_KEY}`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [props.location, API_KEY]);

  const renderWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'clear-day':
        return <WiDaySunny size={40} />;
      case 'partly-cloudy-day':
        return <WiCloud size={40} />;
      case 'rain':
        return <WiRain size={40} />;
      case 'snow':
        return <WiSnow size={40} />;
      case 'thunderstorm':
        return <WiThunderstorm size={40} />;
      default:
        return <WiDaySunny size={40} />;
    }
  };

  const getCurrentWeather = () => {
    if (!weatherData) return null;

    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = weatherData.days[0]; // Asumiendo que el primer día es el día actual

    const currentWeather = currentDay.hours.find((hour) => {
      const hourDate = new Date(hour.datetimeEpoch * 1000);
      return hourDate.getHours() === currentHour;
    });

    return currentWeather;
  };

  const currentWeather = getCurrentWeather();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h2>Weather Data for UserName</h2>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          {currentWeather ? (
            <div>
              <div>{renderWeatherIcon(currentWeather.icon)}</div>
              <p>{JSON.stringify(currentWeather, null, 2)}</p>
            </div>
          ) : (
            <p>No weather data available for the current hour.</p>
          )}
          <p>{JSON.stringify(weatherData.days[0].hours, null, 2)} </p>
        </div>
      ) : (
        <p>Failed to fetch data.</p>
      )}
    </div>
  );
};

export default WeatherAPI;
