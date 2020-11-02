import React, {useState} from 'react';
import {API} from 'aws-amplify';
import {useDispatch} from 'react-redux';
import {createdComment} from '../actions/comments';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const CommentsForm = ({postId, parentId, onCreated = () => {}}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  const validateForm = () => body.length > 0;

  const createComment = () => {
    setLoading(true);
    const comment = {body};

    if (parentId) comment.parentId = parentId;

    return API.post('api', `/posts/${postId}/comments`, {body: comment})
      .then(({comment}) => dispatch(createdComment({postId, comment})))
      .catch(({response}) => setError(response.data.message))
      .finally(() => {
        setBody('');
        setLoading(false);
        onCreated(comment);
      })
  }

  const errorMsg = error ? <ErrorMsg msg={error} /> : '' 

  if (loading) return <Spinner />

  return (
    <div className={'comments-form'}>
      {errorMsg}
      <textarea placeholder="Comment" onChange={({target}) => setBody(target.value)}></textarea>
      <button className={'btn blue-btn'} onClick={createComment} disabled={!validateForm()}>Comment</button>
    </div>
  )
}

export default CommentsForm;