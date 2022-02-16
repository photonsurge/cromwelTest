import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import Secure from './Secure';

describe('<Secure />', () => {
  test('it should mount', () => {
    render(<BrowserRouter><Provider store={store}><Secure /></Provider></BrowserRouter>);

    const secure = screen.getByTestId('Secure');

    expect(secure).toBeInTheDocument();
  });
});