import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationMapProps {
  latitude: number;
  longitude: number;
  locationName: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude, locationName }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Crear mapa si no existe
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView([latitude, longitude], 12);

      // Añadir capa de tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstanceRef.current);
    }

    // Actualizar posición del mapa y marcador
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([latitude, longitude], 12);
      
      // Remover marcador anterior si existe
      if (markerRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current);
      }
      
      // Añadir nuevo marcador
      markerRef.current = L.marker([latitude, longitude])
        .addTo(mapInstanceRef.current)
        .bindPopup(locationName);
    }

    // Cleanup al desmontar
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [latitude, longitude, locationName]);

  return (
    <Box
      sx={{
        height: 300,
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        ref={mapRef}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </Box>
  );
};

export default LocationMap;