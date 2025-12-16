// Utilidades para conversión de temperatura con tipado estricto

/**
 * Convierte Fahrenheit a Celsius
 * @param fahrenheit Temperatura en Fahrenheit
 * @returns Temperatura en Celsius redondeada a 1 decimal
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return Math.round(((fahrenheit - 32) * 5) / 9 * 10) / 10;
};

/**
 * Convierte Celsius a Fahrenheit
 * @param celsius Temperatura en Celsius
 * @returns Temperatura en Fahrenheit redondeada a 1 decimal
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9 / 5 + 32) * 10) / 10;
};

/**
 * Formatea temperatura para mostrar
 * @param temp Temperatura en Celsius
 * @returns String formateado con símbolo de grados
 */
export const formatTemperature = (temp: number): string => {
  return `${temp}°C`;
};