import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import WeatherAPI from './WeatherAPI';
import dotenv from 'dotenv';

dotenv.config();
const mockWeatherData = {
  days: [
    {
      hours: [
        {
          datetime: '14:00:00',
          datetimeEpoch: 1738760400,
          temp: 54.6,
          feelslike: 54.6,
          humidity: 30.99,
          dew: 24.5,
          precip: 0.0,
          precipprob: 0.0,
          snow: 0.0,
          snowdepth: 0.0,
          preciptype: null,
          windgust: 8.7,
          windspeed: 2.2,
          winddir: 54.9,
          pressure: 1033.0,
          visibility: 15.0,
          cloudcover: 0.0,
          solarradiation: 591.0,
          solarenergy: 2.1,
          uvindex: 6.0,
          severerisk: 10.0,
          conditions: 'Clear',
          icon: 'clear-day',
          stations: null,
          source: 'fcst',
        },
      ],
    },
  ],
};

jest.mock('../helpers/interfaceHelper', () => ({
  WeatherData: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockWeatherData),
  })
) as jest.Mock;

describe('WeatherAPI', () => {
  test('shows loading message while fetching data', () => {
    render(<WeatherAPI location="City,Country" />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('shows weather data when fetched successfully', async () => {
    render(<WeatherAPI location="City,Country" />);
    await waitFor(() =>
      expect(screen.getByText(/Weather Data for UserName/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/Clear/i)).toBeInTheDocument();
  });

  test('shows error message when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));
    render(<WeatherAPI location="City,Country" />);
    await waitFor(() =>
      expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument()
    );
  });
});
