import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { ProcessedWeatherHour } from '../types/weather';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';
import { getTemperatureClass } from '../utils/temperatureColors';

interface WeatherCardProps {
  weather: ProcessedWeatherHour;
  isCurrentHour?: boolean;
}

// Componente reutilizable para mostrar información del clima de forma clara y organizada
export default function WeatherCard({ weather, isCurrentHour = false }: WeatherCardProps) {
  const tempClass = getTemperatureClass(weather.temp);
  
  const formatTime = (datetimeEpoch: number) => {
    return new Date(datetimeEpoch * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card
      className={isCurrentHour ? `temp-bg-card ${tempClass}` : `temp-bg-card-secondary temp-interactive ${tempClass}-secondary`}
      sx={{
        minWidth: 200,
        position: 'relative'
      }}
    >
      {isCurrentHour && (
        <Chip
          label="Ahora"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(2, 2, 2, 0.2)',
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      )}
      
      <CardContent sx={{ textAlign: 'center', pb: 2 }}>
        <Typography 
          variant="h6" 
          className="text-accessible-primary"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          {formatTime(weather.datetimeEpoch)}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          {renderWeatherIcon(weather.icon)}
        </Box>
        
        <Typography 
          variant="h4" 
          className="text-accessible-primary"
          sx={{ mb: 1, fontWeight: 'bold' }}
        >
          {Math.round(weather.temp)}°
        </Typography>
        
        <Typography 
          variant="body2" 
          className="text-accessible-secondary"
          sx={{ 
            mb: 2, 
            textTransform: 'capitalize'
          }}
        >
          {weather.conditions}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <Box>
            <Typography variant="caption" className="text-accessible-muted" display="block">
              Sensación
            </Typography>
            <Typography variant="body2" className="text-accessible-primary" sx={{ fontWeight: 500 }}>
              {Math.round(weather.feelslike)}°
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="caption" className="text-accessible-muted" display="block">
              Humedad
            </Typography>
            <Typography variant="body2" className="text-accessible-primary" sx={{ fontWeight: 500 }}>
              {Math.round(weather.humidity)}%
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="caption" className="text-accessible-muted" display="block">
              Viento
            </Typography>
            <Typography variant="body2" className="text-accessible-primary" sx={{ fontWeight: 500 }}>
              {Math.round(weather.windspeed)} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}