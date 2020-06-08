import React, {useState, useEffect} from 'react';
import {API} from 'aws-amplify';
import {useDispatch, useSelector} from 'react-redux';
import {loadedComments} from '../actions/comments';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';
import Comment from '../components/Comment';

const CommentsList = ({postId}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {items} = useSelector(state => state.comments);
  const comments = items.get(postId) || [];

  const fetchComments = () => {
    setLoading(true);
    return API.get('api', `/posts/${postId}/comments`)
      .then(({comments}) => ({
        count: comments.Count,
        items: comments.Items,
        scannedCount: comments.ScannedCount
      }))
      .then((comments) => dispatch(loadedComments(postId, comments)))
      .catch(({response}) => setError(response.data.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!loading && !items.has(postId)) {
      fetchComments();
    }
  });

  if (error) return <ErrorMsg msg={error} />
  if (loading) return <Spinner />

  return (
    <ul className={'comments-list'}>
      {comments.map(comment => <Comment data={comment} key={comment.id}/>)}
    </ul>
  )
};

export default CommentsList;