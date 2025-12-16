import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import WeeklyWeather from './WeeklyWeather';
import { ProcessedWeatherDay } from '../types/weather';

// Mock del modal
vi.mock('./DayDetailModal', () => ({
  default: ({ day, open, onClose }: any) => (
    open ? (
      <div data-testid="day-detail-modal" role="dialog">
        <h2>{day?.conditions}</h2>
        <button onClick={onClose}>Cerrar</button>
      </div>
    ) : null
  ),
}));

const mockDays: ProcessedWeatherDay[] = [
  {
    datetime: '2024-01-15',
    datetimeEpoch: 1705276800,
    temp: 20,
    tempmax: 25,
    tempmin: 15,
    feelslike: 22,
    humidity: 65,
    precipprob: 10,
    windspeed: 12,
    pressure: 1013,
    uvindex: 5,
    conditions: 'Partly Cloudy',
    icon: 'partly-cloudy-day',
    hours: [],
  },
  {
    datetime: '2024-01-16',
    datetimeEpoch: 1705363200,
    temp: 18,
    tempmax: 22,
    tempmin: 12,
    feelslike: 19,
    humidity: 70,
    precipprob: 30,
    windspeed: 15,
    pressure: 1010,
    uvindex: 4,
    conditions: 'Rainy',
    icon: 'rain',
    hours: [],
  },
];

describe('WeeklyWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders weekly forecast correctly', () => {
    render(<WeeklyWeather days={mockDays} />);
    
    expect(screen.getByText('📅 Pronóstico de 7 días')).toBeInTheDocument();
    expect(screen.getByText('Hoy')).toBeInTheDocument();
    expect(screen.getByText('25°')).toBeInTheDocument();
    expect(screen.getByText('15°')).toBeInTheDocument();
  });

  it('makes day cards clickable with proper cursor', () => {
    render(<WeeklyWeather days={mockDays} />);
    
    const dayCards = screen.getAllByRole('button');
    expect(dayCards).toHaveLength(2);
    
    dayCards.forEach(card => {
      expect(card).toHaveStyle('cursor: pointer');
    });
  });

  it('opens modal when day card is clicked', async () => {
    render(<WeeklyWeather days={mockDays} />);
    
    const firstDayCard = screen.getAllByRole('button')[0];
    fireEvent.click(firstDayCard);
    
    await waitFor(() => {
      expect(screen.getByTestId('day-detail-modal')).toBeInTheDocument();
      expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
    });
  });

  it('applies temperature gradient classes correctly', () => {
    render(<WeeklyWeather days={mockDays} />);
    
    const dayCards = screen.getAllByRole('button');
    
    // First day (20°C) should have mild gradient
    expect(dayCards[0]).toHaveClass('temp-gradient-mild');
    
    // Second day (18°C) should have mild gradient  
    expect(dayCards[1]).toHaveClass('temp-gradient-mild');
  });

  it('maintains layout stability when modal opens', async () => {
    render(<WeeklyWeather days={mockDays} />);
    
    const container = screen.getByText('📅 Pronóstico de 7 días').parentElement;
    const initialRect = container?.getBoundingClientRect();
    
    // Open modal
    const firstDayCard = screen.getAllByRole('button')[0];
    fireEvent.click(firstDayCard);
    
    await waitFor(() => {
      expect(screen.getByTestId('day-detail-modal')).toBeInTheDocument();
    });
    
    // Layout should not have moved
    const finalRect = container?.getBoundingClientRect();
    expect(finalRect?.top).toBe(initialRect?.top);
    expect(finalRect?.left).toBe(initialRect?.left);
  });

  it('closes modal when close button is clicked', async () => {
    render(<WeeklyWeather days={mockDays} />);
    
    // Open modal
    const firstDayCard = screen.getAllByRole('button')[0];
    fireEvent.click(firstDayCard);
    
    await waitFor(() => {
      expect(screen.getByTestId('day-detail-modal')).toBeInTheDocument();
    });
    
    // Close modal
    const closeButton = screen.getByText('Cerrar');
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByTestId('day-detail-modal')).not.toBeInTheDocument();
    });
  });
});