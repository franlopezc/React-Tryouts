import { useEffect, useState } from 'react';
import { WeatherData, WeatherHour } from '../helpers/interfaceHelper';
import WeatherDay from './WeatherDay';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';

export type WeatherAPIProps = {
  location: string; // City,Country
  dateOne?: string; // yyyy-MM-dd
  dateTwo?: string; // yyyy-MM-dd
};

export default function WeatherAPI(props: WeatherAPIProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
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

  const getWeeklyWeather = (): {
    day: number;
    weather: WeatherHour | undefined;
  }[] => {
    if (!weatherData) return [];

    const weeklyWeather = weatherData.days.map((day, index) => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentDay = weatherData.days[index];

      const currentWeather = currentDay.hours.find((hour) => {
        const hourDate = new Date(hour.datetimeEpoch * 1000);
        return hourDate.getHours() === currentHour;
      });

      return {
        day: index,
        weather: currentWeather,
      };
    });

    return weeklyWeather;
  };

  const currentWeather = getCurrentWeather();
  const weeklyWeather = getWeeklyWeather();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h2>Comenzamos con el escrutinio de datos:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          {currentWeather ? (
            <div>
              <div className="weekly-weather">
                {weeklyWeather.map((dayWeather, index) => (
                  <WeatherDay
                    key={index}
                    day={dayWeather.day}
                    weather={dayWeather.weather}
                  />
                ))}
              </div>
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
}
