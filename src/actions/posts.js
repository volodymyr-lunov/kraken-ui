import * as constants from '../constants';

export const loadedPosts = (posts) => ({
  type: constants.POSTS_LOADED,
  posts
});