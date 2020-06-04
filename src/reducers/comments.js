import * as constants from '../constants';

const defaultState = {
  items: new Map(),
  count: 10,
  scannedCount: 0
};

const comments = (state = defaultState, action) => {
  switch (action.type) {
    case constants.COMMENTS_LOADED:
    {
      const items = new Map(state.items.entries());
      items.set(action.postId, action.comments.items);

      return {
        ...state,
        items,
        count: comments.count,
        scannedCount: comments.scannedCount
      }
    }
    
    case constants.COMMENT_CREATED:
    {
      const items = new Map(state.items.entries());
      
      console.log(items.has(action.postId))

      items.has(action.postId) 
        ? items.get(action.postId).unshift(action.newComment)
        : items.set(action.postId, [action.newComment])

      return {
        ...state,
        items
      }
    }

    default:
      return state;
  }
}

export default comments;