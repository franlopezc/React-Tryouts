import { useState } from 'react';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  CssBaseline,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { cityCountry } from '../helpers/constantHelper';
import { WeatherAPI } from './weatherAPI';

export default function Layout() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value as string);
  };

  return (
    <>
      <CssBaseline />
      <div style={{ minHeight: '100vh', color: darkMode ? 'white' : 'black' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="home" href="/">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Weather App
            </Typography>
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
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
      </div>
    </>
  );
}
