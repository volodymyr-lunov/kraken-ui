import * as constants from '../constants';

const defaultState = {
  items: [],
  count: 10,
  lastEvaluatedKey: null,
  isLoading: false,
  errorMsg: false
};

const posts = (state = defaultState, action) => {
  let idx, items;
  
  switch (action.type) {
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

    case constants.POST_UPDATED:
      idx = state.items.findIndex(item => item.id === action.updatedPost.id);    
      items = [...state.items];
      items.splice(idx, 1, action.updatedPost);

      return {
        ...state,
        items
      }

    case constants.POST_DELETED:
      idx = state.items.findIndex(item => item.id === action.id);    
      items = [...state.items];
      items.splice(idx, 1);

      return {
        ...state,
        items
      }

    default:
      return state;
  }
};

export default posts;