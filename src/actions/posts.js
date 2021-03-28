import {
  POSTS_ERROR, 
  POSTS_LOADED, 
  POSTS_LOADING, 
  POST_CREATED, 
  POST_DELETED, 
  POST_UPDATED
} from '../constants';

import {API} from 'aws-amplify';

export const loadPosts = (lastEvaluatedKey) => (dispatch, store) => {
  dispatch(loadingPosts());

  return API.get('api', `/posts${lastEvaluatedKey ? `?startFromId=${lastEvaluatedKey.id}` : ''}`)
    .then(({posts}) => ({
      items: posts.Items,
      count: posts.Count,
      lastEvaluatedKey: posts.LastEvaluatedKey
    }))
    .then((posts) => dispatch(loadedPosts(posts)))
    .catch((err) => dispatch(errorPosts(err.message ? err.message : err)));
};

export const loadingPosts = () => ({
  type: POSTS_LOADING
});

export const errorPosts = (error) => ({
  type: POSTS_ERROR,
  error
});

export const loadedPosts = (posts) => ({
  type: POSTS_LOADED,
  posts
});

export const createdPost = (newPost) => ({
  type: POST_CREATED,
  newPost
});

export const updatedPost = (updatedPost) => ({
  type: POST_UPDATED,
  updatedPost
});

export const deletedPost = (id) => ({
  type: POST_DELETED,
  id
});