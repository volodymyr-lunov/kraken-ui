import * as types from '../types';
import * as commentsService from '../services/comments';
export const error = (dispatch) => ({message}) => dispatch(errorComments(message));

export const fetchComments = ({postId, parentId}) => (dispatch) => {
  dispatch(loadingComments());

  return commentsService.fetchComments({postId, parentId})
    .then((comments) => dispatch(loadedComments({postId, parentId, comments})))
    .then(error(dispatch));
};

export const createComment = (postId, { body, parentId }) => (dispatch) => {
  dispatch(loadingComments());

  return commentsService.createComment(postId, { body, parentId })
    .then(({comment}) => dispatch(createdComment({ postId, comment })))
    .catch(error(dispatch));
}

export const loadingComments = () => ({
  type: types.COMMENTS_LOADING
});

export const loadedComments = ({postId, parentId, comments}) => ({
  type: types.COMMENTS_LOADED,
  postId,
  parentId,
  comments
});

export const errorComments = (error) => ({
  type: types.COMMENTS_ERROR,
  error
});

export const createdComment = ({postId, comment}) => ({
  type: types.COMMENT_CREATED,
  postId,
  comment
});

export const deletedComment = (id) => ({
  type: types.COMMENT_DELETED,
  id
});