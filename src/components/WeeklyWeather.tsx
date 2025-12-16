import { Box, Typography } from '@mui/material';
import { WeatherDay as WeatherDayType } from '../helpers/interfaceHelper';
import WeatherDay from './WeatherDay';

interface WeeklyWeatherProps {
  days: WeatherDayType[];
}

// Componente para mostrar el pronóstico semanal de forma organizada
export default function WeeklyWeather({ days }: WeeklyWeatherProps) {
  // Mostrar solo los próximos 7 días
  const weekDays = days.slice(0, 7);
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          color: 'text.primary' 
        }}
      >
        Pronóstico de 7 días
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
            backgroundColor: 'grey.200',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'primary.main',
            borderRadius: 4,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          },
        }}
      >
        {weekDays.map((day, index) => (
          <Box key={day.datetime} sx={{ flexShrink: 0 }}>
            <WeatherDay day={day} dayIndex={index} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}