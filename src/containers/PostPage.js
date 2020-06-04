import React, {useEffect, useState, Fragment} from 'react';
import {API} from 'aws-amplify';
import {useSelector} from 'react-redux';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import ErrorMsg from '../components/ErrorMsg';
import Comments from './Comments';

const PostPage = ({match}) => {
  const {postId} = match.params;
  const {items} = useSelector(state => state.posts);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
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
    items.has(postId) 
      ? setPost(items.get(postId))
      : fetchPost(postId);
  }, []); // eslint-disable-line

  if (error) return <ErrorMsg msg={error} />;
  if (loading) return <Spinner />;
  if (post) {
    return (
      <Fragment>
        <Post data={post} />
        <Comments postId={postId} />
      </Fragment>
    );
  }
  
  return <Spinner />;
}

export default PostPage;
