import * as constants from '../constants';
import {API} from 'aws-amplify';

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

export const getOnePost = (id) => (dispatch, getStore) => {
  const {posts: {items=[]}} = getStore();

  const post = items.find((post) => post.id === id);
  if (post) {
    dispatch(loadedPost(post));
    return Promise.resolve();
  }

  dispatch(loadingPost(true));

  return API.get('api', `/posts/${id}`)
    .then((res) => {
      if (res.status !== 200) {
        throw Error(res.statusText);
      }

      dispatch(loadingPost(false));

      const {post} = res.data;
      return post;
    })
    .then((post) => dispatch(loadedPost(post)))
    .catch((err) => dispatch(loadingPostError(err.message)));
};