import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import Login from './Login';

describe('<Login />', () => {
  test('it should mount', () => {
    render(<BrowserRouter><Provider store={store}><Login /></Provider></BrowserRouter>);

    const login = screen.getByTestId('Login');

    expect(login).toBeInTheDocument();
  });
});