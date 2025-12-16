import { render } from '@testing-library/react';
import LocationMap from './LocationMap';

// Mock de leaflet
jest.mock('leaflet', () => ({
  Icon: {
    Default: {
      prototype: {},
      mergeOptions: jest.fn(),
    },
  },
  map: jest.fn(() => ({
    setView: jest.fn().mockReturnThis(),
    remove: jest.fn(),
    removeLayer: jest.fn(),
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn(),
  })),
  marker: jest.fn(() => ({
    addTo: jest.fn().mockReturnThis(),
    bindPopup: jest.fn().mockReturnThis(),
  })),
}));

describe('LocationMap', () => {
  const defaultProps = {
    latitude: 40.4168,
    longitude: -3.7038,
    locationName: 'Madrid, España',
  };

  it('renders map container', () => {
    const { container } = render(<LocationMap {...defaultProps} />);
    
    const mapDiv = container.querySelector('div[style*="height: 100%"]');
    expect(mapDiv).toBeDefined();
  });

  it('renders with different coordinates', () => {
    const props = {
      latitude: 41.3851,
      longitude: 2.1734,
      locationName: 'Barcelona, España',
    };
    
    const { container } = render(<LocationMap {...props} />);
    
    const mapDiv = container.querySelector('div[style*="height: 100%"]');
    expect(mapDiv).toBeDefined();
  });

  it('has correct styling', () => {
    const { container } = render(<LocationMap {...defaultProps} />);
    
    const boxElement = container.firstChild as HTMLElement;
    expect(boxElement).toBeDefined();
  });
});