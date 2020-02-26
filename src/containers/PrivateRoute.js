import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router';

const PrivateRoute = ({component: Component, user, ...rest}) => (
  <Route {...rest} render={(props) => {
    return user.isUserLogin
      ? <Component {...props} />
      : <Redirect to='/home' />;
  }}/>
);

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);

