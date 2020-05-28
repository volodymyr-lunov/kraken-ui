import React, {useEffect, useState} from 'react';
import {API} from 'aws-amplify';
import {useSelector} from 'react-redux';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';

const PostPage = ({match}) => {
  const {postId} = match.params;
  const {items} = useSelector(state => state.posts);
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPost = (id) => {
    setLoading(true);
    return API.get('api', `/posts/${id}`)
      .then(({post}) => {
        setLoading(false);
        setPost(post);
        return post;
      })
      .catch(({response}) => setError(response.data.message));
  }

  useEffect(() => {
    const foundPost = items.find(post => post.id === postId);
    foundPost 
      ? setPost(foundPost)
      : fetchPost(postId);
  }, []); // eslint-disable-line

  if (error) return <ErrorMsg msg={error} />;
  if (loading) return <Spinner />;
  if (post) return <Post data={post} />;
  
  return <Spinner />;
}

export default PostPage;
