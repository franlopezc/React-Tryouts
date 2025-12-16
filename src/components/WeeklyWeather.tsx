import { Box, Typography, useTheme } from '@mui/material';
import { ProcessedWeatherDay } from '../types/weather';
import DayCard from './DayCard';

interface WeeklyWeatherProps {
  days: ProcessedWeatherDay[];
}

export default function WeeklyWeather({ days }: WeeklyWeatherProps) {
  const theme = useTheme();
  const weekDays = days.slice(0, 7);
  
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
        📅 Pronóstico de 7 días
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
        {weekDays.map((day, index) => (
          <Box key={day.datetimeEpoch} sx={{ flexShrink: 0 }}>
            <DayCard 
              day={day} 
              isToday={index === 0}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}