import React, { useState } from 'react';
import { Box, Container, AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import { MapPin, Search } from 'lucide-react';
import ProvincesPage from '../pages/ProvincesPage';
import MyLocationPage from '../pages/MyLocationPage';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';

// Vista principal refactorizada con navegación por pestañas
const Home: React.FC = () => {
  const { t } = useLanguage();
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                height: 3,
              },
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                textTransform: 'none',
                minHeight: 64,
                '&.Mui-selected': {
                  color: 'white',
                },
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                },
              },
            }}
          >
            <Tab
              icon={<MapPin size={20} />}
              iconPosition="start"
              label={t.nav.provinces}
              sx={{ minWidth: 180 }}
            />
            <Tab
              icon={<Search size={20} />}
              iconPosition="start"
              label={t.nav.myLocation}
              sx={{ minWidth: 180 }}
            />
          </Tabs>
          
          <LanguageSelector />
        </Toolbar>
      </AppBar>
      
      <Box 
        sx={{ 
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f1f5f9 100%)',
          py: 3,
          px: 2
        }}
      >
        <Container maxWidth="lg">
          {currentTab === 0 && <ProvincesPage />}
          {currentTab === 1 && <MyLocationPage />}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
