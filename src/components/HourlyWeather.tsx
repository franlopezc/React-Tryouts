import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ProcessedWeatherHour } from '../types/weather';
import WeatherCard from './WeatherCard';

interface HourlyWeatherProps {
  hours: ProcessedWeatherHour[];
  currentHour: number;
}

// Componente especializado para mostrar el pronóstico por horas de forma clara y navegable
export default function HourlyWeather({ hours, currentHour }: HourlyWeatherProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Mostrar las próximas 12 horas desde la hora actual
  const relevantHours = hours.slice(currentHour, currentHour + 12);
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h5" 
        className="text-accessible-primary"
        sx={{ 
          mb: 3, 
          fontWeight: 600
        }}
      >
        Pronóstico por horas
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[200],
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 4,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        }}
      >
        {relevantHours.map((hour, index) => {
          const hourFromEpoch = new Date(hour.datetimeEpoch * 1000).getHours();
          const isCurrentHour = index === 0; // Primera hora es la actual
          
          return (
            <Box key={hour.datetimeEpoch} sx={{ flexShrink: 0 }}>
              <WeatherCard 
                weather={hour} 
                isCurrentHour={isCurrentHour}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}