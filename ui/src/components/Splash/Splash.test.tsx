import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Splash from './Splash';

describe('<Splash />', () => {
  test('it should mount', () => {
    render(<Splash />);
    
    const splash = screen.getByTestId('Splash');

    expect(splash).toBeInTheDocument();
  });
});