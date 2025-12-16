import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { ProcessedWeatherDay } from '../types/weather';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';
import { getTemperatureClass } from '../utils/temperatureColors';
import { useLanguage } from '../i18n/LanguageContext';

interface DayCardProps {
  day: ProcessedWeatherDay;
  isToday?: boolean;
  onClick?: () => void;
}

export default function DayCard({ day, isToday = false, onClick }: DayCardProps) {
  const { t } = useLanguage();
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
      className={isToday ? `temp-bg-card ${tempClass}` : `temp-bg-card-secondary temp-interactive ${tempClass}-secondary`}
      onClick={onClick}
      sx={{
        minWidth: 200,
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        '&:focus-visible': {
          outline: '2px solid var(--primary-500)',
          outlineOffset: '2px'
        }
      }}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `Ver detalles del ${isToday ? 'día de hoy' : formatDate(day.datetime)}` : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {isToday && (
        <Chip
          label={t.weather.today}
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
          {isToday ? t.weather.today : formatDate(day.datetime)}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          {renderWeatherIcon(day.icon)}
        </Box>
        
        <Typography 
          variant="h4" 
          className="text-accessible-primary"
          sx={{ mb: 1, fontWeight: 'bold' }}
        >
          {Math.round(day.tempmax)}° / {Math.round(day.tempmin)}°
        </Typography>
        
        <Typography 
          variant="body2" 
          className="text-accessible-secondary"
          sx={{ 
            mb: 2, 
            textTransform: 'capitalize'
          }}
        >
          {day.conditions}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <Box>
            <Typography variant="caption" className="text-accessible-muted" display="block">
              {t.weather.rain}
            </Typography>
            <Typography variant="body2" className="text-accessible-primary" sx={{ fontWeight: 500 }}>
              {Math.round(day.precipprob)}%
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="caption" className="text-accessible-muted" display="block">
              {t.weather.humidity}
            </Typography>
            <Typography variant="body2" className="text-accessible-primary" sx={{ fontWeight: 500 }}>
              {Math.round(day.humidity)}%
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="caption" className="text-accessible-muted" display="block">
              {t.weather.wind}
            </Typography>
            <Typography variant="body2" className="text-accessible-primary" sx={{ fontWeight: 500 }}>
              {Math.round(day.windspeed)} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}