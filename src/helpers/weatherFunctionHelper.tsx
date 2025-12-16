import partlyCloudyDay from '../assets/cloudy.gif';
import clearDay from '../assets/sun.gif';
import rainDay from '../assets/rain.gif';
import thunderStormDay from '../assets/storm.gif';
import snowDay from '../assets/snow.gif';
import cloudsDay from '../assets/clouds.gif';

// Función mejorada para renderizar iconos del clima con mejor accesibilidad y más casos
export function renderWeatherIcon(icon: string, size: number = 80) {
  const getIconData = (iconType: string) => {
    switch (iconType) {
      case 'clear-day':
      case 'clear-night':
        return { src: clearDay, alt: 'Cielo despejado' };
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
        return { src: partlyCloudyDay, alt: 'Parcialmente nublado' };
      case 'cloudy':
        return { src: cloudsDay, alt: 'Nublado' };
      case 'rain':
        return { src: rainDay, alt: 'Lluvia' };
      case 'snow':
        return { src: snowDay, alt: 'Nieve' };
      case 'thunderstorm':
      case 'thunder-rain':
      case 'thunder-showers-day':
        return { src: thunderStormDay, alt: 'Tormenta' };
      case 'fog':
      case 'wind':
        return { src: cloudsDay, alt: 'Niebla o viento' };
      default:
        return { src: clearDay, alt: 'Clima' };
    }
  };

  const { src, alt } = getIconData(icon);
  
  return (
    <img 
      src={src} 
      alt={alt}
      width={size}
      height={size}
      style={{ 
        objectFit: 'contain',
        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))'
      }}
    />
  );
}
