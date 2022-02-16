import React, { FC, useEffect, useState } from 'react';
import { getUsers } from '../../axios/user';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';



interface DisplayUsersProp {
  users: any[];
}

const DisplayUsers: FC<DisplayUsersProp> = (props) => {

  return <div className='row' data-testid="DisplayUsers">
    {props.users.map(user =>
      <div className='col-3 col-md-6' data-testid={`user_${user._id}`} key={user._id} >
        <h4 data-testid={`user_${user._id}_name`}>{user.name}</h4>
        <p data-testid={`user_${user._id}_email`}>email: {user.email}</p>
        <p data-testid={`user_${user._id}_id`}>id: {user._id}</p>
        <p data-testid={`user_${user._id}_created`}>created: {user.created}</p>

      </div>)}
  </div>
}



interface SecureUsersProps { }

const SecureUsers: FC<SecureUsersProps> = () => {
  const [users, setUsers] = useState<any[]>();
  const token = useAppSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const usersResponse = await getUsers(token);
        setUsers(usersResponse)
      }
    }
    fetchData();
  }, [token]);


  return <div data-testid="SecureUsers">
    <div className='row'>
      <div className='col-12 col-md-6 offset-md-3'>
        <h2>Secure Page - User list</h2>
        {users === undefined ? <>Loading..</> : <><DisplayUsers users={users} /></>}

      </div>
    </div>
  </div>
};

export default SecureUsers;
