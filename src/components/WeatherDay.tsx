import { WeatherHour } from '../helpers/interfaceHelper';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';

export type WeatherDayProps = {
  day: number;
  weather: WeatherHour | undefined;
};

export default function WeatherDay(props: WeatherDayProps) {
  const { day, weather } = props;

  return (
    <div className="weather-day">
      <div className="weather-day-header">
        <h2>Day {day + 1}</h2>
      </div>
      <div className="weather-day-icon">
        {renderWeatherIcon(weather?.icon || '')}
      </div>
      <div className="weather-day-temp">
        <span className="temp-max">Max: {weather?.tempmax}°C</span>
        <span className="temp-min">Min: {weather?.tempmin}°C</span>
      </div>
    </div>
  );
}
