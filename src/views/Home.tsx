import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import NavigationTabs from '../components/NavigationTabs';
import ProvincesPage from '../pages/ProvincesPage';
import MyLocationPage from '../pages/MyLocationPage';

// Vista principal refactorizada con navegación por pestañas
const Home: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box 
      className="app-container"
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--neutral-50) 0%, var(--primary-50) 50%, var(--primary-100) 100%)',
        py: 3,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <NavigationTabs 
          currentTab={currentTab} 
          onTabChange={handleTabChange} 
        />
        
        {currentTab === 0 && <ProvincesPage />}
        {currentTab === 1 && <MyLocationPage />}
      </Container>
    </Box>
  );
};

export default Home;
