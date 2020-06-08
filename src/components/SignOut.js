import React, {useEffect} from 'react';
import {Auth} from 'aws-amplify';
import {Redirect} from 'react-router';
import {useAppContext} from '../lib/context';
import Spinner from './Spinner'

const SignOut = () => {
  const {authenticatedUser, userHasAuthenticated} = useAppContext();

  useEffect(() => {
    Auth.signOut().then(() => userHasAuthenticated(false))
  });

  return authenticatedUser 
    ? <Spinner /> 
    : <Redirect to={'/signin'}/>;
}

export default SignOut;