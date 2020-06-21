import * as constants from '../constants';

const defaultState = {
  items: new Map(),
  count: 10,
  lastEvaluatedKey: null
};

const posts = (state = defaultState, action) => {
  switch (action.type) {
    case constants.POSTS_LOADED:
    {
      const items = new Map(state.items.entries());
      action.posts.items.forEach(item => items.set(item.id, item));

      return {
        ...state,
        items,
        count: action.posts.count,
        lastEvaluatedKey: action.posts.lastEvaluatedKey
      };
    }

    case constants.POST_CREATED:
    {
      const items = new Map(state.items.entries());

      if (items.has(action.newPost.id)) {
        items.set(action.newPost.id, action.newPost);
      }

      return {
        ...state,
        items,
        lastEvaluatedKey: action.newPost.id
      }
    }

    case constants.POST_UPDATED:
    {
      const items = new Map(state.items.entries());

      if (items.has(action.updatedPost.id)) {
        items.set(action.updatedPost.id, action.updatedPost);
      }

      return {
        ...state,
        items
      }
    }

    case constants.POST_DELETED:
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