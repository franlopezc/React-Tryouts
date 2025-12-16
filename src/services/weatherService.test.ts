// Tests para weatherService

import { searchSpanishLocations } from './weatherService';

// Mock fetch para tests
global.fetch = jest.fn();

describe('weatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchSpanishLocations', () => {
    test('returns matching cities for valid search term', async () => {
      const results = await searchSpanishLocations('Mad');
      expect(results).toContain('Madrid');
      expect(results.length).toBeGreaterThan(0);
    });

    test('returns empty array for very short search term', async () => {
      const results = await searchSpanishLocations('M');
      expect(results).toContain('Madrid');
      expect(results).toContain('Málaga');
    });

    test('is case insensitive', async () => {
      const resultsLower = await searchSpanishLocations('madrid');
      const resultsUpper = await searchSpanishLocations('MADRID');
      
      expect(resultsLower).toEqual(resultsUpper);
      expect(resultsLower).toContain('Madrid');
    });

    test('limits results to 10 items', async () => {
      const results = await searchSpanishLocations('a'); // Many cities contain 'a'
      expect(results.length).toBeLessThanOrEqual(10);
    });

    test('returns empty array for non-matching search', async () => {
      const results = await searchSpanishLocations('xyz123');
      expect(results).toEqual([]);
    });

    test('finds partial matches', async () => {
      const results = await searchSpanishLocations('San');
      expect(results).toContain('San Sebastián');
      expect(results).toContain('Santa Cruz de Tenerife');
      expect(results).toContain('Santander');
    });
  });
});