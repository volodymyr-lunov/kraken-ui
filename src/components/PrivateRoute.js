import React from 'react';
import {Route, Redirect, useLocation} from 'react-router';
import {useAppContext} from '../lib/context'

const PrivateRoute = ({component: Component, ...rest}) => {
  const {isAuthenticated} = useAppContext();
  const {pathname, search} = useLocation();

  return (<Route {...rest} render={(props) => {
    return isAuthenticated
      ? <Component {...props} />
      : <Redirect to={`/signin?redirect=${pathname}${search}`} />;
  }}/>)
};

export default PrivateRoute;

