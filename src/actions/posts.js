import {
  POSTS_ERROR, 
  POSTS_LOADED, 
  POSTS_LOADING, 
  POST_CREATED, 
  POST_DELETED, 
  POST_UPDATED,
  POST_LOADED
} from '../constants';

import {API} from 'aws-amplify';

export const loadPosts = (lastEvaluatedKey) => (dispatch) => {
  dispatch(loadingPosts());

  return API.get('api', `/posts${lastEvaluatedKey ? `?startFromId=${lastEvaluatedKey.id}` : ''}`)
    .then(({posts}) => ({
      items: posts.Items,
      count: posts.Count,
      lastEvaluatedKey: posts.LastEvaluatedKey
    }))
    .then((posts) => dispatch(loadedPosts(posts)))
    .catch(({response, message, ...err}) => dispatch(errorPosts(response && message && err)));
};

export const loadPost = (id) => (dispatch, store) => {
  dispatch(loadingPosts());
  
  const {posts: {items}} = store();
  if (items.has(id)) {
    return dispatch(loadedPost(items.get(id)));
  }

  return API.get('api', `/posts/${id}`)
    .then(({post}) => dispatch(loadedPost(post)))
    .catch(({response, message, ...err}) => dispatch(errorPosts(response && message && err)));
}

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

export const loadedPost = (post) => ({
  type: POST_LOADED,
  post
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