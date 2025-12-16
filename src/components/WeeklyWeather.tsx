import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ProcessedWeatherDay } from '../types/weather';
import DayCard from './DayCard';
import DayDetailModal from './DayDetailModal';
import { useLanguage } from '../i18n/LanguageContext';

interface WeeklyWeatherProps {
  days: ProcessedWeatherDay[];
}

export default function WeeklyWeather({ days }: WeeklyWeatherProps) {
  const { t } = useLanguage();
  const theme = useTheme();
  const [selectedDay, setSelectedDay] = useState<ProcessedWeatherDay | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const weekDays = days.slice(0, 7);
  
  const handleDayClick = (day: ProcessedWeatherDay) => {
    setSelectedDay(day);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDay(null);
  };
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          color: '#2d3748',
          textShadow: '0 1px 3px rgba(255, 255, 255, 0.9)'
        }}
      >
        {t.weather.weeklyForecast}
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[200],
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 4,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        }}
      >
        {weekDays.map((day, index) => (
          <Box key={day.datetimeEpoch} sx={{ flexShrink: 0 }}>
            <DayCard 
              day={day} 
              isToday={index === 0}
              onClick={() => handleDayClick(day)}
            />
          </Box>
        ))}
      </Box>
      
      <DayDetailModal
        day={selectedDay}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Box>
  );
}