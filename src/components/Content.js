import React from 'react';
import {Route} from 'react-router-dom';
import routes from '../routes';
import PrivateRoute from '../containers/PrivateRoute';

const Content = () => {
  return (
    <div className="container">
      {routes.map(route => (
        route.forAuthOnly
          ? <PrivateRoute path={route.path} component={route.handler} key={route.label} />
          : <Route path={route.path} component={route.handler} key={route.label} />
      ))}
    </div>
  );
};

export default Content;