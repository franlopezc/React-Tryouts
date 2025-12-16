// Componente de navegación por pestañas

import React from 'react';
import { Tabs, Tab, Box, Paper } from '@mui/material';
import { MapPin, Search } from 'lucide-react';

interface NavigationTabsProps {
  currentTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ currentTab, onTabChange }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        borderRadius: 'var(--radius-xl)',
        background: 'var(--gradient-card)',
        border: '1px solid var(--neutral-200)',
        mb: 3
      }}
    >
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
            label="Provincias"
            sx={{ minWidth: 150 }}
          />
          <Tab
            icon={<Search size={20} />}
            iconPosition="start"
            label="Mi Localidad"
            sx={{ minWidth: 150 }}
          />
        </Tabs>
      </Box>
    </Paper>
  );
};

export default NavigationTabs;