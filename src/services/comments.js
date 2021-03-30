import {API} from 'aws-amplify';

export const fetchComments = ({postId, parentId}) => API
  .get('api', `/posts/${postId}/comments${parentId ? `?parentId=${parentId}` : ''}`)
  .then(({comments}) => ({
    count: comments.Count,
    items: comments.Items,
    scannedCount: comments.ScannedCount
  }));

export const createComment = (postId, { body, parentId }) => API.post('api', `/posts/${postId}/comments`, {
  body: {
    body,
    parentId
  }
});

export const deleteComment = (postId, id) => API.delete('api', `/posts/${postId}/comments/${id}`);