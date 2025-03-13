import { Container, Grid } from '@mui/material';
import CityWeather from '../components/CityWeather';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 0 }}>
      <Grid container spacing={0}>
        {/* Left Column - Complementary Background */}
        {/* Center Content - Main Section */}
        <Grid item xs={10} sx={{ minHeight: '100vh' }}>
          <CityWeather />
        </Grid>

        {/* Right Column - Complementary Background */}
      </Grid>
    </Container>
  );
}
