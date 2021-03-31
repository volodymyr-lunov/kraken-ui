import * as types from '../types';
import * as postsService from '../services/posts';
export const error = (dispatch) => ({message}, ...err) => {
  console.log({ err, message });

  dispatch(errorPosts(message));
};

export const fetchPosts = (lastEvaluatedKey) => (dispatch) => {
  dispatch(loadingPosts());

  return postsService.fetchPosts(lastEvaluatedKey)
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

export const deletePost = (id) => (dispatch) => {
  dispatch(loadingPosts());

  return postsService.deletePost(id)
    .then(() => dispatch(deletedPost(id)))
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
  updatedPost: post
});

export const deletedPost = (id) => ({
  type: types.POST_DELETED,
  id
});