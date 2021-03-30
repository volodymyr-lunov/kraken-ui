import * as types from '../types';

/*
  // Raw store explanation

  const defaultState = {
    comments: new Map({
      "${postId}": {},
      "${postId}": {},
      "${postId}": new Map({
        "": new Map(); // post comments
        "${parentId}": new Map(); // child comments
      })
    }),
    loading: false,
    error: null
  }

  const {comments} = useSelector(state => ({comments: state.comments.comments.get(postId)?.get(parentId || '') || new Map()}));
*/

const defaultState = {
  comments: new Map(),
  loading: false,
  error: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.COMMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case types.COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case types.COMMENTS_LOADED:
      {
        const comments = new Map(state.comments);
        const {postId, parentId = ''} = action;

        const payload = new Map();
        action.comments.items.forEach(item => payload.set(item.id, item));

        if (!comments.has(postId)) {
          comments.set(postId, new Map())
        }

        comments.get(postId).set(parentId, payload);

        return {
          ...state,
          loading: false,
          comments
        };
      }
    
    case types.COMMENT_CREATED:
      {
        const comments = new Map(state.comments);

        const {postId, comment, comment: {parentId = ''}} = action;

        if (!comments.has(postId)) {
          comments.set(postId, new Map())
        }

        const list = comments.get(postId).get(parentId) || new Map();
        list.set(comment.id, comment);

        comments.get(postId).set(parentId, list);

        return {
          ...state,
          loading: false,
          comments
        };
      }

    default:
      return state;
  }
};