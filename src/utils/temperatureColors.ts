// Utilidades para mapeo de temperatura a rangos de color

export type TemperatureRange = 'very-cold' | 'cold' | 'mild' | 'warm' | 'hot';

/**
 * Determina el rango de temperatura para aplicar colores dinámicos
 * @param temperature Temperatura en Celsius
 * @returns Rango de temperatura para theming
 */
export const getTemperatureRange = (temperature: number): TemperatureRange => {
  if (temperature < 0) return 'very-cold';
  if (temperature < 10) return 'cold';
  if (temperature < 20) return 'mild';
  if (temperature < 30) return 'warm';
  return 'hot';
};

/**
 * Obtiene descripción legible del rango de temperatura
 * @param range Rango de temperatura
 * @returns Descripción en español
 */
export const getTemperatureDescription = (range: TemperatureRange): string => {
  const descriptions = {
    'very-cold': 'Muy frío',
    'cold': 'Frío',
    'mild': 'Templado',
    'warm': 'Caliente',
    'hot': 'Muy caliente'
  };
  return descriptions[range];
};

/**
 * Obtiene emoji representativo del rango de temperatura
 * @param range Rango de temperatura
 * @returns Emoji correspondiente
 */
export const getTemperatureEmoji = (range: TemperatureRange): string => {
  const emojis = {
    'very-cold': '🥶',
    'cold': '❄️',
    'mild': '🌤️',
    'warm': '☀️',
    'hot': '🔥'
  };
  return emojis[range];
};

/**
 * Obtiene la clase CSS para el rango de temperatura
 * @param temperature Temperatura en Celsius
 * @returns Clase CSS para aplicar estilos por temperatura
 */
export const getTemperatureClass = (temperature: number): string => {
  const range = getTemperatureRange(temperature);
  return `temp-${range}`;
};

/**
 * Aplica el rango de temperatura al documento para CSS dinámico
 * @param temperature Temperatura en Celsius
 */
export const applyTemperatureTheme = (temperature: number): void => {
  const range = getTemperatureRange(temperature);
  document.documentElement.setAttribute('data-temp-range', range);
};