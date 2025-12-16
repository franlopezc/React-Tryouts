import { Card, CardContent, Typography, Box } from '@mui/material';
import { ProcessedWeatherDay } from '../types/weather';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';
import { getTemperatureClass } from '../utils/temperatureColors';

interface DayCardProps {
  day: ProcessedWeatherDay;
  isToday?: boolean;
}

export default function DayCard({ day, isToday = false }: DayCardProps) {
  const tempClass = getTemperatureClass(day.temp);
  
  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <Card
      className={`temp-bg-card-secondary temp-interactive ${tempClass}-secondary`}
      sx={{
        minWidth: 180,
        position: 'relative',
        ...(isToday && {
          border: '2px solid var(--primary-500)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        })
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Typography 
          variant="h6" 
          className="text-accessible-primary"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          {isToday ? 'Hoy' : formatDate(day.datetime)}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          {renderWeatherIcon(day.icon, 60)}
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h4" 
            className="text-accessible-primary"
            sx={{ fontWeight: 'bold', lineHeight: 1 }}
          >
            {Math.round(day.tempmax)}°
          </Typography>
          <Typography 
            variant="body1" 
            className="text-accessible-muted"
            sx={{ fontWeight: 500 }}
          >
            {Math.round(day.tempmin)}°
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          className="text-accessible-secondary"
          sx={{ 
            textTransform: 'capitalize',
            mb: 2,
            minHeight: '2.5em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {day.conditions}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.75rem' }}>
          <Box>
            <Typography variant="caption" className="text-accessible-muted" display="block">
              💧 {Math.round(day.precipprob)}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" className="text-accessible-muted" display="block">
              💨 {Math.round(day.windspeed)} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}