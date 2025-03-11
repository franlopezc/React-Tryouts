import { Container, Grid } from '@mui/material';
import MapWithColoredCountries from '../components/MapWithColoredCountries';
import CityWeather from '../components/CityWeather';

export default function Home() {
  return (
    <Container>
      <Grid container spacing={1}>
        {/* Fila 1: Mapa esto sera otra vista por lo que por ahora lo ignoro */}
        {/*
        <Grid item xs={12}>
          <MapWithColoredCountries />
        </Grid>
        */}
        {/* Fila 2: Selector de ciudad sin borde */}
        <Grid item xs={12}>
          <CityWeather />
        </Grid>
      </Grid>
    </Container>
  );
}
