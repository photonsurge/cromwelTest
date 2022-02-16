import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import onSubmitTest from '../../../../__tests/onSubmitTest';
import LoginForm, { ILoginForm } from './LoginForm';

jest.mock('../../../../__tests/onSubmitTest');

describe('<LoginForm />', () => {
  test('it should mount', () => {
    render(<LoginForm onSubmit={onSubmitTest} />);

    const loginLoginForm = screen.getByTestId('LoginForm');

    expect(loginLoginForm).toBeInTheDocument();
  });



  test('it should submit login (good data)', () => {
    const mockedFoo = jest.mocked(onSubmitTest, true)
    const data: ILoginForm = {
      email: 'test@mail.com', password: 'Unsjdklsd01$'
    }

    render(<LoginForm onSubmit={onSubmitTest} />);

    const registerForm = screen.getByTestId('LoginForm');
    expect(registerForm).toBeInTheDocument();


    const inputEl2 = screen.getByTestId("login-form-email");
    userEvent.type(inputEl2, data.email);


    const inputEl3 = screen.getByTestId("login-form-password");
    userEvent.type(inputEl3, data.password);





    const submitBtn = screen.getByTestId('login-form-submit')
    userEvent.click(submitBtn)

    expect(screen.queryByTestId("login-form-error-email")).not.toBeInTheDocument();
    expect(screen.queryByTestId("login-form-error-password")).not.toBeInTheDocument();

    expect(mockedFoo.mock.calls).toHaveLength(1)
  });
  test('it should not submit login (bad email)', () => {
    const mockedFoo = jest.mocked(onSubmitTest, true)
    const data: ILoginForm = {
      email: '', password: 'Unsjdklsd01$'
    }

    render(<LoginForm onSubmit={onSubmitTest} />);

    const registerForm = screen.getByTestId('LoginForm');
    expect(registerForm).toBeInTheDocument();


    const inputEl2 = screen.getByTestId("login-form-email");
    userEvent.type(inputEl2, 'asa');


    const inputEl3 = screen.getByTestId("login-form-password");
    userEvent.type(inputEl3, data.password);



    const submitBtn = screen.getByTestId('login-form-submit')
    userEvent.click(submitBtn)

    expect(screen.queryByTestId("login-form-error-email")).toBeInTheDocument();

    expect(screen.queryByTestId("login-form-error-password")).not.toBeInTheDocument();

    expect(mockedFoo.mock.calls).toHaveLength(0)
  });

  test('it should not submit login (bad email)', () => {
    const mockedFoo = jest.mocked(onSubmitTest, true)


    render(<LoginForm onSubmit={onSubmitTest} />);

    const registerForm = screen.getByTestId('LoginForm');
    expect(registerForm).toBeInTheDocument();





    const submitBtn = screen.getByTestId('login-form-submit')
    userEvent.click(submitBtn)

    expect(screen.queryByTestId("login-form-error-email")).toBeInTheDocument();

    expect(screen.queryByTestId("login-form-error-password")).toBeInTheDocument();

    expect(mockedFoo.mock.calls).toHaveLength(0)
  });
});