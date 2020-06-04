import React, {useState, useEffect} from 'react';
import {API} from 'aws-amplify';
import {useDispatch, useSelector} from 'react-redux';
import {loadedComments, createdComment} from '../actions/comments';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';
import Comment from '../components/Comment';

const Comments = ({postId}) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {items} = useSelector(state => state.comments);

  const validateForm = () => body.length > 0;

  const createComment = () => {
    setLoading(true);
    return API.post('api', `/posts/${postId}/comments`, {body:{body}})
      .then(({comment}) => dispatch(createdComment(postId, comment)))
      .catch(({response}) => setError(response.data.message))
      .finally(() => {
        setBody('');
        setLoading(false);
      })
  }

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

  const comments = items.has(postId) && items.get(postId).map(comment => <Comment data={comment} key={comment.id}/>)
  const errorMsg = error ? <ErrorMsg msg={error} /> : '' 

  if (loading) return <Spinner />

  return (
    <div className={'comments-block'}>
      {errorMsg}
      <textarea placeholder="Comment" onChange={({target}) => setBody(target.value)}></textarea>
      <button className={'btn blue-btn'} onClick={createComment} disabled={!validateForm()}>Comment</button>
      <ul>{comments}</ul>
    </div>
  )
};

export default Comments;