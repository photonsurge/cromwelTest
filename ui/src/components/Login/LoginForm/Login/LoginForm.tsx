import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { composeValidators, mustBeEmail, required } from '../../../validators';

export interface ILoginForm {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: any) => void;
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const formName: string = 'login-form'
  const onSubmit = (data: any) => {
    props.onSubmit(data);
  }
  return <div data-testid="LoginForm">
    <Form <ILoginForm>
      onSubmit={onSubmit}
      render={({ handleSubmit, validating }) => (
        <form onSubmit={handleSubmit}>

          <div className='row'> <div className='col-12 col-md-6 offset-md-3'><h2>Log In</h2></div>

            <Field name="email" component="input" validate={composeValidators(required, mustBeEmail)}>
              {({ input, meta }) => (
                <div className='col-12 col-md-6 offset-md-3'>
                  <label>Email</label>
                  <input data-testid={`${formName}-${input.name}`} id={`${formName}-${input.name}`} className='form-control' type="text" {...input} placeholder="Email" />
                  {meta.touched && meta.error && <p className='text-danger'>{meta.error}</p>}
                </div>
              )}
            </Field>
            <Field name="password" component="input" validate={composeValidators(required)}>
              {({ input, meta }) => (
                <div className='col-12 col-md-6 offset-md-3'>
                  <label>Password</label>
                  <input data-testid={`${formName}-${input.name}`} id={`${formName}-${input.name}`} className='form-control' type="password" {...input} />
                  {meta.touched && meta.error && <p className='text-danger'>{meta.error}</p>}
                </div>
              )}
            </Field>

            <div className='col-12 col-md-6 offset-md-3 text-center'>
              <button data-testid={`${formName}-submit`} disabled={validating} className='btn btn-primary' type="submit">Register</button>
            </div>


          </div>



        </form>
      )}
    />
  </div>
};

export default LoginForm;
