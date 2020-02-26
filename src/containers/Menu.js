import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';
import routes from '../routes';

/**
 * @param {Boolean} isUserLogin
 * @param {Route} route
 * @return {Boolean} flag is route should be shown
 * */
const accessMiddleware = (isUserLogin, route) => {
  if (route.hidden) {
    return false;
  }

  if (route.forAuthOnly && !isUserLogin) {
    return false;
  }

  if (route.hideIfAuth && isUserLogin) {
    return false;
  }

  return true;
};

const Menu = ({user}) => {
  const links = routes
    .filter((route) => accessMiddleware(user.isUserLogin, route))
    .map((route) => (
      <li key={route.label}>
        <RouterLink to={route.path} key={route.label}>
          {route.label}
        </RouterLink>
      </li>
    ));

  return (<ul className={'top-menu'}>{links}</ul>);
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Menu);
