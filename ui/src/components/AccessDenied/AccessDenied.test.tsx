import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccessDenied from './AccessDenied';

describe('<AccessDenied />', () => {
  test('it should mount', () => {
    render(<AccessDenied />);
    
    const accessDenied = screen.getByTestId('AccessDenied');

    expect(accessDenied).toBeInTheDocument();
  });
});