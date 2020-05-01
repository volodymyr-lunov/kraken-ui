import React from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import {useAppContext} from '../lib/context';

const LoginButton = () => {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const history = useHistory();

  const logout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push('login');
  };

  if (isAuthenticated) {
    return <button className={'btn blue-btn'} onClick={logout}>Logout</button>
  }

  return (
    <RouterLink to="/login">
      <button className={'btn blue-btn'}>Login</button>
    </RouterLink>
  )
};

export default LoginButton;