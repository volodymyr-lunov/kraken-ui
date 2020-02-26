import * as constants from '../constants';

const defaultState = {
  post: null,
  isLoading: false,
  errorMsg: false
};

const post = (state=defaultState, action) => {
  switch (action.type) {
    case constants.POST_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case constants.POST_LOADING_ERROR:
      return {
        ...state,
        errorMsg: action.errorMsg
      };

    case constants.POST_LOADED:
      return {
        ...state,
        currentPost: action.currentPost
      };

    default:
      return state;
  }
};

export default post;