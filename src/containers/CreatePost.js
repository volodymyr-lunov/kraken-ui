import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {useDispatch} from 'react-redux';
import {API} from 'aws-amplify';
import {useFormFields} from '../lib/hooks';
import {createdPost} from '../actions/post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const CreatePost = () => {
  const [{title, body}, fieldsHasChanges] = useFormFields({title: '', body: ''});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  
  if (isLoading) return <Spinner />;

  const errorMsg = error.length ? <ErrorMsg msg={errorMsg} /> : '';

  const validateForm = () => title.length && body.length;

  const newPost = () => {
    setIsLoading(true)

    API.post('api', '/posts', {body: {title, body}})
      .then(({post}) => {
        setIsLoading(false);
        dispatch(createdPost(post));
        history.push(`/post/${post.id}`);        
      })
      .catch(err => setError(err.message))
  }

  return (
    <div className={'form-group'}>
      {errorMsg}
      <label>
        <input type="text" name="title" placeholder="Title" value={title} onChange={fieldsHasChanges} />
      </label>
      <label>
        <textarea name="body" placeholder="Body" value={body} onChange={fieldsHasChanges}></textarea>
      </label>
      <label>
        <button className={'btn blue-btn'} disabled={!validateForm()} onClick={newPost}>Create</button>
      </label>
    </div>
  )
}

export default CreatePost;