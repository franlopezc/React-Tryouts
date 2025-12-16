import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { WeatherHour } from '../helpers/interfaceHelper';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';

interface WeatherCardProps {
  weather: WeatherHour;
  isCurrentHour?: boolean;
}

// Componente reutilizable para mostrar información del clima de forma clara y organizada
export default function WeatherCard({ weather, isCurrentHour = false }: WeatherCardProps) {
  const formatTime = (datetimeEpoch: number) => {
    return new Date(datetimeEpoch * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card
      sx={{
        minWidth: 200,
        position: 'relative',
        background: isCurrentHour 
          ? 'linear-gradient(135deg, #04AEFF 0%, #0288D1 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        color: isCurrentHour ? 'white' : 'inherit',
        boxShadow: isCurrentHour 
          ? '0 8px 32px rgba(4, 174, 255, 0.3)'
          : '0 4px 16px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isCurrentHour 
            ? '0 12px 40px rgba(4, 174, 255, 0.4)'
            : '0 8px 24px rgba(0, 0, 0, 0.15)',
        }
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
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      )}
      
      <CardContent sx={{ textAlign: 'center', pb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          {formatTime(weather.datetimeEpoch)}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          {renderWeatherIcon(weather.icon)}
        </Box>
        
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          {Math.round(weather.temp)}°
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2, 
            opacity: isCurrentHour ? 0.9 : 0.7,
            textTransform: 'capitalize'
          }}
        >
          {weather.conditions}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <Box>
            <Typography variant="caption" display="block">
              Sensación
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {Math.round(weather.feelslike)}°
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="caption" display="block">
              Humedad
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {Math.round(weather.humidity)}%
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="caption" display="block">
              Viento
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {Math.round(weather.windspeed)} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}