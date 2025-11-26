import React from 'react';
import { render, screen } from '@testing-library/react';
import AmpRack from '../../components/AmpRack';

describe('AmpRack Component', () => {
  test('renders AmpRack component', () => {
    render(<AmpRack />);
    const ampRackElement = screen.getByTestId('amp-rack');
    expect(ampRackElement).toBeInTheDocument();
  });

  test('displays the correct title', () => {
    render(<AmpRack />);
    const titleElement = screen.getByText(/Amplifier Rack/i);
    expect(titleElement).toBeInTheDocument();
  });

  // Add more tests as needed
});