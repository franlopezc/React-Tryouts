import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <IconButton
        onClick={() => setLanguage('es')}
        aria-label="Cambiar a español"
        sx={{
          fontSize: '1.5rem',
          opacity: language === 'es' ? 1 : 0.6,
          transition: 'opacity 0.2s ease',
          '&:hover': {
            opacity: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        🇪🇸
      </IconButton>
      <IconButton
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
        sx={{
          fontSize: '1.5rem',
          opacity: language === 'en' ? 1 : 0.6,
          transition: 'opacity 0.2s ease',
          '&:hover': {
            opacity: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        🇬🇧
      </IconButton>
    </Box>
  );
}