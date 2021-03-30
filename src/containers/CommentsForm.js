import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createComment} from '../actions/comments';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const CommentsForm = ({postId, parentId, onCreated = () => {}}) => {
  const {loading, error} = useSelector((state) => state.comments);
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const validateForm = () => body.length > 0;
  const onSubmit = () => dispatch(createComment(postId, { body, parentId }));

  if (loading) return <Spinner />;

  return (
    <div className={'comments-form'}>
      {error ? <ErrorMsg msg={error} /> : ''}
      <textarea placeholder="Comment" onChange={({target}) => setBody(target.value)}></textarea>
      <button className={'btn blue-btn'} onClick={onSubmit} disabled={!validateForm()}>Comment</button>
    </div>
  );
};

export default CommentsForm;