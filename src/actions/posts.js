import * as constants from '../constants';

export const loadedPosts = (posts) => ({
  type: constants.POSTS_LOADED,
  posts
});

export const createdPost = (newPost) => ({
  type: constants.POST_CREATED,
  newPost
});

export const updatedPost = (updatedPost) => ({
  type: constants.POST_UPDATED,
  updatedPost
});

export const deletedPost = (id) => ({
  type: constants.POST_DELETED,
  id
});