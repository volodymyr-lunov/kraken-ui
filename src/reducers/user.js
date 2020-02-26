import * as constants from '../constants';

const defaultState = {
  isUserLogin: false,
  profile: null
};

const user = (state=defaultState, action) => {
  switch (action.type) {
    case constants.USER_LOGIN:
      return {
        ...state,
        isUserLogin: action.isUserLogin,
        profile: action.profile
      };

    case constants.USER_LOGOUT:
      return {
        ...state,
        isUserLogin: action.isUserLogin
      };

    default:
      return state;
  }
};

export default user;