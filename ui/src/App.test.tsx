import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';

test('renders learn react link', () => {
  render(<BrowserRouter> <Provider store={store}><App /></Provider></BrowserRouter>);
  const linkElement = screen.getByText(/App Loads/i);
  expect(linkElement).toBeInTheDocument();
});
