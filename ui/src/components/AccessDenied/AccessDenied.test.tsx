import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AccessDenied from './AccessDenied';

describe('<AccessDenied />', () => {
  test('it should mount', () => {
    render(<BrowserRouter><AccessDenied /></BrowserRouter>);

    const accessDenied = screen.getByTestId('AccessDenied');

    expect(accessDenied).toBeInTheDocument();
  });
});