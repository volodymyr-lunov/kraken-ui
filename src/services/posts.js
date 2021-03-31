import {API} from 'aws-amplify';

export const fetchPosts = (lastEvaluatedKey) => API
  .get('api', `/posts${lastEvaluatedKey ? `?startFromId=${lastEvaluatedKey.id}` : ''}`)
  .then(({posts}) => ({
    posts: posts.Items,
    count: posts.Count,
    lastEvaluatedKey: posts.LastEvaluatedKey
  }))

export const getPost = (id) => API.get('api', `/posts/${id}`)

export const createPost = ({title, body}) => API.post('api', '/posts', {
  body: {
    title,
    body
  }
});

export const updatePost = (postId, {title, body}) => API.put('api', `/posts/${postId}`, {
  body: {
    title,
    body
  }
});

export const deletePost = (id) => API.del('api', `/posts/${id}`, { response: false });