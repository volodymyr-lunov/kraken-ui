import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser, logoutUser} from '../actions/user';
import Auth0Lock from 'auth0-lock';
import config from '../config';

const lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN, {
  auth: {
    params: {scope: 'openid email'},
    responseType: 'token id_token'
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    lock.on('authenticated', this.onAuthenticated.bind(this));
  }

  componentDidMount() {
    const profile = localStorage.getItem('profile');
    if (profile) {
      this.props.loginUser(JSON.parse(profile));
    }
  }

  async onAuthenticated(authResult) {
    const profile = await this.getUserInfo(authResult.accessToken);

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.props.loginUser(profile);
  }

  getUserInfo(token) {
    return new Promise((resolve, reject) => {
      lock.getUserInfo(token, (error, profile) => error ? reject(error) : resolve(profile));
    });
  }

  login() {
    lock.show();
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('profile');

    this.props.logoutUser();
  }

  render() {
    return this.props.user.isUserLogin ?
      <button className={'btn blue-btn'} onClick={this.logout.bind(this)}>Logout</button> :
      <button className={'btn blue-btn'} onClick={this.login}>Login</button>;
  }
}

const stateToProps = (state) => ({
  user: state.user
});

const dispatchToProps = (dispatch) => ({
  loginUser: (profile) => dispatch(loginUser(profile)),
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  stateToProps,
  dispatchToProps
)(Login);