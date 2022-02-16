import React, { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { register } from '../../axios/user';
import RegisterForm from './RegisterForm/RegisterForm';


interface RegisterProps { }

const Register: FC<RegisterProps> = () => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>();


  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await register(data.name, data.email, data.password);
    if (response.ok === true) {
      console.log(response)


      setRedirect(true);

    } else {
      setResponse("Something was not right, please try again")
      setLoading(false)
    }
  }



  return <div data-testid="Register">
    {redirect === true && <Navigate to={`/`} />}
    {loading === true ? <p>Loading...</p> : <>
      {response && <p className='text-danger'>{response}</p>}
      <RegisterForm onSubmit={onSubmit} />

    </>}
  </div>
}
export default Register;
