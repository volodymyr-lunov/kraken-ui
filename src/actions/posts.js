import * as types from '../types';
import * as postsService from '../services/posts-service';

const error = (dispatch) => ({message}) => dispatch(errorPosts(message));

export const getPosts = (lastEvaluatedKey) => (dispatch) => {
  dispatch(loadingPosts());

  return postsService.getPosts(lastEvaluatedKey)
    .then((posts) => dispatch(loadedPosts(posts)))
    .catch(error(dispatch));
};

export const getPost = (id) => (dispatch, store) => {
  dispatch(loadingPosts());
  
  const {posts: {posts}} = store();
  if (posts.has(id)) {
    return dispatch(loadedPost(posts.get(id)));
  }

  return postsService.getPost(id)
    .then(({post}) => dispatch(loadedPost(post)))
    .catch(error(dispatch));
};

export const createPost = (body) => (dispatch) => {
  dispatch(loadingPosts());

  return postsService.createPost(body)
    .then(({post}) => dispatch(createdPost(post)))
    .catch(error(dispatch));
};

export const updatePost = (postId, body) => (dispatch) => {
  dispatch(loadingPosts());

  return postsService.updatePost(postId, body)
    .then(({post}) => dispatch(updatedPost(post)))
    .catch(error(dispatch));
};

export const loadingPosts = () => ({
  type: types.POSTS_LOADING
});

export const errorPosts = (error) => ({
  type: types.POSTS_ERROR,
  error
});

export const loadedPosts = (posts) => ({
  type: types.POSTS_LOADED,
  posts
});

export const loadedPost = (post) => ({
  type: types.POST_LOADED,
  currentPost: post
});

export const createdPost = (post) => ({
  type: types.POST_CREATED,
  createdPost: post
});

export const updatedPost = (post) => ({
  type: types.POST_UPDATED,
  updatedPostpost: post
});

export const deletedPost = (id) => ({
  type: types.POST_DELETED,
  id
});