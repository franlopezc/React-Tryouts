import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { ProcessedWeatherData } from '../types/weather';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';
import { useWeatherTheme } from '../hooks/useWeatherTheme';
import { getTemperatureClass } from '../utils/temperatureColors';
import HourlyWeather from './HourlyWeather';
import WeeklyWeather from './WeeklyWeather';
import { useLanguage } from '../i18n/LanguageContext';

interface WeatherSummaryProps {
  weatherData: ProcessedWeatherData;
}

// Componente para mostrar el resumen principal del clima actual con información destacada
export default function WeatherSummary({ weatherData }: WeatherSummaryProps) {
  const { t } = useLanguage();
  const currentDay = weatherData.days[0];
  const currentWeather = currentDay.hours[0] || {
    temp: weatherData.temp,
    feelslike: weatherData.feelslike,
    humidity: weatherData.humidity,
    windspeed: weatherData.windspeed,
    pressure: weatherData.pressure,
    conditions: weatherData.conditions,
    icon: weatherData.icon
  };
  
  // Aplicar tema dinámico basado en el clima
  useWeatherTheme(currentWeather.conditions, currentWeather.temp);
  
  // Obtener clase de temperatura para fondos
  const tempClass = getTemperatureClass(currentWeather.temp);
  
  const formatDate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
    <Card className={`temp-bg-card ${tempClass}`}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant="h4" 
            className="text-accessible-primary"
            sx={{ fontWeight: 'bold', mb: 1 }}
          >
            {weatherData.address}
          </Typography>
          <Typography 
            variant="subtitle1" 
            className="text-accessible-secondary"
            sx={{ textTransform: 'capitalize' }}
          >
            {formatDate(currentDay.datetime)}
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>
                {renderWeatherIcon(currentWeather.icon)}
              </Box>
              <Typography 
                variant="h2" 
                className="text-accessible-primary"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {Math.round(currentWeather.temp)}°C
              </Typography>
              <Typography 
                variant="h6" 
                className="text-accessible-secondary"
                sx={{ textTransform: 'capitalize' }}
              >
                {currentWeather.conditions}
              </Typography>
              <Typography 
                variant="body1" 
                className="text-accessible-muted"
                sx={{ mt: 1 }}
              >
                {t.weather.feelsLike}: {Math.round(currentWeather.feelslike)}°C
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography 
                variant="h6" 
                className="text-accessible-primary"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                {t.weather.currentConditions}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box className={`temp-bg-card-secondary temp-interactive ${tempClass}-secondary`} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" className="text-accessible-muted">
                      {t.weather.maxTemp}
                    </Typography>
                    <Typography variant="h6" className="text-accessible-primary">
                      {Math.round(currentDay.tempmax)}°C
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box className={`temp-bg-card-secondary temp-interactive ${tempClass}-secondary`} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" className="text-accessible-muted">
                      {t.weather.humidity}
                    </Typography>
                    <Typography variant="h6" className="text-accessible-primary">
                      {Math.round(currentWeather.humidity)}%
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box className={`temp-bg-card-secondary temp-interactive ${tempClass}-secondary`} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" className="text-accessible-muted">
                      {t.weather.wind}
                    </Typography>
                    <Typography variant="h6" className="text-accessible-primary">
                      {Math.round(currentWeather.windspeed)} km/h
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box className={`temp-bg-card-secondary temp-interactive ${tempClass}-secondary`} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" className="text-accessible-muted">
                      {t.weather.pressure}
                    </Typography>
                    <Typography variant="h6" className="text-accessible-primary">
                      {Math.round(currentWeather.pressure)} hPa
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    
    <Box sx={{ mt: 4 }}>
      <HourlyWeather 
        hours={currentDay.hours} 
        currentHour={new Date().getHours()}
      />
    </Box>
    
    <Box sx={{ mt: 4 }}>
      <WeeklyWeather days={weatherData.days} />
    </Box>
    </>
  );
}