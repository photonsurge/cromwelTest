import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import AccessDenied from './components/AccessDenied/AccessDenied';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import Secure from './components/Secure/Secure';
import SecureUsers from './components/SecureUsers/SecureUsers';
import { useAppSelector } from './redux/hooks';
import { RootState } from './redux/store';

const RequireAuth = () => {
  const loggedIn = useAppSelector((state: RootState) => state.auth.loggedIn);


  if (!loggedIn) {

    return <AccessDenied />;
  }

  return <Outlet />;
}


const App = () => {
  return (
    <div className="App">

      <Navigation />

      <div className='container-fluid'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/secure" element={<RequireAuth />}>
            <Route path="/secure/" element={<Secure />} />
            <Route path="/secure/users" element={<SecureUsers />} />
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <div style={{ display: 'none' }}>App Loads</div>
    </div>
  );
}

export default App;
