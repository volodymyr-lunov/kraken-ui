import * as types from '../types';

const defaultState = {
  items: new Map(),
  count: 10,
  lastEvaluatedKey: null,
  loading: false,
  error: null,
  needsUpdate: true,
  post: null,
  postUpdated: false,
};

const posts = (state = defaultState, action) => {
  switch (action.type) {
    case types.POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case types.POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case types.POSTS_LOADED:
      {
        const items = new Map(state.items.entries());
        action.posts.items.forEach(item => items.set(item.id, item));

        return {
          ...state,
          loading: false,
          items,
          needsUpdate: false,
          count: action.posts.count,
          lastEvaluatedKey: action.posts.lastEvaluatedKey
        };
      }

    case types.POST_LOADED:
      return {
        ...state,
        loading: false,
        post: action.post,
        postUpdated: false
      }

    case types.POST_CREATED:
      {
        const items = new Map(state.items.entries());
        items.set(action.newPost.id, action.newPost);

        return {
          ...state,
          items,
          lastEvaluatedKey: action.newPost.id,
          loading: false
        }
      }

    case types.POST_UPDATED:
      {
        const items = new Map(state.items.entries());
        items.set(action.updatedPost.id, action.updatedPost);

        return {
          ...state,
          items,
          loading: false,
          postUpdated: true
        }
      }

    case types.POST_DELETED:
      {
        const items = new Map(state.items.entries());
        items.delete(action.id);

        return {
          ...state,
          items
        }
      }

    default:
      return state;
  }
};

export default posts;