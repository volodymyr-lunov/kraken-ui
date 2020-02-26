import * as constants from '../constants';

export const loginUser = (profile) => ({
  type: constants.USER_LOGIN,
  isUserLogin: true,
  profile
});

export const logoutUser = () => ({
  type: constants.USER_LOGOUT,
  isUserLogin: false,
  profile: null
});