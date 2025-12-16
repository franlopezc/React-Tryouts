require('@testing-library/jest-dom');

// Polyfills for jsdom
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock para import.meta.env
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_WEATHER_API_KEY: 'test-api-key',
        VITE_SUPABASE_URL: 'test-supabase-url',
        VITE_SUPABASE_KEY: 'test-supabase-key',
      },
    },
  },
  writable: true,
});
