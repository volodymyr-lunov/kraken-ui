import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useAppContext} from '../lib/context';

const Menu = (child) => (<ul className={'top-menu'}>{child}</ul>)

const SignOptions = () => {
  const { isAuthenticated } = useAppContext();

  if (isAuthenticated) {
    return Menu(
      <li key={'Signout'}>
        <RouterLink to={'Signout'}>SignOut</RouterLink>
      </li>
    );
  }

  return Menu(
    <React.Fragment>
      <li key={'Signin'}>
        <RouterLink to="Signin">Sign In</RouterLink>
      </li>
      <li key={'Signup'}>
        <RouterLink to="Signup">Sign Up</RouterLink>
      </li>
    </React.Fragment>
  )
};

export default SignOptions;