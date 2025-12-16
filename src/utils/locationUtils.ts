// Utilidades para extraer información de localización

/**
 * Extrae la provincia/región del address devuelto por la API
 * @param address Dirección completa de la API
 * @returns Provincia o región extraída
 */
export const extractProvince = (address: string): string | null => {
  if (!address) return null;
  
  // Patrones comunes en España: "Ciudad, Provincia, España" o "Ciudad, Provincia"
  const parts = address.split(',').map(part => part.trim());
  
  // Si tiene formato "Ciudad, Provincia, España"
  if (parts.length >= 3 && parts[parts.length - 1].toLowerCase().includes('españa')) {
    return parts[parts.length - 2];
  }
  
  // Si tiene formato "Ciudad, Provincia"
  if (parts.length >= 2) {
    return parts[parts.length - 1];
  }
  
  return null;
};