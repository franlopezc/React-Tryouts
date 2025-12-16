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

const MyLocationPage: React.FC = () => {
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
        message: 'No se encuentra información para el domicilio introducido' 
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


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Card className="app-header">
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                color: 'var(--neutral-900)',
              }}
            >
              📍 Mi Localidad
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
                color: 'var(--neutral-700)',
              }}
            >
              Busca cualquier pueblo o ciudad de España para ver su clima
            </Typography>
            
            <Box sx={{ maxWidth: 500, mx: 'auto' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Buscar localidad"
                  variant="outlined"
                  fullWidth
                  value={locationInput}
                  onChange={handleInputChange}
                  placeholder="Ej: Madrid, Barcelona, Calle Mayor 1..."
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
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: 'var(--radius-lg)',
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
                  {loading ? 'Buscando...' : 'Buscar'}
                </Button>
              </Box>
            </Box>

            {weatherData && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Mostrando clima para: <strong>{weatherData.address}</strong>
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
        <LoadingSpinner message="Buscando información meteorológica..." />
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
          {weatherData && <WeatherSummary weatherData={weatherData} />}
        </Box>
      </Fade>

      {!hasSearched && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            🔍 Busca cualquier localidad
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Escribe el nombre de una ciudad, pueblo o dirección
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default MyLocationPage;