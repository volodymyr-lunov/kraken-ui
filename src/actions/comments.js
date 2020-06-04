import * as constants from '../constants';

export const loadedComments = (postId, comments) => ({
  type: constants.COMMENTS_LOADED,
  postId,
  comments
});

export const createdComment = (postId, newComment) => ({
  type: constants.COMMENT_CREATED,
  postId,
  newComment
});