import { Card, CardContent, Typography, Box } from '@mui/material';
import { WeatherDay as WeatherDayType } from '../helpers/interfaceHelper';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';

export type WeatherDayProps = {
  day: WeatherDayType;
  dayIndex: number;
};

// Componente mejorado para mostrar el pronóstico diario con datos correctos del día completo
export default function WeatherDay({ day, dayIndex }: WeatherDayProps) {
  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    if (dayIndex === 0) return 'Hoy';
    if (dayIndex === 1) return 'Mañana';
    return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
  };

  return (
    <Card
      sx={{
        minWidth: 160,
        textAlign: 'center',
        background: dayIndex === 0 
          ? 'linear-gradient(135deg, #04AEFF 0%, #0288D1 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        color: dayIndex === 0 ? 'white' : 'inherit',
        boxShadow: dayIndex === 0
          ? '0 4px 20px rgba(4, 174, 255, 0.3)'
          : '0 2px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: dayIndex === 0
            ? '0 6px 24px rgba(4, 174, 255, 0.4)'
            : '0 4px 16px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <CardContent sx={{ py: 2 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 1, 
            fontWeight: 600,
            textTransform: 'capitalize'
          }}
        >
          {formatDate(day.datetime)}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          {renderWeatherIcon(day.icon)}
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2, 
            opacity: dayIndex === 0 ? 0.9 : 0.7,
            textTransform: 'capitalize',
            fontSize: '0.75rem'
          }}
        >
          {day.conditions}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {Math.round(day.temp)}°
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: dayIndex === 0 ? 0.7 : 0.5,
              fontSize: '0.875rem'
            }}
          >
            {Math.round(day.feelslike)}°
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
