import { useState } from 'react';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
  Container,
  Typography,
} from '@mui/material';
import { cityCountry } from '../helpers/constantHelper';
import { WeatherAPI } from '../components/WeatherAPI';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [darkMode] = useState(false);

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value as string);
  };

  return (
    <>
      <Container>
        <Box
          mt={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={3}
            border={1}
            borderColor={darkMode ? 'grey.500' : 'grey.300'}
            borderRadius={4}
            bgcolor={darkMode ? 'grey.800' : 'white'}
            color={darkMode ? 'white' : 'black'}
            style={{ maxWidth: '100%', width: 'auto', minWidth: 300 }}
          >
            <Typography variant="h2" gutterBottom>
              Select a City
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="city-select-label">City</InputLabel>
              <Select
                labelId="city-select-label"
                value={selectedCity || ''}
                onChange={handleCityChange}
                style={{
                  backgroundColor: darkMode ? '#424242' : 'white',
                  color: darkMode ? 'white' : 'black',
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
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
                    style={{
                      backgroundColor: darkMode ? '#424242' : 'white',
                      color: darkMode ? 'white' : 'black',
                    }}
                  >
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedCity && <WeatherAPI location={selectedCity} />}
          </Box>
        </Box>
      </Container>
    </>
  );
}
