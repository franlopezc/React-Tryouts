// Componente de navegación por pestañas

import React from 'react';
import { Tabs, Tab, Box, Paper } from '@mui/material';
import { MapPin, Search } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface NavigationTabsProps {
  currentTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ currentTab, onTabChange }) => {
  const { t } = useLanguage();
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        borderRadius: 'var(--radius-xl)',
        background: 'var(--gradient-card)',
        border: '1px solid var(--neutral-200)',
        mb: 3,
        position: 'relative'
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
        <LanguageSelector />
      </Box>
      
      <Box sx={{ p: 1 }}>
        <Tabs
          value={currentTab}
          onChange={onTabChange}
          centered
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--primary-600)',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              minHeight: 60,
              borderRadius: 'var(--radius-lg)',
              margin: '0 4px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'var(--primary-50)',
              },
              '&.Mui-selected': {
                color: 'var(--primary-700)',
                backgroundColor: 'var(--primary-100)',
              },
            },
          }}
        >
          <Tab
            icon={<MapPin size={20} />}
            iconPosition="start"
            label={t.nav.provinces}
            sx={{ minWidth: 150 }}
          />
          <Tab
            icon={<Search size={20} />}
            iconPosition="start"
            label={t.nav.myLocation}
            sx={{ minWidth: 150 }}
          />
        </Tabs>
      </Box>
    </Paper>
  );
};

export default NavigationTabs;