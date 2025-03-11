import { useState } from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
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
    <Box
      mt={4}
      display="flex"
      flexDirection="column"
      alignItems="left"
      justifyContent="center"
      minHeight="50vh"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        p: 3,
        maxWidth: '100%',
        width: 'auto',
        minWidth: 300,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: 'fantasy',
            fontWeight: 'bold',
            fontSize: '22px',
          }}
        >
          Select a City:
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
      </Stack>
      {selectedCity && <WeatherAPI location={selectedCity} />}
    </Box>
  );
}
