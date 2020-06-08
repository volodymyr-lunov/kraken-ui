import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useAppContext} from '../lib/context';

const SignOptions = () => {
  const { authenticatedUser } = useAppContext();

  if (authenticatedUser) {
    return (
      <ul className={'top-menu'}>
        <li key={'signout'}>
          <RouterLink to={'/signout'}>Sign Out</RouterLink>
        </li>
      </ul>
    );
  }

  return (
    <ul className={'top-menu'}>
      <li key={'signin'}>
        <RouterLink to="/signin">Sign In</RouterLink>
      </li>
      <li key={'signup'}>
        <RouterLink to="/signup">Sign Up</RouterLink>
      </li>
    </ul>
  )
};

export default SignOptions;