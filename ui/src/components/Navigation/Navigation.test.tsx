import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import Navigation from './Navigation';

describe('<Navigation />', () => {
  test('it should mount', () => {
    render(<BrowserRouter><Provider store={store}><Navigation /></Provider></BrowserRouter>);

    const navigation = screen.getByTestId('Navigation');

    expect(navigation).toBeInTheDocument();
    // screen.debug();
  });

  test('it should display register and login (not logged in)', () => {
    render(<BrowserRouter><Provider store={store}><Navigation /></Provider></BrowserRouter>);

    const navigation = screen.getByTestId('Navigation');

    expect(navigation).toBeInTheDocument();



    expect(screen.getByTestId('register')).toBeInTheDocument();
    expect(screen.getByTestId('login')).toBeInTheDocument();


  });
});