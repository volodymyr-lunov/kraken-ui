import * as constants from '../constants';

const defaultState = {
  items: [],
  count: 10,
  lastEvaluatedKey: null,
  isLoading: false,
  errorMsg: false
};

const posts = (state=defaultState, action) => {
  switch (action.type) {
    case constants.POSTS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case constants.POSTS_LOADING_ERROR:
      return {
        ...state,
        errorMsg: action.errorMsg
      };

    case constants.POSTS_LOADED:
      return {
        ...state,
        items: [...state.items, ...action.posts.items],
        count: action.posts.count,
        lastEvaluatedKey: action.posts.lastEvaluatedKey
      };

    case constants.POST_CREATED:
      return {
        ...state,
        items: [action.newPost, ...state.items],
        lastEvaluatedKey: action.newPost.id
      }

    default:
      return state;
  }
};

export default posts;