import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test component
function TestComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <span data-testid="nav-provinces">{t.nav.provinces}</span>
      <button onClick={() => setLanguage('en')} data-testid="switch-to-english">
        Switch to English
      </button>
      <button onClick={() => setLanguage('es')} data-testid="switch-to-spanish">
        Switch to Spanish
      </button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('defaults to Spanish when no language is stored', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
    expect(screen.getByTestId('nav-provinces')).toHaveTextContent('Clima por Provincias');
  });

  it('uses stored language from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('en');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-provinces')).toHaveTextContent('Weather by Provinces');
  });

  it('changes language and saves to localStorage', () => {
    localStorageMock.getItem.mockReturnValue('es');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    // Initially Spanish
    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
    expect(screen.getByTestId('nav-provinces')).toHaveTextContent('Clima por Provincias');
    
    // Switch to English
    fireEvent.click(screen.getByTestId('switch-to-english'));
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-provinces')).toHaveTextContent('Weather by Provinces');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('weather-app-language', 'en');
  });

  it('switches back to Spanish', () => {
    localStorageMock.getItem.mockReturnValue('en');
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    // Initially English
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    
    // Switch to Spanish
    fireEvent.click(screen.getByTestId('switch-to-spanish'));
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('es');
    expect(screen.getByTestId('nav-provinces')).toHaveTextContent('Clima por Provincias');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('weather-app-language', 'es');
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within a LanguageProvider');
    
    consoleSpy.mockRestore();
  });
});