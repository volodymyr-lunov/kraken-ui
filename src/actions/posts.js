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
  
  const {posts: {items}} = store();
  if (items.has(id)) {
    return dispatch(loadedPost(items.get(id)));
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
  post
});

export const createdPost = (newPost) => ({
  type: types.POST_CREATED,
  newPost
});

export const updatedPost = (updatedPost) => ({
  type: types.POST_UPDATED,
  updatedPost
});

export const deletedPost = (id) => ({
  type: types.POST_DELETED,
  id
});