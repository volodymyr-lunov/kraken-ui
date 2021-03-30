import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import {getPost, createPost, updatePost} from '../actions/posts';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const CreateEditPost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {postId} = useParams();
  const editMode = !!postId;
  const {post: statePost, error, loading, postUpdated} = useSelector(state => state.posts);
  const [post, setPost] = useState({ title: '', body: '' });

  const validateForm = () => post.title.length && post.body.length;
  const submitForm = () => dispatch(editMode ? updatePost(postId, post) : createPost(post));

  useEffect(() => {
    if (postUpdated) history.push(`/post/${postId}`);
  }, [postUpdated, postId, history]);

  useEffect(() => {
    if (editMode) dispatch(getPost(postId));
  }, []); // eslint-disable-line

  useEffect(() => {
    if (statePost) setPost(statePost);
  }, [statePost]);

  if (loading) return <Spinner />;

  return (
    <div className={'form-group'}>
      {error ? <ErrorMsg msg={error} /> : ''}
      <label>
        <input 
          type="text" 
          name="title" 
          placeholder="Title" 
          value={post.title} 
          onChange={({target: {value}}) => setPost({...post, title: value})} />
      </label>
      <label>
        <textarea 
          name="body" 
          placeholder="Body" 
          value={post.body} 
          onChange={({target: {value}}) => setPost({...post, body: value})}></textarea>
      </label>
      <label>
        <button className={'btn blue-btn'} disabled={!validateForm()} onClick={submitForm}>Save</button>
      </label>
    </div>
  );
}

export default CreateEditPost;