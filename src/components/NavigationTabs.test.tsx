// Tests para NavigationTabs

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationTabs from './NavigationTabs';

describe('NavigationTabs', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  test('renders both tabs correctly', () => {
    render(<NavigationTabs currentTab={0} onTabChange={mockOnTabChange} />);
    
    expect(screen.getByText('Provincias')).toBeInTheDocument();
    expect(screen.getByText('Mi Localidad')).toBeInTheDocument();
  });

  test('shows first tab as selected initially', () => {
    render(<NavigationTabs currentTab={0} onTabChange={mockOnTabChange} />);
    
    const provincesTab = screen.getByRole('tab', { name: /provincias/i });
    expect(provincesTab).toHaveAttribute('aria-selected', 'true');
  });

  test('shows second tab as selected when currentTab is 1', () => {
    render(<NavigationTabs currentTab={1} onTabChange={mockOnTabChange} />);
    
    const myLocationTab = screen.getByRole('tab', { name: /mi localidad/i });
    expect(myLocationTab).toHaveAttribute('aria-selected', 'true');
  });

  test('calls onTabChange when clicking on second tab', () => {
    render(<NavigationTabs currentTab={0} onTabChange={mockOnTabChange} />);
    
    const myLocationTab = screen.getByRole('tab', { name: /mi localidad/i });
    fireEvent.click(myLocationTab);
    
    expect(mockOnTabChange).toHaveBeenCalledTimes(1);
  });

  test('calls onTabChange when clicking on first tab', () => {
    render(<NavigationTabs currentTab={1} onTabChange={mockOnTabChange} />);
    
    const provincesTab = screen.getByRole('tab', { name: /provincias/i });
    fireEvent.click(provincesTab);
    
    expect(mockOnTabChange).toHaveBeenCalledTimes(1);
  });
});