// Página Mi Localidad - Búsqueda personalizada de localidades españolas

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
  Fade,
  Button,
  InputAdornment,
  Alert,
} from '@mui/material';
import { Search as SearchIcon } from 'lucide-react';
import { fetchWeatherData } from '../services/weatherService';
import WeatherSummary from '../components/WeatherSummary';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProcessedWeatherData, WeatherError } from '../types/weather';
import { extractProvince } from '../utils/locationUtils';
import { useLanguage } from '../i18n/LanguageContext';
import { getTemperatureClass } from '../utils/temperatureColors';
import LocationMap from '../components/LocationMap';

const MyLocationPage: React.FC = () => {
  const { t } = useLanguage();
  const [locationInput, setLocationInput] = useState<string>('');
  const [weatherData, setWeatherData] = useState<ProcessedWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<WeatherError | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!locationInput.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await fetchWeatherData(locationInput.trim());
      setWeatherData(data);
    } catch (err) {
      setWeatherData(null);
      setError({ 
        message: t.myLocation.notFound 
      });
    } finally {
      setLoading(false);
    }
  };



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInput(event.target.value);
    if (error && hasSearched) {
      setError(null);
    }
  };

  console.log('Weather Data:', weatherData);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Card className={`temp-bg-card ${weatherData ? getTemperatureClass(weatherData.temp) : 'temp-mild'}`}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography
              variant="h3"
              className="text-accessible-primary"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              {t.myLocation.title}
            </Typography>
            <Typography
              variant="subtitle1"
              className="text-accessible-secondary"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
              }}
            >
              {t.myLocation.subtitle}
            </Typography>
            
            <Box sx={{ maxWidth: 500, mx: 'auto' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={locationInput}
                  onChange={handleInputChange}
                  placeholder={t.myLocation.searchLabel}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon size={20} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: 'var(--radius-lg)',
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.6)',
                      '&.Mui-focused': {
                        color: '#1976d2',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#1a1a1a',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading || !locationInput.trim()}
                  sx={{
                    minWidth: 120,
                    borderRadius: 'var(--radius-lg)',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  {loading ? t.myLocation.searching : t.myLocation.searchButton}
                </Button>
              </Box>
            </Box>

            {weatherData && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" className="text-accessible-muted">
                  {t.myLocation.showingWeatherFor} <strong>{weatherData.address}</strong>
                  {extractProvince(weatherData.resolvedAddress) && (
                    <span> - {extractProvince(weatherData.resolvedAddress)}</span>
                  )}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {loading && hasSearched && (
        <LoadingSpinner message={t.common.searchingWeather} />
      )}
      
      {error && hasSearched && !loading && (
        <Box sx={{ mb: 4 }}>
          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: 'var(--radius-lg)',
              '& .MuiAlert-message': {
                fontSize: '1rem',
                fontWeight: 500,
              }
            }}
          >
            {error.message}
          </Alert>
        </Box>
      )}
      
      <Fade in={!!weatherData && !loading && hasSearched} timeout={500}>
        <Box>
          {weatherData && (
            <>
              <Box sx={{ mb: 4 }}>
                <LocationMap
                  latitude={weatherData.latitude}
                  longitude={weatherData.longitude}
                  locationName={weatherData.address}
                />
              </Box>
              <WeatherSummary weatherData={weatherData} />
            </>
          )}
        </Box>
      </Fade>

      {!hasSearched && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {t.myLocation.searchToStart}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t.myLocation.searchDescription}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default MyLocationPage;