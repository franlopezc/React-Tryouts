import { useState } from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  Card,
  CardContent,
  Container,
  Fade,
} from '@mui/material';
import { cityCountry } from '../helpers/constantHelper';
import WeatherAPI from '../components/WeatherAPI';

// Componente principal mejorado con mejor UX y presentación visual
export default function CityWeather() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value as string);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Card
          className="app-header"
          sx={{
            background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--primary-200) 100%)',
            color: 'var(--neutral-900)',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--primary-200)',
          }}
        >
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mb: 1,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Pronóstico del Clima
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                opacity: 0.9,
                mb: 4,
                fontSize: '1.1rem',
              }}
            >
              Selecciona una ciudad para ver el clima actual y pronóstico
            </Typography>
            
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel 
                  id="city-select-label"
                  sx={{ 
                    color: 'var(--neutral-700)',
                    '&.Mui-focused': { color: 'var(--primary-600)' }
                  }}
                >
                  Seleccionar ciudad
                </InputLabel>
                <Select
                  labelId="city-select-label"
                  value={selectedCity || ''}
                  onChange={handleCityChange}
                  label="Seleccionar ciudad"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'var(--neutral-800)',
                    borderRadius: 'var(--radius-lg)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--neutral-300)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--primary-400)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--primary-600)',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'var(--neutral-600)',
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: 'white',
                        maxHeight: 300,
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--neutral-200)',
                        '& .MuiMenuItem-root': {
                          color: 'var(--neutral-800)',
                          '&:hover': {
                            backgroundColor: 'var(--primary-50)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'var(--primary-100)',
                            '&:hover': {
                              backgroundColor: 'var(--primary-200)',
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  {Object.keys(cityCountry).map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      <Fade in={!!selectedCity} timeout={500}>
        <Box>
          {selectedCity && <WeatherAPI location={selectedCity} />}
        </Box>
      </Fade>
    </Container>
  );
}
