import { useState } from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { cityCountry } from '../helpers/constantHelper';
import WeatherAPI from '../components/WeatherAPI';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [darkMode] = useState(false);

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value as string);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{
          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#37474F',
          color: 'white',
          padding: 3,
          marginTop: '10px',
          maxWidth: '100%',
          width: '100%',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: '3rem',
          }}
        >
          Select a City
        </Typography>
        <FormControl variant="outlined">
          <InputLabel id="city-select-label">City</InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity || ''}
            onChange={handleCityChange}
            label="City"
            sx={{
              backgroundColor: darkMode ? '#424242' : 'white',
              color: darkMode ? 'white' : 'black',
              minWidth: 200,
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: darkMode ? '#424242' : 'white',
                  color: darkMode ? 'white' : 'black',
                },
              },
            }}
          >
            {Object.keys(cityCountry).map((city) => (
              <MenuItem
                key={city}
                value={city}
                sx={{
                  backgroundColor: darkMode ? '#424242' : 'white',
                  color: darkMode ? 'white' : 'black',
                }}
              >
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectedCity && <WeatherAPI location={selectedCity} />}
    </Box>
  );
}
