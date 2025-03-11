import { Container, Grid } from '@mui/material';
import CityWeather from '../components/CityWeather';

export default function Home() {
  return (
    <Container sx={{ paddingTop: 0 }}>
      <Grid container spacing={1}>
        {/* Fila 1: Mapa esto sera otra vista por lo que por ahora lo ignoro */}
        {/*
        <Grid item xs={12}>
          <MapWithColoredCountries />
        </Grid>
        */}
        {/* Fila 2: Selector de ciudad sin borde */}
        <Grid item xs={12} sx={{ marginTop: 0, paddingTop: 0 }}>
          <CityWeather />
        </Grid>
      </Grid>
    </Container>
  );
}
