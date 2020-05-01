import * as constants from '../constants';
import {API} from 'aws-amplify';

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

export const getAllPosts = (limit=10, startFromId) => (dispatch) => {
  dispatch(loadingPosts(true));

  const params = {limit};

  if (startFromId) {
    params['startFromId'] = startFromId;
  }

  return API.get('api', `/posts?${new URLSearchParams(params)}`)
    .then(({posts}) => {
      dispatch(loadingPosts(false));

      return {
        items: posts.Items,
        count: posts.Count,
        lastEvaluatedKey: posts.LastEvaluatedKey
      };
    })
    .then((posts) => dispatch(loadedPosts(posts)))
    .catch((err) => dispatch(loadingPostsError(err.message)));
};
