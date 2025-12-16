// Página Mi Localidad - Búsqueda personalizada de localidades españolas

import React, { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
  Fade,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import { searchSpanishLocations } from '../services/weatherService';
import WeatherDisplay from '../components/WeatherDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { debounce } from 'lodash';

const MyLocationPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  const { data, loading, error } = useWeather(selectedLocation || null);

  // Búsqueda con debounce para mejor UX
  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length < 2) {
        setSearchOptions([]);
        return;
      }

      setSearchLoading(true);
      try {
        const results = await searchSpanishLocations(searchTerm);
        setSearchOptions(results);
      } catch (err) {
        console.error('Error searching locations:', err);
        setSearchOptions([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300),
    []
  );

  const handleLocationChange = (event: React.SyntheticEvent, value: string | null) => {
    setSelectedLocation(value || '');
    if (value) {
      setHasSearched(true);
    }
  };

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    debouncedSearch(value);
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
              <Autocomplete
                options={searchOptions}
                loading={searchLoading}
                onInputChange={handleInputChange}
                onChange={handleLocationChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar localidad en España"
                    variant="outlined"
                    fullWidth
                    placeholder="Ej: Salamanca, Toledo, Cuenca..."
                    InputProps={{
                      ...params.InputProps,
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
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>📍</span>
                      <span>{option}</span>
                    </Box>
                  </Box>
                )}
                noOptionsText="No se encontraron localidades"
                loadingText="Buscando..."
              />
            </Box>

            {selectedLocation && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Mostrando clima para: <strong>{selectedLocation}</strong>
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {loading && hasSearched && <LoadingSpinner message="Obteniendo datos meteorológicos..." />}
      
      {error && hasSearched && (
        <ErrorAlert 
          message={error.message}
          onRetry={() => window.location.reload()} 
        />
      )}
      
      <Fade in={!!data && !loading && hasSearched} timeout={500}>
        <Box>
          {data && <WeatherDisplay weatherData={data} />}
        </Box>
      </Fade>

      {!hasSearched && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            🔍 Busca una localidad para comenzar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Escribe el nombre de cualquier pueblo o ciudad española
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default MyLocationPage;