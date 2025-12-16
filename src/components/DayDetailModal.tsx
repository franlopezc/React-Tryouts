import React, { useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Grid,
  Fade,
  Backdrop,
} from '@mui/material';
import { X } from 'lucide-react';
import { ProcessedWeatherDay } from '../types/weather';
import { renderWeatherIcon } from '../helpers/weatherFunctionHelper';
import { getTemperatureRange } from '../utils/temperatureColors';
import ModalPortal from './ModalPortal';
import { useLanguage } from '../i18n/LanguageContext';

interface DayDetailModalProps {
  day: ProcessedWeatherDay | null;
  open: boolean;
  onClose: () => void;
}

export default function DayDetailModal({ day, open, onClose }: DayDetailModalProps) {
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  if (!day) return null;

  const tempRange = getTemperatureRange(day.temp);
  const gradientClass = `temp-gradient-${tempRange}`;
  
  const formatDate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <ModalPortal>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
        }}
        aria-labelledby="day-detail-title"
        aria-describedby="day-detail-description"
      >
        <Fade in={open} timeout={300}>
          <Box
            className={gradientClass}
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 600 },
              maxHeight: '90vh',
              overflow: 'auto',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              p: 4,
              outline: 'none',
              zIndex: 1300,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Typography
                id="day-detail-title"
                variant="h4"
                sx={{ fontWeight: 'bold', textTransform: 'capitalize', color: '#2d3748' }}
              >
                {formatDate(day.datetime)}
              </Typography>
              <IconButton
                onClick={onClose}
                aria-label={t.common.close}
                sx={{
                  color: '#4a5568',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <X size={24} />
              </IconButton>
            </Box>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ mb: 2 }}>
                {renderWeatherIcon(day.icon, 100)}
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 'bold', mb: 1, color: '#2d3748' }}
              >
                {Math.round(day.tempmax)}° / {Math.round(day.tempmin)}°
              </Typography>
              <Typography
                variant="h6"
                sx={{ textTransform: 'capitalize', color: '#4a5568' }}
              >
                {day.conditions}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={6} sm={4}>
                <Box sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
                  <Typography variant="body2" sx={{ color: '#718096' }}>
                    {t.weather.thermalSensation}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
                    {Math.round(day.feelslike)}°C
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Box sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
                  <Typography variant="body2" sx={{ color: '#718096' }}>
                    {t.weather.rainProbability}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
                    {Math.round(day.precipprob)}%
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Box sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
                  <Typography variant="body2" sx={{ color: '#718096' }}>
                    {t.weather.humidity}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
                    {Math.round(day.humidity)}%
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Box sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
                  <Typography variant="body2" sx={{ color: '#718096' }}>
                    {t.weather.wind}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
                    {Math.round(day.windspeed)} km/h
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Box sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
                  <Typography variant="body2" sx={{ color: '#718096' }}>
                    {t.weather.pressure}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
                    {Math.round(day.pressure)} hPa
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Box sx={{ p: 2, borderRadius: 2, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(255, 255, 255, 0.4)' }}>
                  <Typography variant="body2" sx={{ color: '#718096' }}>
                    {t.weather.uvIndex}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
                    {Math.round(day.uvindex)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </ModalPortal>
  );
}