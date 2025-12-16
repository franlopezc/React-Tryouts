import partlyCloudyDay from '../assets/cloudy.gif';
import clearDay from '../assets/sun.gif';
import rainDay from '../assets/rain.gif';
import thunderStormDay from '../assets/storm.gif';
import snowDay from '../assets/snow.gif';

export function renderWeatherIcon(icon: string) {
  console.log(icon);

  switch (icon) {
    case 'clear-day':
      return <img src={clearDay} alt="Weather Animation" width="80" />;
    case 'partly-cloudy-day':
      return <img src={partlyCloudyDay} alt="Weather Animation" width="80" />;
    case 'rain':
      return <img src={rainDay} alt="Weather Animation" width="80" />;
    case 'snow':
      return <img src={snowDay} alt="Weather Animation" width="80" />;
    case 'thunderstorm':
      return <img src={thunderStormDay} alt="Weather Animation" width="80" />;
    default:
      return <img src={clearDay} alt="Weather Animation" width="80" />;
  }
}
