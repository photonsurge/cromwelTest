import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import Home from './Home';

describe('<Home />', () => {
  test('it should mount', () => {
    render(<BrowserRouter><Provider store={store}><Home /></Provider></BrowserRouter>);

    const home = screen.getByTestId('Home');

    expect(home).toBeInTheDocument();
  });
});