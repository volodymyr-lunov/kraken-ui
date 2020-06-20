import * as constants from '../constants';

export const loadedComments = ({postId, parentId, comments}) => ({
  type: constants.COMMENTS_LOADED,
  postId,
  parentId,
  comments
});

export const createdComment = ({postId, comment}) => ({
  type: constants.COMMENT_CREATED,
  postId,
  comment
});