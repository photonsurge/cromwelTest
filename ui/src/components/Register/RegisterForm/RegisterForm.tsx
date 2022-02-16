import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { checkEmail } from '../../../axios/user';
import { composeValidators, minLength, mustBeEmail, passwordValidation, required } from '../../validators';

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
}


interface RegisterFormProps {
  onSubmit: (data: any) => void;
}
const simpleMemoize = (fn: any) => {
  let lastArg: any;
  let lastResult: any;
  return (arg: any) => {
    if (arg !== lastArg) {
      lastArg = arg;
      lastResult = fn(arg);
    }
    return lastResult;
  };
};
const emailAvailable = simpleMemoize(async (value: string) => {
  if (!value) {
    return "Required";
  }
  const checkE = await checkEmail(value);
  console.log(checkE)
  if (checkE === true) {
    return "Username taken!";
  }
});


const RegisterForm: FC<RegisterFormProps> = (props) => {
  const formName: string = 'register-form'
  const onSubmit = (data: any) => {
    props.onSubmit(data);
  }
  const validate = (data: any) => {
    const errors: any = {}

    if (data.password !== data.passwordAgain) {
      errors.passwordAgain = "Passwords do not match"
    }
    return errors;
  }
  return <div data-testid="RegisterForm">
    <Form <IRegisterForm>
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, validating }) => (
        <form onSubmit={handleSubmit}>

          <div className='row'> <div className='col-12 col-md-6 offset-md-3'><h2>Simple Registration</h2></div>
            <Field name="name" component="input" validate={composeValidators(required, minLength(6))}>
              {({ input, meta }) => (
                <div className='col-12 col-md-6 offset-md-3'>
                  <label>Name</label>
                  <input data-testid={`${formName}-${input.name}`} id={`${formName}-${input.name}`} className='form-control' type="text" {...input} placeholder="Name" />
                  {meta.touched && meta.error && <p data-testid={`${formName}-error-${input.name}`} className='text-danger'>{meta.error}</p>}
                </div>
              )}
            </Field>
            <Field name="email" component="input" validate={composeValidators(required, mustBeEmail, emailAvailable)}>
              {({ input, meta }) => (
                <div className='col-12 col-md-6 offset-md-3'>
                  <label>Email</label>
                  <input data-testid={`${formName}-${input.name}`} id={`${formName}-${input.name}`} className='form-control' type="text" {...input} placeholder="Email" />
                  {meta.touched && meta.error && <p data-testid={`${formName}-error-${input.name}`} className='text-danger'>{meta.error}</p>}
                </div>
              )}
            </Field>
            <Field name="password" component="input" validate={composeValidators(required, passwordValidation)}>
              {({ input, meta }) => (
                <div className='col-12 col-md-6 offset-md-3'>
                  <label>Password</label>
                  <input data-testid={`${formName}-${input.name}`} id={`${formName}-${input.name}`} className='form-control' type="password" {...input} />
                  {meta.touched && meta.error && <p data-testid={`${formName}-error-${input.name}`} className='text-danger'>{meta.error}</p>}
                </div>
              )}
            </Field>
            <Field name="passwordAgain" component="input" validate={composeValidators(required)}>
              {({ input, meta }) => (
                <div className='col-12 col-md-6 offset-md-3'>
                  <label>Password Again</label>
                  <input data-testid={`${formName}-${input.name}`} id={`${formName}-${input.name}`} className='form-control' type="password" {...input} />
                  {meta.touched && meta.error && <p data-testid={`${formName}-error-${input.name}`} className='text-danger'>{meta.error}</p>}
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

export default RegisterForm;
