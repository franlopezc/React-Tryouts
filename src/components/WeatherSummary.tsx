import { Box, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import { WeatherData, WeatherHour } from '../helpers/interfaceHelper';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';

interface WeatherSummaryProps {
  weatherData: WeatherData;
  currentWeather: WeatherHour;
}

// Componente para mostrar el resumen principal del clima actual con información destacada
export default function WeatherSummary({ weatherData, currentWeather }: WeatherSummaryProps) {
  const currentDay = weatherData.days[0];
  
  const formatDate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        mb: 4,
        background: 'linear-gradient(135deg, #04AEFF 0%, #0288D1 100%)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(4, 174, 255, 0.3)',
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {weatherData.address}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, textTransform: 'capitalize' }}>
            {formatDate(currentDay.datetime)}
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>
                {renderWeatherIcon(currentWeather.icon)}
              </Box>
              <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                {Math.round(currentWeather.temp)}°C
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, textTransform: 'capitalize' }}>
                {currentWeather.conditions}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
                Sensación térmica: {Math.round(currentWeather.feelslike)}°C
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Condiciones actuales
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Máxima del día
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {Math.round(currentDay.temp)}°C
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Humedad
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {Math.round(currentWeather.humidity)}%
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Viento
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {Math.round(currentWeather.windspeed)} km/h
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Presión
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
  );
}