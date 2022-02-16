import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import onSubmitTest from '../../../__tests/onSubmitTest';
import RegisterForm, { IRegisterForm } from './RegisterForm';
jest.mock('../../../__tests/onSubmitTest');


describe('<RegisterForm />', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    configure({ adapter: new Adapter() });
    mock = new MockAdapter(axios);
    mock.onGet(`/api/users/checkUser`).reply(200, { ok: true });
  });

  afterEach(() => {
    mock.reset();
  });

  test('it should mount', () => {
    const mockedFoo = jest.mocked(onSubmitTest, true)
    render(<RegisterForm onSubmit={onSubmitTest} />);

    const registerForm = screen.getByTestId('RegisterForm');

    expect(registerForm).toBeInTheDocument();
  });


  test('it should submit (good data)', () => {

    //const mockedFoo = jest.mocked(onSubmitTest, true)
    const mockedFoo = jest.fn();
    const data: IRegisterForm = {
      name: 'test123', email: 'test@mail.com', password: 'Unsjdklsd01$', passwordAgain: 'Unsjdklsd01$'
    }


    // const handleSubmit = jest.fn().mockImplementation((cb) => () => cb({ test: 'test' }));

    // const wrapper = mount(<RegisterForm onSubmit={mockedFoo} />);
    // wrapper.simulate('load');
    // wrapper.debug()
    // //wrapper.find('form').simulate('submit');
    // expect(handleSubmit).toBeCalledTimes(1);



    // userEvent.type(screen.getByTestId("register-form-name"), data.name);
    // userEvent.type(screen.getByTestId("register-form-email"), data.email);
    // userEvent.type(screen.getByTestId("register-form-password"), data.password);
    // userEvent.type(screen.getByTestId("register-form-passwordAgain"), data.password);

    // const submitBtn = screen.getByTestId('register-form-submit')
    // userEvent.click(submitBtn)

    // expect(screen.queryByTestId("register-form-error-name")).not.toBeInTheDocument();
    // expect(screen.queryByTestId("register-form-error-email")).not.toBeInTheDocument();
    // expect(screen.queryByTestId("register-form-error-password")).not.toBeInTheDocument();
    // expect(screen.queryByTestId("register-form-error-passwordAgain")).not.toBeInTheDocument();

    // expect(mockedFoo.mock.calls).toHaveLength(1)

  });



  // test('it should not submit (bad email)', () => {
  //   const mockedFoo = jest.mocked(onSubmitTest, true)
  //   mockAxios.post.mockResolvedValueOnce({ ok: true });
  //   const data: IRegisterForm = {
  //     name: 'test123', email: 'testmail.com', password: 'Unsjdklsd01$', passwordAgain: 'Unsjdklsd01$'
  //   }

  //   render(<RegisterForm onSubmit={onSubmitTest} />);

  //   const registerForm = screen.getByTestId('RegisterForm');
  //   expect(registerForm).toBeInTheDocument();

  //   const inputEl = screen.getByTestId("register-form-name");
  //   userEvent.type(inputEl, data.name);

  //   const inputEl2 = screen.getByTestId("register-form-email");
  //   userEvent.type(inputEl2, data.email);


  //   const inputEl3 = screen.getByTestId("register-form-password");
  //   userEvent.type(inputEl3, data.password);


  //   const inputEl4 = screen.getByTestId("register-form-passwordAgain");
  //   userEvent.type(inputEl4, data.passwordAgain);


  //   const submitBtn = screen.getByTestId('register-form-submit')
  //   userEvent.click(submitBtn)

  //   expect(screen.queryByTestId("register-form-error-name")).not.toBeInTheDocument();
  //   expect(screen.queryByTestId("register-form-error-email")).toBeInTheDocument();
  //   expect(screen.queryByTestId("register-form-error-password")).not.toBeInTheDocument();
  //   expect(screen.queryByTestId("register-form-error-passwordAgain")).not.toBeInTheDocument();

  //   expect(mockedFoo.mock.calls).toHaveLength(0)
  // });



  // test('it should not submit (bad name)', () => {
  //   const mockedFoo = jest.mocked(onSubmitTest, true)
  //   mockAxios.post.mockResolvedValueOnce({ ok: true });
  //   const data: IRegisterForm = {
  //     name: 'test', email: 'test@mail.com', password: 'Unsjdklsd01$', passwordAgain: 'Unsjdklsd01$'
  //   }

  //   render(<RegisterForm onSubmit={onSubmitTest} />);
  //   const registerForm = screen.getByTestId('RegisterForm');
  //   expect(registerForm).toBeInTheDocument();

  //   const inputEl = screen.getByTestId("register-form-name");
  //   userEvent.type(inputEl, data.name);

  //   const inputEl2 = screen.getByTestId("register-form-email");
  //   userEvent.type(inputEl2, data.email);


  //   const inputEl3 = screen.getByTestId("register-form-password");
  //   userEvent.type(inputEl3, data.password);


  //   const inputEl4 = screen.getByTestId("register-form-passwordAgain");
  //   userEvent.type(inputEl4, data.passwordAgain);


  //   userEvent.click(screen.getByTestId('register-form-submit'))

  //   expect(screen.queryByTestId("register-form-error-name")).toBeInTheDocument();
  //   expect(screen.queryByTestId("register-form-error-email")).not.toBeInTheDocument();
  //   expect(screen.queryByTestId("register-form-error-password")).not.toBeInTheDocument();
  //   expect(screen.queryByTestId("register-form-error-passwordAgain")).not.toBeInTheDocument();

  //   expect(mockedFoo.mock.calls).toHaveLength(0)
  //   //  screen.debug()
  // });



  // test('it should not submit (not same password)', () => {
  //   const mockedFoo = jest.mocked(onSubmitTest, true)
  //   mockAxios.post.mockResolvedValueOnce({ ok: true });
  //   const data: IRegisterForm = {
  //     name: 'test123', email: 'test@mail.com', password: 'Unsjdklsd01$', passwordAgain: 'Unsjdklsd01$'
  //   }
  //   // const spy = jest.spyOn(onSubmit, 'onSubmit');
  //   render(<RegisterForm onSubmit={onSubmitTest} />);

  //   expect(screen.getByTestId('RegisterForm')).toBeInTheDocument();

  //   userEvent.type(screen.getByTestId("register-form-name"), data.name);

  //   userEvent.type(screen.getByTestId("register-form-email"), data.email);


  //   userEvent.type(screen.getByTestId("register-form-password"), data.password);


  //   userEvent.type(screen.getByTestId("register-form-passwordAgain"), data.password + "1");


  //   const submitBtn = screen.getByTestId('register-form-submit')
  //   userEvent.click(submitBtn)


  //   expect(screen.queryByTestId("register-form-error-name")).not.toBeInTheDocument();
  //   expect(screen.queryByTestId("register-form-error-email")).not.toBeInTheDocument();
  //   expect(screen.queryByTestId("register-form-error-password")).not.toBeInTheDocument();
  //   expect(screen.queryByTestId("register-form-error-passwordAgain")).toBeInTheDocument();

  //   expect(mockedFoo.mock.calls).toHaveLength(0)
  // });
});