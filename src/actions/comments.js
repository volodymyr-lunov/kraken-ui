import * as types from '../types';

export const loadedComments = ({postId, parentId, comments}) => ({
  type: types.COMMENTS_LOADED,
  postId,
  parentId,
  comments
});

export const createdComment = ({postId, comment}) => ({
  type: types.COMMENT_CREATED,
  postId,
  comment
});