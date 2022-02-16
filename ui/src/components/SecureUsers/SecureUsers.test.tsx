import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import SecureUsers, { DisplayUsers } from './SecureUsers';

describe('<SecureUsers />', () => {
  test('it should mount', () => {
    render(<BrowserRouter><Provider store={store}><SecureUsers /></Provider></BrowserRouter>);

    const secureUsers = screen.getByTestId('SecureUsers');

    expect(secureUsers).toBeInTheDocument();
  });
});


describe('<SecureUsers2 />', () => {
  test('it should mount', () => {

    const a: any = { name: 'a', email: 'a@a.com', _id: '1', created: 'test' }

    render(<DisplayUsers users={[{ ...a, _id: '1' }, { ...a, _id: '2' }, { ...a, _id: '3' }]} />);

    const secureUsers = screen.getByTestId('DisplayUsers');

    expect(secureUsers).toBeInTheDocument();


    const users = screen.getAllByTestId('user_name');
    expect(users.length).toEqual(3)


  });
});