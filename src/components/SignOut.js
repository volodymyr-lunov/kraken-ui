import React, {useEffect} from 'react';
import {Auth} from 'aws-amplify';
import {Redirect} from 'react-router';
import {useAppContext} from '../lib/context';
import Spinner from './Spinner'

const SignOut = () => {
  const {isAuthenticated, userHasAuthenticated} = useAppContext();
  useEffect(() => {
    Auth.signOut().then(() => userHasAuthenticated(false))
  });

  return isAuthenticated ? <Spinner /> : <Redirect to={'Signin'}/>;
}

export default SignOut;