import React from 'react';
import {Route, Redirect} from 'react-router';
import {useAppContext} from '../lib/context'

const PrivateRoute = ({component: Component, ...rest}) => {
  const {isAuthenticated} = useAppContext();
  
  return (<Route {...rest} render={(props) => {
    return isAuthenticated
      ? <Component {...props} />
      : <Redirect to='/home' />;
  }}/>)
};

export default PrivateRoute;

