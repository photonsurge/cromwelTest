import React, { FC } from 'react';
import { Link } from 'react-router-dom';


interface AccessDeniedProps { }

const AccessDenied: FC<AccessDeniedProps> = () => (
  <div data-testid="AccessDenied">
    <div className='row'>
      <div className='col-12 col-md-6 offset-md-3'>
        <h2>Sorry Access Denied</h2>
        <Link className='btn btn-warning' to="/login">Login</Link>
      </div>
    </div>
  </div>
);

export default AccessDenied;
