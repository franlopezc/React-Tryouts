import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import LanguageSelector from './LanguageSelector';
import { LanguageProvider } from '../i18n/LanguageContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('LanguageSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('es');
  });

  it('renders both language flags', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );
    
    expect(screen.getByLabelText('Cambiar a español')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch to English')).toBeInTheDocument();
  });

  it('shows Spanish flag as active by default', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );
    
    const spanishFlag = screen.getByLabelText('Cambiar a español');
    const englishFlag = screen.getByLabelText('Switch to English');
    
    expect(spanishFlag).toHaveStyle('opacity: 1');
    expect(englishFlag).toHaveStyle('opacity: 0.6');
  });

  it('switches to English when English flag is clicked', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );
    
    const englishFlag = screen.getByLabelText('Switch to English');
    fireEvent.click(englishFlag);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('weather-app-language', 'en');
  });

  it('switches to Spanish when Spanish flag is clicked', () => {
    localStorageMock.getItem.mockReturnValue('en');
    
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );
    
    const spanishFlag = screen.getByLabelText('Cambiar a español');
    fireEvent.click(spanishFlag);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('weather-app-language', 'es');
  });

  it('updates visual state when language changes', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );
    
    const spanishFlag = screen.getByLabelText('Cambiar a español');
    const englishFlag = screen.getByLabelText('Switch to English');
    
    // Initially Spanish is active
    expect(spanishFlag).toHaveStyle('opacity: 1');
    expect(englishFlag).toHaveStyle('opacity: 0.6');
    
    // Click English
    fireEvent.click(englishFlag);
    
    // Now English should be active
    expect(spanishFlag).toHaveStyle('opacity: 0.6');
    expect(englishFlag).toHaveStyle('opacity: 1');
  });

  it('flags are keyboard accessible', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );
    
    const spanishFlag = screen.getByLabelText('Cambiar a español');
    const englishFlag = screen.getByLabelText('Switch to English');
    
    expect(spanishFlag).toHaveAttribute('tabIndex', '0');
    expect(englishFlag).toHaveAttribute('tabIndex', '0');
  });
});