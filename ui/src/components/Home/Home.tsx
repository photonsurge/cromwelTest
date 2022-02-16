import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';


interface HomeProps { }

const Home: FC<HomeProps> = () => {

  const loggedIn = useAppSelector((state: RootState) => state.auth.loggedIn);

  return <div data-testid="Home">
    <div className='row'>
      <div className='col-12 col-md-6 offset-md-3'>
        <h2>Home</h2>
        <div className='row'>
          {loggedIn ? <div className='col-12 text-center'><p>

            <Link className='btn btn-primary' to="/secure">View Secure Page</Link>
          </p></div> : <><div className='col-12 col-md-6 text-center'><p>

            <Link className='btn btn-success' to="/login">Login</Link>
          </p></div><div className='col-12 col-md-6 text-center'><p>

            <Link className='btn btn-warning' to="/register">Register to make new account</Link>
          </p></div></>}
        </div>
      </div>
    </div>
  </div>
}



export default Home;
