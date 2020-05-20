import * as constants from '../constants';

export const loadingPosts = (isLoading) => ({
  type: constants.POSTS_LOADING,
  isLoading
});

export const loadingPostsError = (errorMsg) => ({
  type: constants.POSTS_LOADING_ERROR,
  errorMsg
});

export const loadedPosts = (posts) => ({
  type: constants.POSTS_LOADED,
  posts
});