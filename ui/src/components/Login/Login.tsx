import React, { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { login } from '../../axios/user';
import { loginToken } from '../../redux/authData';
import { useAppDispatch } from '../../redux/hooks';
import LoginForm from './LoginForm/Login/LoginForm';


interface LoginProps { }

const Login: FC<LoginProps> = () => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await login(data.email, data.password);
    if (response.ok === true) {
      console.log(response)


      setRedirect(true);
      response.token && dispatch(loginToken(response.token))
    } else {
      setResponse("Something was not right, please try again")
      setLoading(false)
    }
  }


  return <div data-testid="Login">
    {redirect === true && <Navigate to={`/`} />}
    {loading === true ? <p>Loading...</p> : <>
      {response && <p className='text-danger'>{response}</p>}
      <LoginForm onSubmit={onSubmit} />

    </>}
  </div>
};

export default Login;
