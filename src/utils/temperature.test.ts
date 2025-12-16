// Tests para utilidades de temperatura

import { fahrenheitToCelsius, celsiusToFahrenheit, formatTemperature } from './temperature';

describe('Temperature utilities', () => {
  describe('fahrenheitToCelsius', () => {
    test('converts freezing point correctly', () => {
      expect(fahrenheitToCelsius(32)).toBe(0);
    });

    test('converts boiling point correctly', () => {
      expect(fahrenheitToCelsius(212)).toBe(100);
    });

    test('converts room temperature correctly', () => {
      expect(fahrenheitToCelsius(68)).toBe(20);
    });

    test('converts negative temperatures correctly', () => {
      expect(fahrenheitToCelsius(-4)).toBe(-20);
    });

    test('rounds to one decimal place', () => {
      expect(fahrenheitToCelsius(75)).toBe(23.9);
    });
  });

  describe('celsiusToFahrenheit', () => {
    test('converts freezing point correctly', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
    });

    test('converts boiling point correctly', () => {
      expect(celsiusToFahrenheit(100)).toBe(212);
    });

    test('converts room temperature correctly', () => {
      expect(celsiusToFahrenheit(20)).toBe(68);
    });

    test('converts negative temperatures correctly', () => {
      expect(celsiusToFahrenheit(-20)).toBe(-4);
    });
  });

  describe('formatTemperature', () => {
    test('formats positive temperature correctly', () => {
      expect(formatTemperature(25)).toBe('25°C');
    });

    test('formats negative temperature correctly', () => {
      expect(formatTemperature(-5)).toBe('-5°C');
    });

    test('formats zero temperature correctly', () => {
      expect(formatTemperature(0)).toBe('0°C');
    });

    test('formats decimal temperature correctly', () => {
      expect(formatTemperature(23.5)).toBe('23.5°C');
    });
  });
});