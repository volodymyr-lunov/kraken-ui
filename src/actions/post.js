import * as constants from '../constants';

export const loadingPost = (isLoading) => ({
  type: constants.POST_LOADING,
  isLoading
});

export const loadingPostError = (errorMsg) => ({
  type: constants.POST_LOADING_ERROR,
  errorMsg
});

export const loadedPost = (currentPost) => ({
  type: constants.POST_LOADED,
  currentPost
});

export const createdPost = (newPost) => ({
  type: constants.POST_CREATED,
  newPost
});