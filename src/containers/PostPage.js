import React, {useEffect} from 'react';
import {API} from 'aws-amplify';
import {useSelector, useDispatch} from 'react-redux';
import {loadedPost, loadingPost, loadingPostError} from '../actions/post';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const fetchPost = (id, dispatch) => {
  dispatch(loadingPost(true))

  return API.get('api', `/posts/${id}`)
    .then(({post}) => {
      dispatch(loadingPost(false));
      return post;
    })
    .then(post => dispatch(loadedPost(post)))
    .catch(err => dispatch(loadingPostError(err.message)));
}

const PostPage = ({match}) => {
  const {postId} = match.params;
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.posts);
  const {
    currentPost,
    isLoading,
    errorMsg
  } = useSelector(state => state.post);

  useEffect(() => {
    const foundPost = items.find(post => post.id === postId);
    foundPost 
      ? dispatch(loadedPost(foundPost)) 
      : fetchPost(postId, dispatch); 
  }, []);

  if (isLoading) return <Spinner />;
  if (errorMsg) return <ErrorMsg msg={errorMsg} />;
  if (currentPost) return <Post item={currentPost} isPreview={false} />;
  
  return <Spinner />;
}

export default PostPage;
