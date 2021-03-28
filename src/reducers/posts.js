import {
  POSTS_ERROR, 
  POSTS_LOADED, 
  POSTS_LOADING, 
  POST_CREATED, 
  POST_DELETED, 
  POST_UPDATED,
  POST_LOADED
} from '../constants';

const defaultState = {
  items: new Map(),
  count: 10,
  lastEvaluatedKey: null,
  loading: false,
  error: null,
  needsUpdate: true,
  post: null
};

const posts = (state = defaultState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case POSTS_LOADED:
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

    case POST_LOADED:
      return {
        ...state,
        loading: false,
        post: action.post
      }

    case POST_CREATED:
      {
        const items = new Map(state.items.entries());
        items.set(action.newPost.id, action.newPost);

        return {
          ...state,
          items,
          lastEvaluatedKey: action.newPost.id
        }
      }

    case POST_UPDATED:
      {
        const items = new Map(state.items.entries());
        items.set(action.updatedPost.id, action.updatedPost);

        return {
          ...state,
          items
        }
      }

    case POST_DELETED:
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