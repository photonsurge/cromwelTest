import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import SecureUsers from './SecureUsers';

describe('<SecureUsers />', () => {
  test('it should mount', () => {
    render(<BrowserRouter><Provider store={store}><SecureUsers /></Provider></BrowserRouter>);

    const secureUsers = screen.getByTestId('SecureUsers');

    expect(secureUsers).toBeInTheDocument();
  });
});


describe('<SecureUsers2 />', () => {
  test('it should mount', () => {



    // render(<>);

    // const secureUsers = screen.getByTestId('SecureUsers');

    // expect(secureUsers).toBeInTheDocument();
  });
});