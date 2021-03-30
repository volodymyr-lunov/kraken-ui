import * as types from '../types';

const defaultState = {
  posts: new Map(),
  count: 10,
  lastEvaluatedKey: null,

  loading: false,
  error: null,
  
  post: null,
  postBeenUpdated: false,
  postBeenCreated: false
};

export default (state = defaultState, action) => {
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
        const posts = new Map(state.posts.entries());
        action.posts.posts.forEach(item => posts.set(item.id, item));

        return {
          ...state,
          posts,
          loading: false,
          count: action.posts.count,
          lastEvaluatedKey: action.posts.lastEvaluatedKey
        };
      }

    case types.POST_LOADED:
      return {
        ...state,
        currentPost: action.currentPost,
        loading: false,
        postBeenUpdated: false,
        postBeenCreated: false,
      }

    case types.POST_CREATED:
      {
        const posts = new Map(state.posts.entries());
        posts.set(action.createdPost.id, action.createdPost);

        return {
          ...state,
          posts,
          lastEvaluatedKey: action.createdPost.id,
          loading: false,
          postBeenCreated: true,
          postBeenUpdated: false
        }
      }

    case types.POST_UPDATED:
      {
        const posts = new Map(state.posts.entries());
        posts.set(action.updatedPost.id, action.updatedPost);

        return {
          ...state,
          posts,
          loading: false,
          postBeenCreated: false,
          postBeenUpdated: true
        }
      }

    case types.POST_DELETED:
      {
        const posts = new Map(state.posts.entries());
        posts.delete(action.id);

        return {
          ...state,
          posts
        }
      }

    default:
      return state;
  }
};