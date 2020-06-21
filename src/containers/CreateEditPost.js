import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {API} from 'aws-amplify';
import {createdPost, updatedPost} from '../actions/posts';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const CreateEditPost = () => {
  const {postId} = useParams();
  const editMode = !!postId;
  const {items} = useSelector(state => state.posts);
  const [error, setError] = useState(false);
  const [post, setPost] = useState({title: '', body: ''});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const errorMsg = error ? <ErrorMsg msg={error} /> : '';

  const validateForm = () => post.title.length && post.body.length;
  const submitForm = () => editMode ? updatePost() : createPost();

  const fetchPost = () => {
    setLoading(true);
    return API.get('api', `/posts/${postId}`)
      .then(({post}) => {
        setLoading(false);
        setPost(post);
        return post;
      })
      .catch(({response}) => {
        setLoading(false);
        setError(response.data.message);
      });
  }

  const createPost = () => {
    setLoading(true)
    API.post('api', '/posts', {body: post})
      .then(({post}) => {
        setLoading(false);
        dispatch(createdPost(post));
        history.push(`/post/${post.id}`);
      })
      .catch(({response}) => {
        setLoading(false);
        setError(response.data.message);
      })
  }

  const updatePost = () => {
    setLoading(true)
    const {title, body} = post;
    return API.put('api', `/posts/${postId}`, {body: {title, body}})
      .then(({post}) => {
        setLoading(false);
        dispatch(updatedPost(post));
        history.push(`/post/${post.id}`);
      })
      .catch(({response}) => {
        setLoading(false);
        setError(response.data.message);
      })
  }

  useEffect(() => {
    if (editMode) {
      items.has(postId) ? setPost(items.get(postId)) : fetchPost();
    }
  }, []); // eslint-disable-line

  if (loading) return <Spinner />;

  return (
    <div className={'form-group'}>
      {errorMsg}
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