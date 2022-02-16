import React, { FC } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logoutNow } from '../../redux/authData';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

interface NavigationProps { }

const Navigation: FC<NavigationProps> = () => {
  const dispatch = useAppDispatch();

  const value = useAppSelector((state: RootState) => state.auth);
  const logout = () => {
    dispatch(logoutNow())
  }

  return <Navbar data-testid="Navigation">
    <Container>
      <Navbar.Brand href="/">Simple Application</Navbar.Brand>

      <Navbar.Toggle />

      <Navbar.Collapse className="justify-content-end">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          {value.loggedIn === false && <Nav.Link data-testid="register" as={Link} to="/register">Register</Nav.Link>}
          {value.loggedIn === true && <Nav.Link data-testid="secure" as={Link} to="/secure">Secure Page</Nav.Link>}
        </Nav>
        <Navbar.Text>

          {value.loggedIn === true ? <span data-testid="signedInAs">Signed in as: {value.name} <button data-testid="logout" className='btn btn-warning' onClick={logout}>Logout</button></span> : <Nav.Link data-testid="login" as={Link} to="/login">Login</Nav.Link>}

        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}


export default Navigation;
