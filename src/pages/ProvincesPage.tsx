// Página de Provincias - Vista principal con ciudades españolas

import React, { useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Card,
  CardContent,
  Fade,
  SelectChangeEvent,
} from '@mui/material';
import { useWeather } from '../hooks/useWeather';
import WeatherSummary from '../components/WeatherSummary';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { extractProvince } from '../utils/locationUtils';
import { useLanguage } from '../i18n/LanguageContext';

const SPANISH_CITIES = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga',
  'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba',
  'Valladolid', 'Vigo', 'Gijón', 'Vitoria-Gasteiz', 'La Coruña',
  'Granada', 'Elche', 'Oviedo', 'Badalona', 'Cartagena', 'Terrassa',
  'Jerez de la Frontera', 'Sabadell', 'Móstoles', 'Santa Cruz de Tenerife',
  'Pamplona', 'Almería', 'Alcalá de Henares', 'Fuenlabrada', 'Leganés',
  'San Sebastián', 'Getafe', 'Burgos', 'Santander', 'Albacete',
  'Castellón de la Plana', 'Alcorcón', 'Logroño', 'Badajoz', 'Salamanca',
  'Huelva', 'Marbella', 'Lérida', 'Tarragona', 'León', 'Cádiz', 'Jaén',
  'Ourense', 'Lugo', 'Santiago de Compostela', 'Cáceres', 'Melilla', 'Ceuta'
];

const ProvincesPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const { data, loading, error } = useWeather(selectedCity || null);

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value);
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
              {t.provinces.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
                color: 'var(--neutral-700)',
              }}
            >
              {t.provinces.subtitle}
            </Typography>
            
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="city-select-label">
                  {t.provinces.selectCity}
                </InputLabel>
                <Select
                  labelId="city-select-label"
                  value={selectedCity}
                  onChange={handleCityChange}
                  label={t.provinces.selectCity}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <MenuItem value="">
                    <em>{t.provinces.selectCityPlaceholder}</em>
                  </MenuItem>
                  {SPANISH_CITIES.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            {selectedCity && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {t.provinces.selectedCity} <strong>{selectedCity}</strong>
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {loading && <LoadingSpinner message={t.common.loadingWeather} />}
      
      {error && (
        <ErrorAlert 
          message={error.message} 
          onRetry={() => window.location.reload()} 
        />
      )}
      
      <Fade in={!!data && !loading} timeout={500}>
        <Box>
          {data && (
            <>
              {extractProvince(data.address) && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    📍 {t.provinces.province} <strong>{extractProvince(data.address)}</strong>
                  </Typography>
                </Box>
              )}
              <WeatherSummary weatherData={data} />
            </>
          )}
        </Box>
      </Fade>
    </Container>
  );
};

export default ProvincesPage;