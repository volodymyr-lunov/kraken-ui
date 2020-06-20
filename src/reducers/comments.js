import * as constants from '../constants';

/*

const defaultState = new Map({
  "${postId}": {},
  "${postId}": {},
  "${postId}": new Map({
    "": new Map(); // post comments
    "${parentId}": new Map(); // child comments
  })
});

const comments = useSelector(state => {
  const postComments = state.comments.has(postId) 
    ? state.comments.get(postId) 
    : new Map();
  return postComments.get(parentId || '') || new Map();
});

*/
const defaultState = new Map();

const comments = (state = defaultState, action) => {
  try {
    switch (action.type) {
      case constants.COMMENTS_LOADED:
      {
        const newState = new Map(state.entries());
        const {postId, parentId = '', comments} = action;
        
        const payload = new Map();
        comments.items.forEach(item => payload.set(item.id, item));
  
        if (!newState.has(postId)) {
          newState.set(postId, new Map())
        }
  
        newState.get(postId).set(parentId, payload);

        return newState;
      }
      
      case constants.COMMENT_CREATED:
      {
        const newState = new Map(state.entries());
        const {postId, comment} = action;
        const {parentId = ''} = comment;

        if (!newState.has(postId)) {
          newState.set(postId, new Map())
        }
  
        const list = newState.get(postId).get(parentId) || new Map();
        list.set(comment.id, comment);
  
        newState.get(postId).set(parentId, list);

        return newState;
      }
  
      default:
        return state;
    }
  } catch (err) {
    console.log(err)
  }
}

export default comments;