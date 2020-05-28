import React, {Fragment} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useAppContext} from '../lib/context';

const Menu = (child) => (<ul className={'top-menu'}>{child}</ul>)

const SignOptions = () => {
  const { authenticatedUser } = useAppContext();

  if (authenticatedUser) {
    return Menu(
      <li key={'signout'}>
        <RouterLink to={'/signout'}>Sign Out</RouterLink>
      </li>
    );
  }

  return Menu(
    <Fragment>
      <li key={'signin'}>
        <RouterLink to="/signin">Sign In</RouterLink>
      </li>
      <li key={'signup'}>
        <RouterLink to="/signup">Sign Up</RouterLink>
      </li>
    </Fragment>
  )
};

export default SignOptions;